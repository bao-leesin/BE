const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const subscriptionController = require('../controllers/subscriptionController')
const notificationController = require('../controllers/notificationController')

// const { verifyToken } = require('../middleware/authentication')

// chuc nang nguoi dung
router.use('/create/subscribe', userController.subscribe)
router.use('/create/rate', userController.rateFilm)
router.use('/create/request', userController.requestFilm)
router.use('/create/complain', userController.complain)
router.use('/like', userController.likeFilm)
router.use('/unlike', userController.unlikeFilm)
router.use('/update/info',userController.updateUserInfo)



// Quan ly thong tin
router.use('/show/liked/:idNguoiDung', userController.getLikedFilm)
router.use('/show/info/:idNguoiDung',userController.getUserInfo)
router.use('/show/subscribed/:idNguoiDung',subscriptionController.getSubOfUser)
router.use('/show/notification/idNguoiDung', notificationController.getNotisOfUser)
router.use('/show',userController.getAllUser)


module.exports = router