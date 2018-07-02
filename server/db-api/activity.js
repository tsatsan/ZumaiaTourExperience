import Debug from 'debug'
import { Activity } from '../models'
const debug = new Debug("ZumaiaTourExperience:db-api:activity")

export default {
    findAll: () => {
        debug('Finding all activities')
        return Activity.find()
    },
    findById: (_id) =>{
        debug(`Find activity with id ${_id}`)
        return Activity.findOne({_id})
    },
    create: (a) => {
        debug(`Creating new activity ${a.name}`)
        const activity = new Activity(a)
        return activity.save()
    },
    findByIdAndRemove: (_id)=>{
        debug(`delete activity ${_id}`)
        return Activity.findByIdAndRemove({_id})
    },
    findOneAndUpdate: (_id)=>{
        debug(`delete activity ${_id}`)
        return Activity.findOneAndUpdate({_id})
    }
}
