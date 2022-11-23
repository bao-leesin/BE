const express = require('express')
const router = express.Router()
const requestController = require('../controllers/requestController')

router.use('/nameFilm/show/:phimYeuCau',requestController.getFilmByNameRequest)
router.use('/update/status',requestController.updateStatusRequest)
// {idYeuCau,trangThai} 

router.use('/delete/:idYeuCau',requestController.deleteRequest)
router.use('/show',requestController.getAllRequest)


module.exports = router
