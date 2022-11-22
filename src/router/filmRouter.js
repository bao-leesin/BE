const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')

router.use('/search/name/:tenPhim',filmController.getFilmByName)
router.use('/create', filmController.createFilm)
router.use('/update', filmController.updateFilm)
router.use('/delete/:idPhim', filmController.deleteFilm)
router.use('/playFilm/:id', filmController.playFilmCtrl)
// viết hoa chữ F nhé

router.use('/show/id/:idPhim', filmController.getFilmById)
router.use('/show/rating/:idPhim',filmController.showRatingFilm)
router.use('/show',filmController.getAllFilm)

module.exports = router