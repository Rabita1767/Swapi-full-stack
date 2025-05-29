import {Request,Response,NextFunction} from 'express';
import {redisClient} from '../cache/redisClient';
import { sendResponse } from '../utils/common';
import HTTP_STATUS from '../constants/statusCode';
import { Messages } from '../utils/messages';
import CharacterService from '../services/character.service';
import { getCache, setCache } from '../cache/cacheHelper';
import characterService from '../services/character.service';
import axios from 'axios';
import { ICharactersResponse } from '../types/type';

class CharacterController {

    public async getCharacterById(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {id}=req.params;
            const data = await characterService.fetchCharacterById(id);
            return sendResponse(res,HTTP_STATUS.OK,Messages.CHARACTER_FETCHED_SUCCESSFULLY, data.cached, data.result);   
        } catch (error) {
            next(error);
        }
    }

    public async getAll(req:Request,res:Response,next:NextFunction):Promise<void>{
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