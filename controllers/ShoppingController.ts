import express, { NextFunction, Request, Response  } from "express";
import { FoodDoc } from "../models/Index";
import { Vendor } from "../models/Vendor";



export const GetFoodAvailability = async (req:Request, res:Response, next:NextFunction) => {


    const pincode = req.params.pincode
    // bruger pincode til finde retter fra et køkken

    const result = await Vendor.find({pincode: pincode, serviceAvailable: false }) // Serviceavailable - er køkkenet åben? Man skal kun kunne se mad fra åbne køkkner 
    .sort([['rating', 'descending']])
    .populate("foods")

    if(result.length > 0 ) {
      return res.status(200).json(result)
    }

    return res.status(400).json({message: "Ingen data fundet.."})

    
}
export const GetTopKitchens  = async (req:Request, res:Response, next:NextFunction) => {

    const pincode = req.params.pincode
  

    const result = await Vendor.find({pincode: pincode, serviceAvailable: false }) // Serviceavailable - er køkkenet åben? Man skal kun kunne se mad fra åbne køkkner 
    .sort([['rating', 'descending']])
    .limit(1)
 

    if(result.length > 0 ) {
      return res.status(200).json(result)
    }

    return res.status(400).json({message: "Ingen data fundet.."})


}
export const GetFoodsIn35min = async (req:Request, res:Response, next:NextFunction) => {
// Alle reter har en "readyTime" værdi

const pincode = req.params.pincode
  

const result = await Vendor.find({pincode: pincode, serviceAvailable: false }) // Serviceavailable - er køkkenet åben? Man skal kun kunne se mad fra åbne køkkner 
.populate("foods")


if(result.length > 0 ) {

    //Deklarer et tomt array 
    let foodResult: any = []

// looper genem vendor. Vendor har en foods parameter som er en slags food document interface (FoodDoc)
    result.map(vendor => {
        const foods = vendor.foods as [FoodDoc]
        
        // har foods under 35min i readyTime så bliver de pushet 
        foodResult.push(...foods.filter(food=> food.readyTime <= 35))

    })
  return res.status(200).json(foodResult)
}

return res.status(400).json({message: "Ingen data fundet.."})




}
export const SearchFoods = async (req:Request, res:Response, next:NextFunction) => {
    // søge efter foods unden at få køkknet med i postman? 

    const pincode = req.params.pincode
  

    const result = await Vendor.find({pincode: pincode, serviceAvailable: false }) // Serviceavailable - er køkkenet åben? Man skal kun kunne se mad fra åbne køkkner 
    .populate("foods")
    
    
    if(result.length > 0 ) {
    
        let foodResult: any = []


    result.map(item =>  foodResult.push(...item.foods))
       

    
      return res.status(200).json(foodResult)
    }
    
    return res.status(400).json({message: "Ingen data fundet.."})


}



export const KitchenById = async (req:Request, res:Response, next:NextFunction) => {

    const id = req.params.id
    // bruger pincode til finde retter fra et køkken

    const result = await Vendor.findById(id).populate("foods") 
 
 
   if(result) {
      return res.status(200).json(result)
}

    return res.status(400).json({message: "Ingen data fundet.."})

}