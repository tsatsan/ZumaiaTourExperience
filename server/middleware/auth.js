import Debug  from 'debug'
import { secret } from '../config'
import jwt from 'jsonwebtoken'

const debug = new Debug('ZumaiaBira')

export const required  = (req, res, next) => {
    jwt.verify(req.query.token, secret, (err, token) => {
        if(err) {
            debug('JWFT was not encrypted with our secret')
            return res.status(401).json({
                message: 'Unauthorized',
                error: err
            })
        }
        debug(`Token verify ${token}`)
        req.user = token.user
        next()
    })
}