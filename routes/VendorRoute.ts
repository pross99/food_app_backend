import express, { NextFunction, Request, Response  } from "express";
import { AddFood, GetFoods, GetVendorProfile, UpdateVendorPicture, UpdateVendorProfile, UpdateVendorSerive, VendorLogin } from "../controllers/Index";
import { Authenticate } from "../middlewares/CommonAuth";


//Multer til billede håndtering
import multer from 'multer'


const path = require('path')
const router = express.Router();

const imageStorage = multer.diskStorage({
    //vil gerne gemme billeder i image directory 
    destination: function(req,file, cb){
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    },
})





const images = multer({storage: imageStorage}).array('images', 10)
  
    



// Login har ikke brug for authentication ? 
router.post('/login',VendorLogin )



router.use(Authenticate) // nu bruges Authenticate på understående endpoints
router.get('/profile',  GetVendorProfile)
router.patch('/profile', UpdateVendorProfile)
router.patch('/coverimage', images, UpdateVendorPicture)
router.patch('/service', UpdateVendorSerive)

router.post('/food', images, AddFood)
router.get('/foods', GetFoods)




router.get('/', (req: Request, res:Response, next: NextFunction) => {


    res.json({message: "Hello from VendorRoute"})
})

export { router as VendorRoute};