import express, { NextFunction, Request, Response  } from "express";
import { GetFoodAvailability, GetFoodsIn35min, GetTopKitchens, KitchenById, SearchFoods } from "../controllers/ShoppingController";




const router = express.Router();


// ______________________FoodAvailability____________

router.get('/:pincode', GetFoodAvailability)


// _____________ Top kitchens
// Måske bliver det fjernet da Der ikke kommer til at være mange køkkener 
router.get('/top-kitchens/:pincode', GetTopKitchens)

// Available FAST -- under 30 mins?
router.get('/foods-in-35-min/:pincode', GetFoodsIn35min)


// _____________ Søg Funktionalitet 

router.get('/search/:pincode', SearchFoods)
// Find Kitchen by ID?
router.get('/kitchen/:id', KitchenById)


export {router as ShoppingRoute }