const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

router.post('/create',  commentController.createComment)
// {idPhim,idNguoiDung,binhLuan}


router.put('/update', commentController.updateComment)
// {idBinhLuan,idPhim,idNguoiDung,noiDungBinhLuan}

router.delete('/delete/:idBinhLuan', commentController.deleteComment)

router.get('/show/:idPhim',commentController.getCommentByIdFilm)

module.exports = router