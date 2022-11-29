const express = require('express')
const router = express.Router()
const imageController = require('../controllers/imageController.js')

router.post('/create/film', imageController.createImageInFilm)
router.get('/show/:duongDanAnh',imageController.getImageFilm)

// router.use('/update',imageController.updateGenre)
// router.use('/delete/:idTheLoai',imageController.deleteGenre)
// router.use('/filter/:tenTheLoai', imageController.getFilmByGenres)
// router.use('/show',imageController.getAllGenres)


module.exports = router
