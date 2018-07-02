import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import { User } from '../models'
import {
    hashSync as hash, 
    compareSync as comparePasswords
} from 'bcryptjs'

const app = express.Router()
const debug = new Debug('ZumaiaBira:auth')

app.post('/signin', async (req, res, next)=>{ 
    const { email, password } = req.body
    const user = await User.findOne({ email })
    
    if (!user) {
        debug(`user with email ${email} not found`)
        return handleLoginFailed(res)
        }
    if(!comparePasswords(password, user.password)){
        debug(`Passwords do not match: ${password} !== ${user.password}`)
        return handleLoginFailed(res)
    }

    const token = createToken(user)
    res.status(200).json({
        message: 'Login succeded',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
})
const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 86400 })

app.post('/signup', async (req,res)=>{
    const { firstName, lastName, email, password } = req.body
    const u = new User({
        firstName,
        lastName,
        email,
        password: hash(password, 10)
    })
    debug (`creating new user: ${user}`)

    const user = await u.save()
    
    console.log(user)

    const token = createToken(user)
    res.status(201).json({
        message: 'User saved',
        token,
        userId: user._id,
        firstName,
        lastName,
        email
    })
})

function handleLoginFailed(res) {
   return res.status(401).json({
        message: 'Login failed',
        error: 'email and password don\'t match'
    })
}
export default app