import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const ActivitySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tipo: { type: String, required: true },
    unlevenless: { type: String, required: true },
    time: { type: String, required: true },
    distance: { type: String, required: true },
    gpxData: { type: String, required: true},
    user: { type: ObjectId, ref: 'User ', required: true } 
})

export default mongoose.model('Activity', ActivitySchema)

