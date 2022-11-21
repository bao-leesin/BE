const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const subscriptionController = require('../controllers/subscriptionController')
const filmController = require('../controllers/filmController')
const notificationController = require('../controllers/notificationController')
// const requestControllerController = require('../controllers/requestControllerController')


// Hành động

router.use('/push/notification/', notificationController.pushNotification)

// Xem
router.use('/show/film/view/:luotXem',filmController.getFilmByViews)
router.use('/show/film/rating/:danhGia',filmController.getFilmByRating)
// router.use('/show/request/film',)
router.use('/show/subscribed/:idNguoiDung',subscriptionController.getSubOfUser)
router.use('/show/user/:idNguoiDung',userController.getUserInfo)
router.use('/show/hotSubscription/',subscriptionController.getHotSub)
// router.use('/show/user',userController.getAllUser)

module.exports = router



