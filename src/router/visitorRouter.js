const express = require('express')
const router = express.Router()
const visitorController = require('../controllers/visitorController')

router.use('/login', visitorController.login);
// {tenDangNhap,matKhau}

router.use('/register', visitorController.register);
// {tenDangNhap,matKhau,vaiTro,diaChi,ngaySinh,email,tenDayDu,gioiTinh}

router.use('/passwordRetrieval', visitorController.passwordRetrieval);

router.use('/homePage',visitorController.showHomePage)

   

module.exports = router
