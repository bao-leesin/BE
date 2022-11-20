const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')

router.use('/show/id/:idPhim', filmController.getFilmById)
router.use('/show/rating/:idPhim',filmController.showRatingFilm)
router.use('/search/name/:keyword',filmController.getFilmByName)
router.use('/filter/genres', filmController.getFilmByGenres)
router.use('/create', filmController.createFilm)
router.use('/update/', filmController.updateFilm)
router.use('/delete/:idPhim', filmController.deleteFilm)
router.use('/show',filmController.getAllFilm)

module.exports = router