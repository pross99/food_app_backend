import { NextFunction, Response, Request } from "express";
import { CreateVendorInput } from "../dto/Vendor.dto";
import { Vendor } from "../models/Index";
import { GeneratePassword, GenerateSalt } from "../utility/PasswordUtility";

// checker om email id er til stede, hvis ikke kigger man efter id kun. Hvis email id er til stede leder man efter vendor ud fra email id
export const FindVendor = async(id: string | undefined, email?: string) => {


        if(email) {
            return  await Vendor.findOne({ email: email})
          
        }else {
            return await Vendor.findById(id)
        }
}


export const CreateVendor = async (req: Request, res:Response, next: NextFunction) => {
    


        const {name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;

        const existingVendor = await FindVendor('', email)

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
// find alle vendors
    const vendors = await Vendor.find()

    if(vendors !== null) {
        return res.json(vendors)
    }

    return res.json({"Besked": "lokation ikke til gænglig"})
    
}

export const GetVendorByID= async (req: Request, res:Response, next: NextFunction) => {

    const vendorId = req.params.id; 


// find vendor ud fra et ID
    const vendor = await FindVendor(vendorId)

    if(vendor !==null) {
        return res.json(vendor)
    }
    return res.json({"Besked": "lokation ikke til gænglig"})
}

