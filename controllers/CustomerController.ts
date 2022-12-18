import express, { Request, Response, NextFunction } from "express";
import {plainToClass} from 'class-transformer'
import { CreatCustomerInputs, UserLoginInputs, EditCustomerProfileInputs } from "../dto/Customer.dto";
import {validate} from 'class-validator'
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from "../utility/PasswordUtility";
import { Customer } from "../models/Customer";
import { GenerateOtp, onRequestOTP } from "../utility/NotificationUtility";


export const CustomerSignUp = async (req: Request, res:Response, next: NextFunction) => {

const customerInputs = plainToClass(CreatCustomerInputs, req.body)

const inputError = await validate(customerInputs, {validationError: {target: true }}) 

if(inputError.length >0) {

    return res.status(400).json(inputError);
}

const {email,phone, password} = customerInputs

const salt = await GenerateSalt()
const userPassword = await GeneratePassword(password, salt)

const {otp, expiry} = GenerateOtp()

 const existingCutomer = await Customer.findOne({email: email})

 if(existingCutomer !== null) {
     return res.status(400).json({message: 'Email er allerede i brug '})
 }



const result = await Customer.create({
    email: email,
    password: userPassword,
    salt: salt,
    phone: phone,
    otp: otp,
    otp_expiry: expiry,
    firstName: '',
    address: '',
    verified: false,
    // latitude og longtitude bruges i forhold til placeringstjeneste
    lat: 0,
    lng: 0,
})

if(result) {
// Send OTP til bruger
    await onRequestOTP(otp,phone)


// generate en signature
const signature = GenerateSignature({
    _id: result._id,
    email: result.email,
    verified: result.verified

})
// send result til client 
return res.status(201).json({signature: signature, verified: result.verified, email: result.email})

}

return res.status(400).json({message: 'Fejl ved signup'})



}

export const CustomerLogin = async (req: Request, res:Response, next: NextFunction) => {

    const loginInputs = plainToClass(UserLoginInputs, req.body )

    const loginErrors = await validate(loginInputs, {validationError: {target: true}})

    if(loginErrors.length > 0){
        return res.status(400).json(loginErrors)
    }

    const {email, password} = loginInputs;

    const customer = await Customer.findOne({email:email})

    if(customer) {
        const validation= await ValidatePassword( password, customer.password, customer.salt);

        if(validation) {
            const signature = GenerateSignature({
                _id:  customer._id,
                email: customer.email,
                verified: customer.verified
            
            })
            // send result til client 
            return res.status(201).json({
                signature: signature,
                 verified: customer.verified,
                  email: customer.email})
            
            } 


        }
        return res.status(404).json({message: 'Fejl ved logind'})
    }





export const CustomerVerify = async (req: Request, res:Response, next: NextFunction) => {


    const {otp} = req.body;

    const customer = req.user;

    if(customer) {

        const profile = await Customer.findById(customer._id)

        if(profile) {

            if(profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;

                const updatedCustomerResponse = await profile.save();

                //genrate signature

                const signature = GenerateSignature( {
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified
                });
                return res.status(201).json({
                    signature: signature, 
                    verified: updatedCustomerResponse.verified,
                     email: updatedCustomerResponse.email})
            }
        }
    }

    return res.status(400).json({message: 'Fejl ved signup'})

}

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;

    if(customer){

        const profile = await Customer.findById(customer._id);

        if(profile){
            const { otp, expiry } = GenerateOtp();
            profile.otp = otp;
            profile.otp_expiry = expiry;

            await profile.save();
            await onRequestOTP(otp, profile.phone);

            return res.status(200).json({ message: 'Engangskode sendt til dit tilf-nummer!'})

        }
    }

    return res.status(400).json({ msg: 'Error with Requesting OTP'});
}

export const GetCustomerProfile = async (req: Request, res:Response, next: NextFunction) => {
   
   
    const customer = req.user;

 
    if(customer) {
    const profile = await Customer.findById(customer._id);

    if(profile) {


        res.status(201).json(profile)
    }


}
return res.status(400).json({ msg: 'Kunne ikke hente profil'});
}



export const EditCustomerProfile = async (req: Request, res:Response, next: NextFunction) => {
    const customer = req.user;

    const customerInputs = plainToClass(EditCustomerProfileInputs, req.body)

    const customerInputs = await validate(customerInputs, {validationError: {target: false}})

    if(validationError.length > 0 ) {
        return res.status(400).json(validationError)
    }


    const {firstName, lastName, address} = customerInputs

    if(customer) {
    const profile = await Customer.findById(customer._id);

    if(profile) {

        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.address = address;
        const result = await profile.save()

        res.status(201).json(result)
    }
}
return res.status(400).json({ msg: 'Fejl ved opdatering af profil'});

}