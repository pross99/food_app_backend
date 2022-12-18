// Email

//notos

//OTP
// Generate et One time password og tilføje 30 minutter ekstra til expiry date objektet - herefter exportere et objekt med en otp on expiry date 
export const GenerateOtp = () => {

    const otp = Math.floor(100000 + Math.random() * 900000)
    let expiry = new Date
    expiry.setTime( new Date().getTime() + (30*60*1000))

    return {otp, expiry}
}

export const onRequestOTP = async(otp:number, toPhoneNumber:string) => {

const accountSid = 'AC42dda9c0e18158656db36309d3bf0206';
const authToken = '603794168bffe58dade46227960635d4';
const client = require ('twilio')(accountSid, authToken);

const response = await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: '+12517328594',
    to: `+45${toPhoneNumber}`,
})


return response
}


