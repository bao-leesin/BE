const Notification = require("../models/Notification")

const createNoti = async (req,res,next) => {
const {tieuDeThongBao,noiDungThongBao} = req.body

    try {
        let noti = new Notification(null,tieuDeThongBao,noiDungThongBao)
        await noti.createNoti()
        const notis =  await noti.getAllNoti()
        res.send(notis) 
    } catch (error) {
        res.status(400).send(error)
    }
}

const updateNoti  = async (req,res,next) => {
    const {idThongBao,tieuDeThongBao,noiDungThongBao} = req.body
    try {
        let noti = new Notification(idThongBao,tieuDeThongBao,noiDungThongBao)
        await noti.updateNoti()
        const notis = await noti.getAllNoti()
        res.send(notis) 
    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteNoti = async (req,res,next) => {
    const idNoti = req.params.idThongBao
    try {
        let noti = new Notification()
        noti.setId = idNoti
        await noti.deleteNoti()
        const notis = await noti.getAllNoti()
        res.send(notis)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getAllNoti = async (req,res,next) => {
    try {
        let noti = new Notification()
        const notis = await noti.getAllNoti()
        res.send(notis)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    createNoti,
    updateNoti,
    deleteNoti,
    getAllNoti
}