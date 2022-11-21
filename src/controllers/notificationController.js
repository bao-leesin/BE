const Notification = require("../models/Notification")

const createNoti = async (req,res,next) => {
const {tieuDeThongBao,noiDungThongBao} = req.body

    try {
        let noti = new Notification(null,tieuDeThongBao,noiDungThongBao)
        await noti.createNoti()
        const notis =  await noti.getAllNoti()
        res.send(notis) 
    } catch (error) {
        res.status(400).send(error.message)
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
        res.status(400).send(error.message)
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
        res.status(400).send(error.message)
    }
}

const getAllNoti = async (req,res,next) => {
    try {
        let noti = new Notification()
        const notis = await noti.getAllNoti()
        res.send(notis)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getNotisOfUser  = async (req,res,next) => {
    const idNguoiDung = req.params.idNguoiDung
    try {
        let noti = new Notification()
        noti.setIdUser = idNguoiDung
        const output = await noti.getNotisOfUser()
        res.send(output)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const pushNotification  = async (req,res,next) => {
    const {idNguoiDung, idThongBao} = req.body
    try {
        let noti = new Notification()
        noti.setIdUser = idNguoiDung
        noti.setId = idThongBao
        await noti.pushNotification()
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    createNoti,
    updateNoti,
    deleteNoti,
    getAllNoti,
    pushNotification,
    getNotisOfUser
}