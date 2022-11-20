const express = require('express')
const router = express.Router()
const subscriptionController = require('../controllers/subscriptionController')

router.use('/create', subscriptionController.createSub)
router.use('/update',subscriptionController.updateSub)
router.use('/delete/:idGoi',subscriptionController.deleteSub)
router.use('/show/user/:idKhachHang', subscriptionController.getSubOfUser)
router.use('/show',subscriptionController.getAllSub)


module.exports = router
