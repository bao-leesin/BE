const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')

router.use('/create', questionController.createQuestion)
// {tieuDeCauHoi,noiDungGiaiPhap}

router.use('/update',questionController.updateQuestion)
// {idCauHoi,tieuDeCauHoi,noiDungGiaiPhap}

router.use('/delete/:idCauHoi',questionController.deleteQuestion)

router.use('/show/:idCauHoi',questionController.getQuestionById)
router.use('/show',questionController.getAllQuestion)


module.exports = router