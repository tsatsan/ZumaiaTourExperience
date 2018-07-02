import express from 'express'
import { required } from '../middleware'
import { activity } from '../db-api'
import { image } from 'cloudinary';
import { handleError } from '../utils'

var urljoin = require('url-join');

const app = express.Router()

app.get('/', async (req, res) => {
    
    try {
        const activities = await activity.findAll()
        res.status(200).json(activities)
    } catch (error) {
        handleError(error, res)
    }
})    

app.get('/:id', async (req, res) =>{
try {
    const a = await activity.findById(req.params.id)
    res.status(200).json(a)
    }catch (error){
    handleError(error, res)
    }
})  

app.post('/', required, async (req,res) =>{
    const { name, description,  image, tipo, unlevenless, time, distance, gpxData } = req.body
    console.log('probant dataLoc --->>', global.dataLocation)
       const urlGpx = urljoin('http://localhost:3000/api/gpx/', global.gpxDataFile)
    
    const a = {
        name, 
        description, 
        image, 
        tipo, 
        unlevenless, 
        time, 
        distance, 
        gpxData,
        user: req.user
    }
    a.gpxData = global.dataLocation
    a.image = global.imgUrl
    // a._id = +new Date()
    a.user = req.user
    try{
        const savedActivity = await activity.create(a)
        res.status(201).json(savedActivity)
        }catch(error){
            handleError(error, res)
        }
      

})

 app.delete('/:id', async (req, res) => {
    try {
        const deleteActivity = await activity.findByIdAndRemove(req.params.id)
        res.status(200).json(deleteActivity)
        }catch (error){
        handleError(error, res)
        }
 });

//  app.put('update/:id', async (req,res)=>{
//      const activity = req.body
//      const { name, description,  image, tipo, unlevenless, time, distance, gpxData } = req.body
    
//      const urlGpx = urljoin('http://localhost:3000/api/gpx/', global.gpxDataFile)
  
//   const a = {
//       name, 
//       description, 
//       image, 
//       tipo, 
//       unlevenless, 
//       time, 
//       distance, 
//       gpxData,
//       user: req.user
//   }
//   a.gpxData = urlGpx
//   a.image = global.imgUrl
//   a._id = req.params.id
//   a.user = req.user
//   try{
//       const savedActivity = await activity.findOneAndUpdate(a)
//       res.status(201).json(savedActivity)
//       }catch(error){
//           handleError(error, res)
//       }

//    });

//  app.post('/upload', (req,res) =>{
//      upload(req, res, function(err) {
//         console.log(req.file.path)
//        cloudinary.uploader.upload(req.file.path, 
//         function (result){
//           const imageUrl = result.url
//             console.log(imageUrl)
//             req.body = imageUrl
//         });
//         if(err) {
//              return res.status(500).send("Error uploading file"); 
//          }
        
       
//      })

//  })

export default app