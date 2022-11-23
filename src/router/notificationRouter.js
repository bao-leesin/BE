const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationController')

router.use('/create', notificationController.createNoti)
// {tieuDeThongBao,noiDungThongBao}

router.use('/update',notificationController.updateNoti)
// {idThongBao,tieuDeThongBao,noiDungThongBao}

router.use('/delete/:idThongBao',notificationController.deleteNoti)
router.use('/show',notificationController.getAllNoti)


module.exports = router