// Class validator
//class-transformer

import {IsEmail, IsEmpty, Length} from 'class-validator'

export class CreatCustomerInputs {

    //ISEmail - decorator
    @IsEmail()
    email: string;

  //  @IsEmpty()
    //@Length(7,12)
    phone: string;


   // @IsEmpty()
    @Length(6,12)
    password: string;
}

export class UserLoginInputs {

    //ISEmail - decorator
    @IsEmail()
    email: string;

   // @IsEmpty()
    @Length(6,12)
    password: string;
}

export class EditCustomerProfileInputs {
 

    //@Length(2,16)
    firstName: string;

   // @Length(2,16)
    lastName: string;

  //  @Length(2,16)
    address: string;
}



export interface CustomerPayload {

    _id: string;
    email: string;
    verified: boolean
}