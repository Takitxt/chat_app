import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";


export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body
    try {
        if (!password || !email || !fullName) {
            return res.status(404).json({message:"Information is required in every field"})
            
        }
        //hash password
        if(password.length < 6){
            return res.status(404).json({message:"Password must me atleast 6 characters"})

        }

        const user= await User.findOne({email})
        if(user){
            return res.send(404).json({message:"The email is already in use."})

        }
        const salt= await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })

        if(newUser){

            generateToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id:newUser.id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic

            })
        

        }else{
            res.send(404).json({message:"Invalid User data"})
            
        }



        

        
    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
};
export const login= async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"Not found in database"})
        }
        const isPassword= await bcrypt.compare(password,user.password);
        if(!isPassword){
            res.status(404).json({message:"Password is Incorrect"})
        }
        
        generateToken(user._id, res)
            
        res.status(200).json({
        _id:user.id,
        fullName:user.fullName,
        email:user.email,
        profilePic: user.profilePic
        })
        
        
    } catch (error) {
        console.log("Error in login controller",error.message)
        res.status(500).json({message:"Internal server error"})
        
    }
};
export const logout= (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message)
        res.status(500).json({message:"Internal server error"})
        
    }
};
export const updateProfile = async (req,res)=> {
    try {
        const{profilePic}= req.body;
        const userId= req.user._id;
        if(!profilePic){
            return res.status(404),json({message:"profilePic is required"})
        }
        const uploadResponse= await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,
            {profilePic:uploadResponse.secure_url},
             {new:true});
        res.stutus(200).json(updatedUser)
        
    } catch (error) {
        console.log("Error in updateProfile controller",error.message)
        res.status(500).json({message:"Internal server error"})
        
    }

}
export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user);
        
    } catch (error) {

        console.log("Error in checkAuth controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }


}