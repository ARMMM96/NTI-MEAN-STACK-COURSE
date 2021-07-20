const User = require('../../database/models/user.model')
const jwt = require('jsonwebtoken')
const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWTKEY)
        const user = await User.findOne({
            _id:decodedToken._id,
            // accountStatus: true
            'tokens.token': token
        })
        if(!user) throw new Error()
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: 'unauthorized user'
        })
    }
}

module.exports = auth