const Question = require("../models/Question")

const createQuestion = async (req,res,next) => {
    const {tieuDeCauHoi,noiDungCauHoi} = req.body
    try { 
        let question = new Question(null,tieuDeCauHoi,noiDungCauHoi)
        await  question.createQuestion()
        const result = await question.getAllQuestion()
        res.send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const updateQuestion = async (req,res,next) => {
    const {idCauHoi,tieuDeCauHoi,noiDungCauHoi} = req.body
    try {
        let question = new Question(idCauHoi,tieuDeCauHoi,noiDungCauHoi)
        await question.updateQuestion()
        const result = await question.getAllQuestion()
        res.send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const deleteQuestion = async (req,res,next) => {
    const idCauHoi = req.params.idCauHoi
    try {
        let question = new Question()
        question.setId = idCauHoi
        const result = await question.getAllQuestion()
        res.send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const getAllQuestion = async (req,res,next) => {
    try {
        let question = new Question()
        const result = await question.getAllQuestion()
        res.send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestion
}