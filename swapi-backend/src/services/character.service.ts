import axios from "axios";
import dotenv from "dotenv";
import AppError from "../utils/appError";
import {Messages} from "../utils/messages";
import HTTP_STATUS from '../constants/statusCode';
import { getCache, setCache } from "../cache/cacheHelper";
import { ICharacter, ICharactersData } from "../types/type";
dotenv.config();
const BASE_URL = process.env.BASE_URL || 'https://swapi.dev/api';

class CharacterService {
    public async fetchCharacters(page = 1, limit = 10):Promise<ICharacter[]>{
        
        const response = await axios.get(`${BASE_URL}/people?page=${page}&limit=${limit}`);
        if(!response)
        {
            throw new AppError(Messages.FAILED_TO_FETCH_CHARACTERS,HTTP_STATUS.BAD_GATEWAY);
        }
        return response?.data?.results;
    }

    public async fetchCharacterById(id:string):Promise<{result:ICharacter,cached:boolean}>{
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

            await setCache(cacheKey, response.data,3600);
        }
        return {result:response.data,cached:false};
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

    public async getAll(page: number, limit: number, search: string): Promise<{result:ICharactersData,cached:boolean}> {
        const cacheKey = `getAll:page:${page}:limit:${limit}:search:${search || "none"}`;
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return {result:cachedData,cached:true};
        }
        let allCharacters = [];
        allCharacters = await this.fetchCharacters(1, 100);

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

        // Apply enrichCharacterDetails to get all properties
        const enrichedCharacters = await this.enrichCharacterDetails(paginatedCharacters);
          // Prepare the response
        const response = {
            totalCharacters,
            totalPages,
            currentPage: page,
            characters: enrichedCharacters
        };
        // Cache the response
        await setCache(cacheKey, response, 3600); // Cache for 1 hour
        return {result:response,cached:false};
    }

}
export default new CharacterService;