import express from 'express'
import fs from 'fs'
import path from 'path'
import util from 'util'
const multer  = require('multer');
const ext = require('file-extension');
const cloudinary = require('cloudinary');
import { image } from 'cloudinary';
import { activityMiddleware } from '../middleware';


cloudinary.config({
      cloud_name: "blaulunajordi",
      api_key: "413445357641469",
      api_secret: "CoSlIHl-0TDVewuXs9gFXwYboPc"
  });

const app = express.Router()


 var storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, './public/img');
     },
     filename: function (req, file, cb) {
       cb(null, + new Date() + '.'+ ext(file.originalname) )
     }
   })
   

  const upload = multer({ storage: storage }).single('file')
   
  global.imgUrl = '';

app.post('/:id', (req,res) =>{

    upload(req, res, (err) => {
      console.log(req.file) 
      res.send(req.file)
    cloudinary.uploader.upload(req.file.path, (result) => {
            imgUrl = result.url
         }); 
         if(err) {
            return res.status(500).send("Error uploading file"); 
          }

          
     })

    
})

export default app 
