import { Request, NextFunction, Response } from 'express'
import {AuthPayload } from '../dto/Auth.dto'
import { ValidateSignature } from '../utility/PasswordUtility'


// Middleware håndterer function lige før den udfører actions og vier en response 



declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }

    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const signature = await ValidateSignature(req);

    if(signature) {
        return next()
    }else{
        return res.json({"besked":"Bruger ikke godkendt"})
    }
};