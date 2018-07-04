import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
var path = require ('path')
import { activity, auth, upload, gpx, contact } from './routes'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

if (process.env.NODE_ENV === 'development'){
    app.use((req, res, next) => { 
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
        next()
    })
}
app.use(express.static(path.join(__dirname, './public')))
app.use('/api/activities', activity)
app.use('/api/auth', auth)
app.use('/api/upload', upload)
app.use('/api/gpx', gpx)
app.use('/api/contact', contact)

export default app