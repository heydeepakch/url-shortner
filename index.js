const express = require('express')
const path = require("path")
const app =express()
const mongoose = require("mongoose")
const port =3001
const URL = require('./models/url')
const urlRoute = require("./routes/url")
const staticRouter = require("./routes/staticRouter")
const userRoute =require('./routes/user')
const cookieParser = require('cookie-parser')
const {restrictToLoggedonUserOnly,checkAuth}=require("./middlewares/auth")

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
mongoose.connect("mongodb://localhost:27017/url-shortner").then(()=>{console.log("MongoDB Connected!")})



app.use("/url",restrictToLoggedonUserOnly,urlRoute)
app.use("/",checkAuth,staticRouter)
app.use("/user",userRoute)



app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

// app.get("/:id",async(req,res)=>{
//     const short_id =req.params.id
//     await URL.findO
// })

app.listen(port,()=>{console.log("Server started!")})