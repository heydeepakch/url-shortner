const ShortUniqueId = require('short-unique-id');
const URL =require('../models/url')
const uid = new ShortUniqueId();


async function handleGenerateShortURL(req,res){
const body = req.body
if (!body) return res.status(400).json({ error:"URl is required!"})
    const shortID = uid.rnd()

await URL.create({
    shortId: shortID,
    redirectURL: body.URL,
    visitHistory:[],
    createdBy:req.user._id
})
return res.render("home",{id:shortID})
}

async function handleURLRedirecting(req,res) {
    const short_id =req.params.id
    const entry = await URL.findOneAndUpdate({
        shortId: short_id
    },{$push:{
        visitHistory:{timestamp: Date.now()}
    }})
    console.log(entry.redirectURL)
    res.redirect(entry.redirectURL)
}

async function handleAnalytics(req,res){
    const shortid= req.params.shortid
    const result = await URL.findOne({shortid})
    return res.json({
        totalClicks: result.visitHistory.length
    })
}

module.exports = {handleGenerateShortURL, handleURLRedirecting,handleAnalytics}