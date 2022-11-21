const Request = require("../models/Request")

const getAllRequest = async (req,res,next) => {
    try {
        let request = new Request()
        const requests = await request.getAllRequest()
        if (!requests.length) throw new Error("Không có yêu câu nào")
        else res.send(requests)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getFilmByNameRequest = async (req,res,next) => {
    const phimYeuCau = req.params.phimYeuCau
    try {
        let request = new Request()
        request.setNameFilm = phimYeuCau
        const requests = await request.getFilmByNameRequest()
        if (!requests.length) res.send('')
        else res.send(requests)
    } catch (error) {
        res.status(400).send(error) 
    }
}
const  updateStatusRequest = async (req,res,next) => {
    const {idYeuCau,trangThai} = req.body
    try {
        let request = new Request()
        request.setId = idYeuCau
        request.setStatus = trangThai
        await request.updateStatusRequest()
        const requests = await request.getAllRequest()
  
        res.send(requests)
    } catch (error) {
        res.status(400).send(error) 
    } 
}

const deleteRequest = async (req,res,next) => {
    const idYeuCau = req.params.idYeuCau
    try {
        let request = new Request()
        request.setId = idYeuCau
        await request.deleteRequest()
        const requests = await request.getAllRequest()
        res.send(requests)
    } catch (error) {
        
    }
}

module.exports = {
    getAllRequest,
    getFilmByNameRequest,
    updateStatusRequest,
    deleteRequest
}

