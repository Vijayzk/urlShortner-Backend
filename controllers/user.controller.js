import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import {uploadFile} from '../helpers/upload.js'


const handleSignUp = async (req, res) => {
    try {
        const body = req.body
        //console.log(req.body,req.file.path)

        const upload = await uploadFile(req.file.path)

        if(!body.name||!body.email||!body.password){
            res.send({error:'Details required..'})
            return;
        }

        const isUser = await User.findOne({email:body.email})

        if(isUser){
            res.send({error:'User already exist..'})
            return
        }


        const user = await User.create({
            name:body.name,
            email:body.email,
            password:body.password,
            profileImage:upload.secure_url
        })

        const accessToken = jwt.sign({user},process.env.secretkey,{expiresIn:'36000s'})
        
        res.send({
            message:'User created successfully..',
            accessToken,
        })
    }
    catch (err) {
        console.log(err)
    }
}

const handleLogIn = async (req, res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            res.send({error:'Details required..'})
            return;
        }
        const user = await User.findOne({email,password})

        if(!user){
            res.send({error:'User does not exist..'})
            return;
        }

        const accessToken = jwt.sign({user},process.env.secretkey,{expiresIn:'3600s'})
        
        res.send({
            message:'Logged In successfully..',
            accessToken,
        })
    }catch(err){
       console.log(err)
    }
}

const userInfo = async(req,res) => {
     try {
        
        const userId = req.user.user._id
        const isUser = await User.findOne({_id:userId})

        if(!isUser){
            res.send('User not found..')
            return;
        }

        res.send({user:{
            name:isUser.name,
            email:isUser.email,
            password:isUser.password,
            profileImage:isUser.profileImage
        }})
     } catch (error) {
        console.log(error)
     }
}

export { handleSignUp,handleLogIn,userInfo}