import { Request, NextFunction, Response } from 'express'
import {AuthPayload } from '../dto/Auth.dot'
import { ValidateSignaure } from '../utility/PasswordUtility'


// Middleware håndterer function lige før den udfører actions og vier en response 



declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }

    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await ValidateSignaure(req);

    if(validate) {
        next()
    }else{
        return res.json({"besked":"Bruger ikke godkendt"})
    }
}