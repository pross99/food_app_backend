import { NextFunction, Response, Request } from "express";
import { CreateVendorInput } from "../dto/Vendor.dto";
import { Vendor } from "../models/Index";
import { GeneratePassword, GenerateSalt } from "../utility/PasswordUtility";


export const CreateVendor = async (req: Request, res:Response, next: NextFunction) => {
    


        const {name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;

        const existingVendor = await Vendor.findOne({email: email })

        if(existingVendor !== null) {
            return res.json({"Besked" : "Denne email er allerede forbundet til en anden lokation"})
        }


        //Generate  en "salt"
        
        const salt = await GenerateSalt()
        const userPassword = await GeneratePassword(password, salt);


        //enkrypter password ved hjælp af salt



        const createVendor = await Vendor.create({
            name: name,
            adress: address,
            pincode: pincode,
            foodType: foodType,
            email: email,
            password: userPassword,
            salt: salt,
            ownerName: ownerName,
            phone: phone,
            rating: 0,
            serviceAvailable: false,
            coverImages: [],
        })



        return res.json(createVendor)

}



export const GetVendors = async (req: Request, res:Response, next: NextFunction) => {
    
}

export const GetVendorByID= async (req: Request, res:Response, next: NextFunction) => {
    
}

