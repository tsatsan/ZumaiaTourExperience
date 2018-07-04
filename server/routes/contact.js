import express from 'express';


const configMessage = require('../utils/configMessage');

const app = express.Router()

app.post('/', (req, res) => {
    configMessage(req.body);
    console.log(req.body)
    res.status(200).send();
   })

     
export default app 