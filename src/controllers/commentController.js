
const Comment = require("../models/Comment")
var moment = require('moment');


const createComment = async (req,res,next) => {
    const {idPhim,idNguoiDung,binhLuan} = req.body
    const ngayBinhLuan = moment().format('YYYY-MM-DD')

    let comment = new Comment(null,idPhim,idNguoiDung,binhLuan,ngayBinhLuan)
    const output = await comment.createComment()
    if (!!output.insertId) {
        res.send({ketQua: "Thành công"})
    } else {
        res.status(400).send({ketQua: "Thất bại"})
    }

}

const updateComment = async (req,res,next) => {
    const {idBinhLuan,idPhim,idNguoiDung,noiDungBinhLuan} = req.body
    const ngayBinhLuan = moment().format('YYYY-MM-DD')
    let comment = new Comment(idBinhLuan,idPhim,idNguoiDung,noiDungBinhLuan,ngayBinhLuan)
    const output = await comment.updateComment()
    if (!!output) {
        res.send({ketQua: "Thành công"})
    } else {
        res.status(400).send({ketQua: "Thất bại"})
    }
}

const deleteComment = async (req,res,next) => {
    const idBinhLuan = req.params.idBinhLuan
    let comment = new Comment()
    comment.setId = idBinhLuan
    const output = await comment.deleteComment()
    if (!!output) {
        res.send({ketQua: "Thành công"})
    } else {
        res.status(400).send({ketQua: "Thất bại"})
    }
}

const getCommentByIdFilm = async (req,res,next) => {
    const idPhim = req.params.idPhim
    let comment = new Comment()
    comment.setIdFilm = idPhim
    const output = await comment.getCommentByIdFilm()
   if (output.length !== 0) {
    const number = await comment.getAmountCommentOfFilm()
    output.push(number.soLuong) 
    res.send(output)
   } else {
    res.status(400).send('')
   }
}




module.exports = {
   createComment,
   updateComment,
   deleteComment,
   getCommentByIdFilm,

}