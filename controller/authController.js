const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async(req,res) => {
    const { username , password } = req.body;
    const hashedPassword = await bcrypt.hash(password , 10);
    try {
        const user = new User({ username , password : hashedPassword});
        await user.save();
        res.status(201).json({ message : "Registered Successfully "});
    }
    catch(error){
        res.status(401).json({ error : "User already exists"});
    }
};

const login = async(req,res) => {
    const { username , password } = req.body;
    const user = await User.findOne({ username });
    if( !user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({ error : "User not found"})
    }
    const token = jwt.sign({ username : user.username }, process.env.JWT_SECRET, {
        expiresIn : '1d',
    });
    res
    .cookies = 'token',token({ httpOnly : true})
    .json({message : "login successful"})
}

module.exports = { register , login }