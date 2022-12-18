import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../config/Index';
import { VendorPayload } from '../dto/Vendor.dto';
import { Request } from 'express';
import { AuthPayload } from '../dto/Auth.dto';

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}


export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt:string) => {
    // passer user password, savedpassword og salt (som jeg får fra databasen)
    // Hvis userpassword er det samme som savedpassword -- hvis det er, er det et valid password 
    return await GeneratePassword(enteredPassword, salt) === savedPassword
}

export const GenerateSignature = (payload: AuthPayload) => {
// expiresIn virker ikke??
    return jwt.sign(payload,APP_SECRET, {expiresIn: '90d'})
    

}


export const ValidateSignature = async (req : Request) => {
    //Får signature fra min request 
    //er den valid eller ej? Hvis den er, asign den specifikke paylaod til en request 
    // hvis ikker - return false 
    const signature = req.get('Authorization')

    if(signature) {

        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload; 
        // user fra middleware
        req.user = payload;

        return true;
    }
     
    return false 
}
