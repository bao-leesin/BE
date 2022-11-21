const Complain = require("../models/Complain")

const getAllComplain =async (req,res,next) => {
    try {
        let complain = new Complain()
        const output = await complain.getAllComplain()
        if (!output.length) throw new Error("Không có khiếu nại nào cả")
        else res.send(output)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getAllTopic = async (req,res,next) => {
    try {
        let complain = new Complain()
        const output = await complain.getAllTopic()
        if (!output.length) throw new Error("Không có chủ đề nào cả")
        else res.send(output)
    } catch (error) {
        res.status(400).send(error)
    }
}

const createTopic = async (req,res,next) => {
    const tenChuDe = req.params.tenChuDe
    try {
        let complain = new Complain()
        complain.setTopic = tenChuDe
        const output = await complain.createTopic()
        if (!output) res.status(400).send({ketQua: "Thất bại"})
        else{
            const topics = await complain.getAllTopic()
            res.send(topics)
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const getSolutionForTopic = async (req,res,next) => {
    const idChuDe = req.params.idChuDe
    try {
        let complain = new Complain()
        complain.setIdTopic = idChuDe
        const solutions = await complain.getSolutionForTopic()
        res.send(solutions) 
    } catch (error) {
        res.status(400).send(error)
    }
}

const createSolutionForTopic = async (req,res,next) => {
    const {idChuDe,cachGiaiQuyet,idAdminDongGop} = req.body
    try {
        let complain = new Complain()
        complain.setIdTopic = idChuDe
        complain.setIdAdmin = idAdminDongGop
        complain.setSolution = cachGiaiQuyet
        const output = await complain.createSolutionForTopic()
        if (!output) res.status(400).send({ketQua: "Thất bại"})
        else{
            const solutions = await complain.getSolutionForTopic()
            res.send(solutions) 
        }
    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = {
    getAllComplain,
    getAllTopic,
    createTopic,
    createSolutionForTopic,
    getSolutionForTopic
}