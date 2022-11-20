const express = require('express')
const router = express.Router()
const promotionController = require('../controllers/promotionController')

router.use('/create', promotionController.createPromotion)
router.use('/update/',promotionController.updatePromotion)
router.use('/delete/:idChuongTrinhKhuyenMai',promotionController.deletePromotion)
router.use('/show',promotionController.getAllPromotion)
router.use('/status/update/',promotionController.updateStatusPromotion)
router.use('/title/search/:tieuDeChuongTrinhKhuyenMai',promotionController.getPromotionsByTitle)


module.exports = router
