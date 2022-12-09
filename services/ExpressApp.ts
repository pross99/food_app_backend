



import express, { Application } from 'express';
import {AdminRoute,VendorRoute, ShoppingRoute } from '../routes/Index'
import bodyParser from 'body-parser';
import path from 'path'

// Prøver at holde express og database seperat 
export default async(app:Application) => {
    //app som dependency 

//Eksekverer alt express relateret kode
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    //for at acces image files
    app.use('/images', express.static(path.join(__dirname, 'images')))
    app.use('/admin', AdminRoute);
    app.use('/vendor', VendorRoute)
    app.use(ShoppingRoute)


    return app;
}





