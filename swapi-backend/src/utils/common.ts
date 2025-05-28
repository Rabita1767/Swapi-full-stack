import { ApiResponse } from "../types/type";
import { Response } from "express";

export const sendResponse = (
    res: Response,
    status: number,
    message: string,
    cached: boolean = false,
    result: any = null,
  ): void => {
    const response: Partial<ApiResponse> = {
      success: status < 400,
      message: message,
      cached: cached,
      data: result,
      error: null,
    } as ApiResponse;
    if (status >= 400) {
      response.success = false;
      response.error = result;
      response.message = "Internal server error";
    } else {
      response.success = true;
      response.cached = cached;
      response.data = result;
      response.message = "Successfully completed operations";
    }
  
    if (message) {
      response.message = message;
    }
    if(cached){
      response.cached = cached;
    }
    res.status(status).send(response);
  };