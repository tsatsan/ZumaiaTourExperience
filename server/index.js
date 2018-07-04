import http from 'http'
import Debug from 'debug'
import app from './app'
import mongoose, { Mongoose } from 'mongoose'
import { mongoUrl, port } from './config/index'


const debug = new Debug('ZumaiaTour:root')

mongoose.Promise = global.Promise

async function start() {
   await mongoose.connect(mongoUrl)

    app.listen(port, () => {
        debug(`server runing in port: ${port}`)
    })
}

start()