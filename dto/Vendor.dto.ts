export interface CreateVendorInput {

    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string 

}

export interface EditVendorInputs {
    //Hvilke information må man update/ændre
    name:string;
    address: string;
    phone: string;
    foodTypes: [string]
}


export interface VendorLoginInputs {

    email: string;
    password: string;

}

export interface VendorPayload {
    _id: string;
    email: string;
    name: string;
    foodTypes: [string];
    // mere?
}