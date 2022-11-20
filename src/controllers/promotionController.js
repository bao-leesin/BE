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
    const input = req.body
    input.idChuongTrinhKhuyenMai = null
    try {
        let promotion = new Promotion(input)
        await promotion.createPromotion()
        const output = await promotion.getAllPromotion()
        res.send(output)        
    } catch (error) {
        res.status(400).send(error.message)
    }
}

    const updatePromotion = async (req,res,next) => {
        const input = req.body
        try {
            let promotion = new Promotion(input)
            await promotion.updatePromotion()
            const output = await promotion.getAllPromotion()
            res.send(output)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    const updateStatusPromotion = async (req,res,next) => {
        const idPromotion = req.query.idChuongTrinhKhuyenMai
        const statusPromotion = req.query.trangThai
        try {
            let promotion = new Promotion()
            promotion.setId = idPromotion
            promotion.setStatus = statusPromotion
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