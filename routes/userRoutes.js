const User = require("../models/user")
const jwt = require("jsonwebtoken");
const config = require("../config/config.json")
exports.addUser = async(req, res) => {
    try{
        const username =  req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const userModel = new User()
        if(username){
            userModel.name = username;
        }
        if(email){
            userModel.email = email;
        }
        if(password){
            userModel.password = password;
        }
        userModel.role = "user";
        const user = await userModel.save();
        return res.status(200).send(user);

    }catch(ex){
        return res.status(500).send({message: ex.message});
    }
}

exports.login = async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password){
            return res.status(500).send("email or password not provided");
        }
        const user = await User.findOne({email,password});
        if(!user)
            return res.status(500).send("No user found for the given email!")
        const token = jwt.sign({email},config.secret);
        const userDetail = {
            name: user?.name,
            email: user?.email,
            role: user?.role,
            id: user?._id,
            accessToken: token
        }
        return res.status(200).send(userDetail)
    }catch(ex){
        return res.status(500).send({message: ex.message})
    }
}