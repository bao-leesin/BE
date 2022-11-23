const express = require('express')
const router = express.Router()
const promotionController = require('../controllers/promotionController')

router.use('/create', promotionController.createPromotion)

// {tieuDeChuongTrinhKhuyenMai,
// noiDungChuongTrinhKhuyenMai,
// doiTuongKhuyenMai,
// thoiGianBatDau,
// thoiGianKetThuc,
// trangThai,
// maKhuyenMai,
// anhKhuyenMai}

router.use('/update/',promotionController.updatePromotion)

// {
//     idChuongTrinhKhuyenMai,
//     tieuDeChuongTrinhKhuyenMai,
//     noiDungChuongTrinhKhuyenMai,
//     doiTuongKhuyenMai,
//     thoiGianBatDau,
//     thoiGianKetThuc,
//     trangThai,
//     maKhuyenMai,
//     anhKhuyenMai
// }

router.use('/delete/:idChuongTrinhKhuyenMai',promotionController.deletePromotion)
router.use('/show',promotionController.getAllPromotion)
router.use('/status/update/',promotionController.updateStatusPromotion)

// {idChuongTrinhKhuyenMai,trangThai}

router.use('/title/search/:tieuDeChuongTrinhKhuyenMai',promotionController.getPromotionsByTitle)


module.exports = router
