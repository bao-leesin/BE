const Subscription = require("../models/Subscription")

const createSub = async (req,res,next) => {
    const {tenGoi,giaTien,trangThai,chatLuong} = req.body
    let sub = new Subscription(null,tenGoi,giaTien,trangThai,chatLuong)
    try {
        await sub.createSub()
        const subs = await sub.getAllSub()
        res.send(subs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateSub = async (req,res,next) => {
    const {idGoi,tenGoi,giaTien,trangThai,chatLuong} = req.body
    let sub = new Subscription(idGoi,tenGoi,giaTien,trangThai,chatLuong)
    try {
        await sub.updateSub()
        const subs = await sub.getAllSub()
        res.send(subs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteSub = async (req,res,next) => {
    const idGoi = req.params.idGoi
    let sub = new Subscription()
    try {
        sub.setId = idGoi
        await sub.deleteSub()
        const subs = await sub.getAllSub()
        res.send(subs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllSub = async (req,res,next) => {
    try {
        let sub = new Subscription()
        const subs = await sub.getAllSub()
        res.send(subs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getSubOfUser = async (req,res,next) => {
    const idUser = req.params.idNguoiDung
    try {
        let sub = new Subscription()
        sub.setIdUser = idUser
        const output = await sub.getSubOfUser()
        res.send(output)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getHotSub = async (req,res,next) => {
    try {
        let sub = new Subscription()
        const subs = await sub.getHotSub()
        res.send(subs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}



module.exports = {
    createSub,
    updateSub,
    deleteSub,
    getAllSub,
    getHotSub,
    getSubOfUser
}