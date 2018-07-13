import express from 'express'
import path from 'path'
const multer  = require('multer');
const fs = require('fs');
const aws = require('aws-sdk');
var convert = require('xml-js');

import Promise from 'bluebird';
const GoogleCloudStorage = Promise.promisifyAll(require('@google-cloud/storage'));


const app = express.Router()

global.date = new Date()

 var storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, '.../../public');
     },
     filename: function (req, file, cb) {
       cb(null, file.originalname)
     }
   })
   
  const upload = multer({ storage: storage }).single('file')

  global.gpxData = '';
  global.gpxDataFile = '';
  global.dataLocation = '';
app.post('/:id', (req, res) =>{

    upload(req, res, (err) => {
      
        gpxData = req.file.path
        gpxDataFile = req.file.filename
        console.log('gpxDataFie-->',gpxDataFile) 
        
        // configuring the AWS environment
         aws.config.update({
           accessKeyId: process.env.AWS_ACCESS_KEY_ID,
           secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
         });

         var s3 = new aws.S3();
         var filePath = gpxData
        
         //configuring parameters
         var params = {
         Bucket: 'zumaiabira',
         Body : fs.createReadStream(filePath),
         Key : "folder/"+Date.now()+"_"+path.basename(filePath),
         ACL: 'public-read'
         }
         s3.upload(params, function (err, data) {
         //handle error
         if (err) {
           console.log("Error", err);
         }
         //success
         if (data) {
           console.log("Uploaded in:", data.Location);
           dataLocation = data.Location;
         }
         });
        

         
       fs.readFile(gpxData, (err, contents) => {
           if(err) {
             console.log('error: ', err);
           } 
           const result = convert.xml2json(contents,{compact: true, spaces: 4});
       
            // app.get('/:id', (req, res)=>{
            //   res.send(data)
          // })
          });
 
  
         if(err) {
            return res.status(500).send("Error uploading file"); 
          }   
          return res.status(200).send("uploading file succeful"); 
     }) 
})

export default app 
