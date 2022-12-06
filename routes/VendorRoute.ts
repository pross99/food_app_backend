import express, { NextFunction, Request, Response  } from "express";
import { GetVendorProfile, UpdateVendorProfile, UpdateVendorSerive, VendorLogin } from "../controllers/Index";
import { Authenticate } from "../middlewares/CommonAuth";



const router = express.Router();

// Login har ikke brug for authentication ? 
router.post('/login',VendorLogin )



router.use(Authenticate) // nu bruges Authenticate på understående endpoints
router.get('/profile',  GetVendorProfile)
router.patch('/profile', UpdateVendorProfile)
router.patch('/service', UpdateVendorSerive)




router.get('/', (req: Request, res:Response, next: NextFunction) => {


    res.json({message: "Hello from VendorRoute"})
})

export { router as VendorRoute}