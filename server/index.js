import http from 'http'
import Debug from 'debug'
import app from './app'
import mongoose, { Mongoose } from 'mongoose'
import { mongoUrl } from './config/index'

const PORT = 3000
const debug = new Debug('ZumaiaTour:root')

mongoose.Promise = global.Promise

async function start() {
   await mongoose.connect(mongoUrl)

    app.listen(PORT, () => {
        debug(`server runing in port: ${PORT}`)
    })
}

start()