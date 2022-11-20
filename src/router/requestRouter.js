const express = require('express')
const router = express.Router()
const requestController = require('../controllers/requestController')

router.use('/show',requestController.getAllRequest)
router.use('/nameFilm/show/:phimYeuCau',requestController.getFilmByNameRequest)
router.use('/status/update',requestController.updateStatusRequest)


module.exports = router
