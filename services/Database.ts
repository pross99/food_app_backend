
// Prøver at holde express og database seperat 

import mongoose from 'mongoose'

import { MONGO_URI } from '../config/Index';




export default async() => {

    try {
        await mongoose.connect(MONGO_URI, {
           
        })
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

}
  
    

// mongoose.connect(MONGO_URI, {
   
// }).then(result => {
//     console.log("DB forbundet")
// }).catch(err => console.log('error' + err))

// app.listen(8000, () => {

//     console.clear()
//     console.log('App is lis port 8000')
// })