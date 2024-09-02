const express = require("express")
const router = express.Router()
const URL = require("../models/url")

router.get("/", async (req,res)=>{
    // const allUrls = await URL.find({})
    if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({createdBy:req.user._id})
    res.render("home",{urls: allUrls})
})

router.get('/signup',(req,res)=>{
        res.render("signup")
})

router.get('/login',(req,res)=>{
    res.render("Login")
})

module.exports = router