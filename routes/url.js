const express = require('express')
const {handleGenerateShortURL, handleURLRedirecting, handleAnalytics} = require('../controllers/url')
const router = express.Router()

router.post('/',handleGenerateShortURL)
router.get('/:id',handleURLRedirecting)
router.get('/analytics/:shortid',handleAnalytics)

module.exports = router