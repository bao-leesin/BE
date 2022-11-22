const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')

router.use('/create', questionController.createQuestion)
router.use('/update',questionController.updateQuestion)
router.use('/delete/:idCauHoi',questionController.deleteQuestion)
router.use('/show',questionController.getAllQuestion)


module.exports = router