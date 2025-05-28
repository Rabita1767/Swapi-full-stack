import {Request,Response,NextFunction} from 'express';
import {redisClient} from '../cache/redisClient';
import { sendResponse } from '../utils/common';
import HTTP_STATUS from '../constants/statusCode';
import { Messages } from '../utils/messages';
import CharacterService from '../services/character.service';
import { getCache, setCache } from '../cache/cacheHelper';
import characterService from '../services/character.service';
import axios from 'axios';

class CharacterController {

    public async getAllCharacters(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const data = await CharacterService.fetchCharacters(Number(page), Number(limit));
            return sendResponse(res,HTTP_STATUS.OK,Messages.CHARACTER_FETCHED_SUCCESSFULLY, data.cached,data.result);     
        } catch (error) {
            next(error);
        }
    }

    // public async getAllCharacters(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const page = parseInt(req.query.page as string) || 1;
    //         const limit = parseInt(req.query.limit as string) || 10;
    
    //         // Fetch the characters
    //         const data = await CharacterService.fetchCharacters(Number(page), Number(limit));
    
    //         // Extract additional information for each character
    //         const enrichedResults = await Promise.all(
    //             data.result.results.map(async (character: any) => {
    //                 try {
    //                     const additionalInfo = await axios.get(character.url); // Fetch additional info
    //                     return { ...character, details: additionalInfo.data.result }; // Merge additional info
    //                 } catch (error) {
    //                     return { ...character, details: null }; // Return null if additional info fetch fails
    //                 }
    //             })
    //         );
    
    //         // Replace the original results with enriched results
    //         data.result.results = enrichedResults;
    
    //         // Send the response
    //         return sendResponse(
    //             res,
    //             HTTP_STATUS.OK,
    //             Messages.CHARACTER_FETCHED_SUCCESSFULLY,
    //             data.cached,
    //             data.result
    //         );
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    public async getCharacterById(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {id}=req.params;
            const data = await characterService.fetchCharacterById(id);
            return sendResponse(res,HTTP_STATUS.OK,Messages.CHARACTER_FETCHED_SUCCESSFULLY, data.cached, data.result);   
        } catch (error) {
            next(error);
        }
    }

    public async searchCharacterByName(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            console.log("searchCharacterByName called");
            const {name}=req.query;
            const result=await characterService.searchByName(name as string);
            return sendResponse(res,HTTP_STATUS.OK,Messages.CHARACTER_FETCHED_SUCCESSFULLY, result.cached, result.result);
            
        } catch (error) {
            next(error);
        }
    }

    public async getAll(req:Request,res:Response,next:NextFunction):Promise<any>{
        try {
            const page=parseInt(req.query.page as string)|| 1;
            const limit=parseInt(req.query.limit as string)|| 10;
            const search= req.query.search as string || '';
            const data=await characterService.getAll(page,limit,search);
            return sendResponse(res,HTTP_STATUS.OK,Messages.CHARACTER_FETCHED_SUCCESSFULLY,data.cached,data.result);
        } catch (error) {
            next(error)
        }
    }

    

}
export default new CharacterController;