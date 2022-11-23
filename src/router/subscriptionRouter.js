const express = require('express')
const router = express.Router()
const subscriptionController = require('../controllers/subscriptionController')

router.use('/create', subscriptionController.createSub)
// {tenGoi,giaTien,trangThai,chatLuong} 


router.use('/update',subscriptionController.updateSub)
// {idGoi,tenGoi,giaTien,trangThai,chatLuong} 

router.use('/delete/:idGoi',subscriptionController.deleteSub)
router.use('/show/user/:idKhachHang', subscriptionController.getSubOfUser)
router.use('/show',subscriptionController.getAllSub)


module.exports = router
