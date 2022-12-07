import express from 'express';
import {AdminRoute,VendorRoute } from './routes/Index'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import { MONGO_URI } from './config/Index';
import path from 'path'

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
//for at acces image files
app.use('/images', express.static(path.join(__dirname, 'images')))


app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute)




mongoose.connect(MONGO_URI, {
   
}).then(result => {
    console.log("DB forbundet")
}).catch(err => console.log('error' + err))

app.listen(8000, () => {

    console.clear()
    console.log('App is lis port 8000')
})