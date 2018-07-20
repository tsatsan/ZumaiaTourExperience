import express from 'express'
import { required } from '../middleware'
import { activity } from '../db-api'
import { handleError } from '../utils'

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
    a.user = req.user
    
    try{
        const savedActivity = await activity.create(a)
        console.log(savedActivity)
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
 app.put('/:id', required, async (req, res) => {
    console.log('probant dataLoc --->>', global.dataLocation)
    const { name, description,  image, tipo, unlevenless, time, distance, gpxData, } = req.body
    
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
    
        a.user = req.user
  
    try {
        const updateActivity = await activity.findByIdAndUpdate(req.params.id, a)
        res.status(200).json(updateActivity)
    }catch (error){
        handleError(error, res)
        }
});
//  app.put('/:id', function(req, res, next) {
//     activity.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//       if (err) return next(err);
//       res.json(post);
//     });
//   });

export default app