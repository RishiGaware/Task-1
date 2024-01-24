const express = require('express')
const path =  require('path')
const collection = require("./connection");
const Admin = require("./models/admin")
const User = require("./models/user")

// const bcrypt = require('bcrypt')

const app = express();
//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended : false}));
// use ejs as a view engine
app.set('view engine','ejs');
app.set("views", path.resolve("./views"));

app.get("/",(req,res) => {
    res.render("login");
});


app.get("/admin/signup",(req,res) =>{
    res.render("signup");
});

//register User
app.post("/admin/signup", async (req, res) => {
    const data = {
        name : req.body.username,
        password : req.body.password
    }
    //check user already exist or not
    const userexist = await Admin.findOne({name: data.name})
    console.log(":",userexist);
    if(userexist){
        res.send("User Already Exist choose Different Name : ")
    }else{
        const userdata = await Admin.create(data);
        console.log(userdata);
        return res.redirect("/login")
        // return res.redirect(`/createUsers/${userdata._id}`)
    }
});

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/createUsers/:id" , async (req , res) => {
    console.log("iddd",req.params.id)
    return res.render("gohil",{
        Admin
    })
})

app.post("/admin/login",async(req,res) => {
    try{
        const name = req.body.username;
        const pass = req.body.password;
        const n = "aaa";
        const p = "aaa"
        const user = await Admin.findOne({name : req.body.username , password : req.body.password});
        if( name === n && pass === p){
            res.render("registeradmin");
        }else if(user){
            res.render("adminpage");
        }else{
            res.send("Incorrect Username Password");
        }
    }catch{
        res.send("Wrong Details!");
    }
});
app.get("/user/signup" , (req,res) => {
    res.render("usersignup");
});

app.post("/user/signup", async (req, res) => {
    const data = {
        name : req.body.username,
        password : req.body.password
    }
    //check user already exist or not
    const userexist = await User.findOne({name: data.name})
    console.log(":",userexist);
    if(userexist){
        res.send("User Already Exist choose Different Name : ")
    }else{
        const userdata = await User.create(data);
        console.log(userdata);
        return res.redirect("/success")
    }
});

app.get("/success",(req,res)=>{
    res.send("Congratulation! User Created Successfully 🎉")
})

const port = 5000;
app.listen(port,() => {
    console.log(`server running on Port :${port}`);
});