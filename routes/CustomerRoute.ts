import express, { Request, Response, NextFunction } from "express";
import { CustomerLogin, CustomerSignUp, CustomerVerify, EditCustomerProfile, GetCustomerProfile, RequestOtp } from "../controllers/Index";
import { Authenticate } from "../middlewares/CommonAuth";

const router = express.Router();


/** --------------------- Signup // Create Customer */

router.post('/signup', CustomerSignUp)




/** --------------------- Login */

router.post('/login', CustomerLogin)

//authenication

router.use(Authenticate)


/** --------------------- Verify Customer Acc */

router.patch('/verify', CustomerVerify)

/** --------------------- OTP //  */

router.get('/otp', RequestOtp)
/** --------------------- Profile */


router.get('/profile', GetCustomerProfile)
router.patch('/profile', EditCustomerProfile)




//Cart 

// Order 
// Payment
export {router as CustomerRoute }