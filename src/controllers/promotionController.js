const Promotion = require("../models/Promotion")


const getAllPromotion = async (req,res,next) => {
    try {
        let promotion = new Promotion()
        const output = await promotion.getAllPromotion()
        res.send(output)        
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getPromotionsByTitle = async (req,res,next) => {
    const titlePromotion = req.params.tieuDeChuongTrinhKhuyenMai
    console.log(req.params.tieuDeChuongTrinhKhuyenMai);
    try {
        let promotion = new Promotion()
        promotion.setTitle = titlePromotion
        const output = await promotion.getPromotionsByTitle()
        res.send(output)        
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const createPromotion = async (req,res,next) => {
    const {tieuDeChuongTrinhKhuyenMai,
        noiDungChuongTrinhKhuyenMai,
        doiTuongKhuyenMai,
        thoiGianBatDau,
        thoiGianKetThuc,
        trangThai,
        maKhuyenMai,
        anhKhuyenMai
    } = req.body
   
    try {
        let promotion = new Promotion(
            null,
            tieuDeChuongTrinhKhuyenMai,
            noiDungChuongTrinhKhuyenMai,
            doiTuongKhuyenMai,
            thoiGianBatDau,
            thoiGianKetThuc,
            trangThai,
            maKhuyenMai,
            anhKhuyenMai)
        const result =  await promotion.createPromotion()
        console.log(result);
        const output = await promotion.getAllPromotion()
        res.send(output)        
    } catch (error) {
        res.status(400).send(error.message)
    }
}

    const updatePromotion = async (req,res,next) => {
        let {
            idChuongTrinhKhuyenMai,
            tieuDeChuongTrinhKhuyenMai,
            noiDungChuongTrinhKhuyenMai,
            doiTuongKhuyenMai,
            thoiGianBatDau,
            thoiGianKetThuc,
            trangThai,
            maKhuyenMai,
            anhKhuyenMai
        } = req.body
        thoiGianBatDau = thoiGianBatDau.substring(0, 10) 
        thoiGianKetThuc = thoiGianKetThuc.substring(0, 10) 
        try {
            let promotion = new Promotion(
                idChuongTrinhKhuyenMai,
                tieuDeChuongTrinhKhuyenMai,
                noiDungChuongTrinhKhuyenMai,
                doiTuongKhuyenMai,
                thoiGianBatDau,
                thoiGianKetThuc,
                trangThai,
                maKhuyenMai,
                anhKhuyenMai)
            await promotion.updatePromotion()
            const output = await promotion.getAllPromotion()
            res.send(output)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    const updateStatusPromotion = async (req,res,next) => {
        const {idChuongTrinhKhuyenMai,trangThai} = req.body
        try {
            let promotion = new Promotion()
            promotion.setId = idChuongTrinhKhuyenMai
            promotion.setStatus = trangThai
            await promotion.updatePromotion()
            const output = await promotion.getAllPromotion()
            res.send(output)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

const deletePromotion = async (req,res,next) => {
        const idPromotion = req.params.idChuongTrinhKhuyenMai
        try {
            let promotion = new Promotion()
            promotion.setId = idPromotion
            await promotion.deletePromotion()
            const output = await promotion.getAllPromotion()
            res.send(output)
        } catch (error) {
            res.status(400).send(error.message)
        }
}

module.exports = {
    createPromotion,
    updatePromotion,
    updateStatusPromotion,
    deletePromotion,
    getAllPromotion,
    getPromotionsByTitle
}