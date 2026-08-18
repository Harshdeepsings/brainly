
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {userModel, contentMode} = require("./db");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")

const app = express();
app.use(express.json());

console.log("app instance created");


mongoose.connect(process.env.MONGODB_URI);

console.log("database connected");




app.post("/signup", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const hashedpassword = await bcrypt.hash(password, 10);

    await userModel.create({
        username: username,
        password: hashedpassword,
        email: email
    })

    res.json({
        message: "You are signed up"
    })

});

app.post("/signin", async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    console.log("req.body", req.body);
    console.log("email", email);
    console.log("password", password);

    const user = await userModel.findOne({
        email: email,
    });

    console.log("user", user);

    const passwordMatch = bcrypt.compare(password, user.password);

    console.log("passwordMatch", passwordMatch);

    if (user && passwordMatch){
        const token = jwt.sign({
            id: user._id.toString()
        }, process.env.JWT_SECRET);

        console.log("token", token);

        res.json({
            token
        })

    }else{
        res.status(403).json({
            message: "incorrect credentials"
        })
    }

});

app.get("/", (req, res)=>{
     
});

app.post("/content", (req, res)=>{
   
});

app.put("/content", (req, res)=>{
    
});

app.delete("/content", (req, res)=>{
    
});

app.listen(3000);