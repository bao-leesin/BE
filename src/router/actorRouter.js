const express = require('express')
const router = express.Router()
const actorController = require('../controllers/actorController')

router.use('/filter/:idDienVien',actorController.getFilmByActor)

module.exports = router