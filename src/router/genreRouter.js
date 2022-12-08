const express = require('express')
const router = express.Router()
const genreController = require('../controllers/genreController')

router.use('/create/:tenTheLoai', genreController.createGenre)
router.use('/update',genreController.updateGenre)

// {idTheLoai,tenTheLoai}

router.use('/delete/:idTheLoai',genreController.deleteGenre)
router.use('/filter/:idTheLoai', genreController.getFilmByGenres)
router.use('/show',genreController.getAllGenres)


module.exports = router