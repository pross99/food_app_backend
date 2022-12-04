import express from 'express';

const app = express();


app.use('/', (req,res) => {
    return res.json("Hello form food order backend")
})

app.listen(8000, () => {
    console.log('App is lis port 8000')
})