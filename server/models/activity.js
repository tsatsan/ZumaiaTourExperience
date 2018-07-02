import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const ActivitySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tipo: { type: String, required: true },
    unlevenless: { type: Number, required: true },
    time: { type: Number, required: true },
    distance: { type: Number, required: true },
    gpxData: { type: String, required: true},
    user: { type: ObjectId, ref: 'User ', required: true } 
})

export default mongoose.model('Activity', ActivitySchema)

