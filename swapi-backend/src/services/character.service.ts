import axios from "axios";
import dotenv from "dotenv";
import AppError from "../utils/appError";
import {Messages} from "../utils/messages";
import HTTP_STATUS from '../constants/statusCode';
import { getCache, setCache } from "../cache/cacheHelper";
import { ICharacter } from "../types/type";
dotenv.config();
const BASE_URL = process.env.BASE_URL || 'https://swapi.dev/api';

class CharacterService {
    // public async fetchCharacters(page = 1, limit = 10):Promise<any>{
    //     const cacheKey = `characters:${page}:${limit}`;
    //         console.log("cacheKey",cacheKey);
    //         const cached = await getCache(cacheKey);
    //         if (cached) {
    //             return {result:cached,cached:true};
    //         }
    //     const response = await axios.get(`${BASE_URL}/people?page=${page}&limit=${limit}`);
    //     if(!response)
    //     {
    //         throw new AppError(Messages.FAILED_TO_FETCH_CHARACTERS,HTTP_STATUS.BAD_GATEWAY);
    //     }
    //     // Enrich characters with additional info
    //     const enrichedResults = await this.enrichCharacterDetails(response.data.results);
    //     const enrichedData = { ...response.data, results: enrichedResults };
    //     if(response.data.length>0 || response.status===200)
    //     {
    //         await setCache(cacheKey, enrichedData);
    //     }
    //     return { result: enrichedData, cached: false };
        
    // }
    public async fetchCharacters(page = 1, limit = 10):Promise<any>{
        
        const response = await axios.get(`${BASE_URL}/people?page=${page}&limit=${limit}`);
        if(!response)
        {
            throw new AppError(Messages.FAILED_TO_FETCH_CHARACTERS,HTTP_STATUS.BAD_GATEWAY);
        }
        // // Enrich characters with additional info
        // const enrichedResults = await this.enrichCharacterDetails(response.data.results);
        // const enrichedData = { ...response.data, results: enrichedResults };
        // if(!enrichedData){
        //     throw new AppError(Messages.FAILED_TO_FETCH_CHARACTERS, HTTP_STATUS.BAD_GATEWAY);
        // }
        return response?.data?.results;
        
    }

    public async fetchCharacterById(id:string):Promise<any>{
        const cacheKey = `character:${id}`;
            const cached = await getCache(cacheKey);
            if(cached) {
                return {result:cached,cached:true};
            }
        const response = await axios.get(`${BASE_URL}/people/${id}`);
        if(!response)
        {
            throw new AppError(Messages.FAILED_TO_FETCH_CHARACTER,HTTP_STATUS.BAD_GATEWAY);
        }
        if(response.status===200 || response.data) {

            await setCache(cacheKey, response.data);
        }
        return {result:response.data,cached:false};
    }

    public async searchCharacterByName(name:string):Promise<any>{
        if(!name || typeof name !== 'string' || name.trim() === '') {
            throw new AppError(Messages.INVALID_CHARACTER_NAME, HTTP_STATUS.BAD_REQUEST);
        }
        console.log("searching for character with name",name);

        const response = await this.fetchCharacters(1, 100); // Fetching a larger set to filter from
        console.log("jkjaksjasjak",response)
        const results=response.result.results;
        console.log("resultssssssssii",response);
        const filtered = results.filter((char: any) =>
            char.name.toLowerCase().includes(name.toLowerCase())
        );
        const cacheKey = `character:${name.toLowerCase()}`;
        const cached = await getCache(cacheKey);
        if (cached) {
            return {result: cached, cached: true};
        }
        if(filtered.length>0)
        {
            await setCache(cacheKey, filtered);
        }
        return {result: filtered, cached: false};
    }
    
    public async searchByName(name:string):Promise<{result:ICharacter[], cached:boolean}> {
        console.log("nameeee",name);
        // if(!name || typeof name !== 'string' || name.trim() === '') {
        //     throw new AppError(Messages.INVALID_CHARACTER_NAME, HTTP_STATUS.BAD_REQUEST);
        // }
        const getAllCharacters=await this.fetchCharacters(1,100);
        if(!getAllCharacters || !getAllCharacters.result || !getAllCharacters.result.results) {
            throw new AppError(Messages.FAILED_TO_FETCH_CHARACTERS, HTTP_STATUS.BAD_GATEWAY);
        }
        console.log("getAllCharacters",getAllCharacters);
        const cacheKey = `characterName:${name.toLowerCase()}`;
        const cached = await getCache(cacheKey);
            if (cached) {
                return {result: cached, cached: true};
            }
        const filtered = getAllCharacters?.result?.results.filter((character:any) => 
            character.name.toLowerCase().includes(name.toLowerCase())
        );
        if(filtered.length>0)
        {
            await setCache(cacheKey, filtered);
        }
        console.log("filtered characters",filtered);
        return {result: filtered, cached: false};
    }

    private async enrichCharacterDetails(characters: ICharacter[]): Promise<ICharacter[]> {
        return Promise.all(
            characters.map(async (character: ICharacter) => {
                try {
                    const cacheKey = `character-details:${character.uid}`;
                    const cachedDetails = await getCache(cacheKey);

                    if (cachedDetails) {
                        return { ...character, details: cachedDetails }; // Use cached data
                    }

                    const additionalInfo = await axios.get(character.url); // Fetch additional info
                    await setCache(cacheKey, additionalInfo.data.result, 3600); // Cache for 1 hour
                    return { ...character, details: additionalInfo.data.result }; // Merge additional info
                } catch (error) {
                    console.log(error);
                    return { ...character, details: null }; // Return null if additional info fetch fails
                }
            })
        );
    }

    public async getAll(page: number, limit: number, search: string): Promise<any> {
        const cacheKey = `getAll:page:${page}:limit:${limit}:search:${search || "none"}`;
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            console.log("Returning cached data for key:", cacheKey);
            return {result:cachedData,cached:true};
        }
        let allCharacters = [];
        allCharacters = await this.fetchCharacters(1, 100);
        console.log("allCharacters", allCharacters);

        if (search) {
            const filteredResult = allCharacters.filter((character: ICharacter) =>
                character.name.toLowerCase().includes(search.toLowerCase())
            );
            allCharacters = filteredResult;
        }

        const totalCharacters = allCharacters.length;
        const totalPages = Math.ceil(totalCharacters / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedCharacters = allCharacters.slice(startIndex, endIndex);

        console.log("paginatedCharacters", paginatedCharacters);

        // Apply enrichCharacterDetails to get all properties
        const enrichedCharacters = await this.enrichCharacterDetails(paginatedCharacters);
        console.log("enrichedCharactersss",enrichedCharacters);
          // Prepare the response
        const response = {
            totalCharacters,
            totalPages,
            currentPage: page,
            characters: enrichedCharacters
        };
        // Cache the response
        await setCache(cacheKey, response, 3600); // Cache for 1 hour
        console.log("Cached data for key:", cacheKey);
        return {result:response,cached:false};
    }

}
export default new CharacterService;