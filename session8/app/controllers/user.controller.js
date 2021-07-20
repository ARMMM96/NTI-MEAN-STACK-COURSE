const User = require('../../database/models/user.model')
class Userx{
    static register = async (req,res)=>{
        try{
            const userData = new User(req.body)
            await userData.save()
            //send email==>
            res.status(200).send({
                apiStatus: true,
                data: userData,
                message: "user added successful"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message, 
                message: "error adding new user"
            })
        }
    }

    static login = async(req,res)=>{
        try{
            const userData = await User.findByCreditionals(req.body.email, req.body.password)
            const token = await userData.generateToken()
            res.status(200).send({
                apiStatus:true,
                data:{userData, token},
                message:"logged in"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in login"
            })
        }
    }

    static logout = async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(ele=>{
                return ele.token!=req.token
            })
            await req.user.save()
            res.status(200).send({
                apiStatus:true,
                data:'',
                message: "logged out"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in logout"
            })
        }
    }

    static logoutAll=async(req,res)=>{
        try{
            req.user.tokens = []
            await req.user.save()
            res.status(200).send({
                apiStatus:true,
                data:'',
                message: "logged out"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in logout"
            })
        }
        
    }

    static me = async(req,res)=>{
        res.status(200).send({
            apiStatus: true,
            data:req.user,
            message:"data fetched"
        })
    }

    static activateUser = async(req,res)=>{
        try{
            const userData = await User.findOne({otp:req.params.otp , userStatus: false})
            if(!userData) throw new Error('no users to activate')
            userData.userStatus = true
            userData.otp=""
            await userData.save()
            res.status(200).send({
                apiStatus: true,
                data: userData,
                message:"activated"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data: e.message, 
                message:'error'
            })
        }
    }

    static showAll =async(req,res)=>{
        try{
    const data =await User.find()
    res.send(data)
        }
        catch(e){
    res.send(e)
        }
    }
    static profileImage = async (req, res) =>{
        req.user.image = req.file.path
        await req.user.save()
        res.send({
            data: req.user
        })
   }
}

module.exports = Userx