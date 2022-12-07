import { Request, Response, NextFunction, request } from "express";
import { RequiredPaths } from "mongoose/types/inferschematype";
import { CreateFoodInputs } from "../dto/Food.dto";
import { EditVendorInputs, VendorLoginInputs } from "../dto/Vendor.dto";
import { Food } from "../models/Food";
import { GenerateSignature, ValidatePassword } from "../utility/PasswordUtility";
import { FindVendor } from "./AdminController";

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const {email, password} = <VendorLoginInputs>req.body;

    const existingVendor = await FindVendor('', email);

    if(existingVendor !== null) {
        //validering og give adgang

        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt );

        if(validation){
            //Return den samme user

            const signature = GenerateSignature ({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodType,
                name: existingVendor.name
            })
            return res.json(signature);


        }else{
            return res.json({"Besked" : "Password ikke genkendt"})

        }




    }
    return res.json({"Besked" : "Logind ikke genkendt"})



    //man skal kun have adgang til disse endpoints hvis man er logget ind 
    // jsonWebtoken - bruger  en "signature som bliver gemt 1dag "

}


export const GetVendorProfile = async (req:Request, res:Response, next: NextFunction) => {

    const user = req.user;
    if(user){

        const existingVendor = await FindVendor(user._id)

        return res.json(existingVendor)
    }

    return res.json({"Besked" : "lokation ikke fundet "})
    
}



export const UpdateVendorProfile = async (req:Request, res:Response, next: NextFunction) => {

    const {foodTypes, name, address, phone} = <EditVendorInputs> req.body;

    const user = req.user;
    if(user){

        const existingVendor = await FindVendor(user._id)

        if(existingVendor !== null) {
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodTypes;
            
        }

        return res.json(existingVendor)
    }

    return res.json({"Besked" : "lokation ikke fundet "})

}



export const UpdateVendorSerive = async (req:Request, res:Response, next: NextFunction) => {
    // Det er ikke altid en lokation kan lave mad, derfor skal de have mulighed for at ændre "serviceavailable"
    // Skifter mellem true og false hver gang der sendes en request med denne metode aka /vendor/service

    const user = req.user;

    if(user){
   const existingVendor = await FindVendor(user._id)

        if(existingVendor !== null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            const savedResult = await existingVendor.save()
            return res.json(savedResult)
          
            
        }

        return res.json(existingVendor)
    }

    return res.json({"Besked" : "information ikke fundet "})


}

export const AddFood = async (req:Request, res:Response, next: NextFunction) => {

    const user = req.user;

    if(user){
   // Skal finde vendor før tilføjelse af ny ret 

   const {name, description, category, foodType, readyTime, price} = <CreateFoodInputs>req.body 
   const vendor = await FindVendor(user._id)

   if(vendor !== null){
    const createdFood = await Food.create({
        vendorId : vendor._id,
        name: name,
        description: description,
        category: category,
        foodType: foodType,
        images: ['Vedikkeombilledeskalværeher.jpg '],
        readyTime: readyTime,
        price: price,
        rating: 0
    })
// hvis retten er oprettet succesfuldt bliver den pushet til vendor food array og herefter skal vendor gemmes?
    vendor.foods.push(createdFood);
    const result = await vendor.save();

    return res.json(result)

   }
          
            
        }


    return res.json({"Besked" : "Der skete en fejl ved tilføjelse af retten "})}

    export const GetFoods = async (req:Request, res:Response, next: NextFunction) => {

        const user = req.user;
    
        if(user){
       
              
                
            }
    
    
        return res.json({"Besked" : "ret/mad information ikke fundet "})}
