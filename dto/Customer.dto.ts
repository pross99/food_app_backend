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

export class EditCustomerProfileInput {
   
  @Length(3,16)
  firstName: string;

  @Length(3,16)
  lastName: string;
  
  @Length(6,16)
  address: string;
}



export interface CustomerPayload {

    _id: string;
    email: string;
    verified: boolean
}