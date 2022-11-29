const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const subscriptionController = require('../controllers/subscriptionController')
const notificationController = require('../controllers/notificationController')
const filmController = require('../controllers/filmController')


router.use('/create/subscribe', userController.subscribe)
// {idKhachHang,idGoi,ngayDangKiGoi,khuyenMaiSuDung}

router.use('/create/rate', userController.rateFilm)
// {idKhachHang,idPhim,soSaoDanhGia}

router.use('/create/request', userController.request)
// {idKhachHangYeuCau,phimYeuCau,ngayYeuCau,trangThai} 

router.use('/create/complain', userController.complain)
// {idNguoiDung,tieuDeKhieuNai,noiDungKhieuNai} 

router.use('/like', userController.likeFilm)
// {idNguoiDung,idPhim}

router.use('/unlike', userController.unlikeFilm)
// {idNguoiDung,idPhim}

router.use('/update/info',userController.updateUserInfo)
// {idNguoiDung,vaiTro,diaChi,ngaySinh,email,tenDayDu,gioiTinh}


router.get('/show/listFilm/',filmController.getListFilm)
router.use('/randomize',userController.randomizeFilm)
router.use('/show/liked/:idNguoiDung', userController.getLikedFilm)
router.use('/show/info/:idNguoiDung',userController.getUserInfo)
router.use('/show/subscribed/:idNguoiDung',subscriptionController.getSubOfUser)
router.use('/show/notification/:idNguoiDung', notificationController.getNotisOfUser)
router.use('/show',userController.getAllUser)


module.exports = router