const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationController')

router.use('/create', notificationController.createNoti)
router.use('/update',notificationController.updateNoti)
router.use('/delete/:idThongBao',notificationController.deleteNoti)
router.use('/show',notificationController.getAllNoti)


module.exports = router