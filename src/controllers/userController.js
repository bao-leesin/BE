const User = require("../models/User");
const Complain = require("../models/Complain");
const Request = require("../models/Request");
const Film = require("../models/Film");
const Rating = require("../models/Rating");
const moment = require("moment");



 
    // **********************
// Nhóm chức năng tìm kiếm
const getAllUser = async (req,res,next) => {
    try {
        let user = new User()
        const usersInfo = await user.getAllUserInfo()
        res.send(usersInfo)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getUserInfo = async (req,res,next) => {
    const idUser = req.params.idNguoiDung
    try {
        let user = new User()
        user.setId = idUser
        const userInfo = await user.getUserInfo()
        res.send(userInfo)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getLikedFilm = async (req,res,next) => {
    const idNguoiDung = req.params.idNguoiDung
    try {
        let user = new User()
        user.setId = idNguoiDung
        const output = await user.getLikedFilm()
        console.log(output);
        if(!output.length) res.send('')
        else res.send(output)
    } catch (error) {
        res.status(400).send(error.message)        
    }
}



// **********************
// Nhóm chức năng thêm tạo

const subscribe = async (req,res,next) => {
    const  {idKhachHang,idGoi,khuyenMaiSuDung} = req.body
    const ngayDangKiGoi  = moment().format('YYYY-MM-DD')  

    try {
        let user = new User()
        user.setId = idKhachHang
        user.setSubsciption = idGoi
        user.setSubsciptionDay = ngayDangKiGoi
        user.setPromotion = khuyenMaiSuDung

        const output =  await user.subscribe()
        if (!output) res.status(400).send({ketQua: "Thất bại"})
        else res.send({ketQua: "Thành công"})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const request = async (req,res,next) => {
    let {idKhachHangYeuCau,phimYeuCau,ngayYeuCau,trangThai} = req.body
    ngayYeuCau = ngayYeuCau.substring(0, 10)
    try {
        let request = new Request(null,idKhachHangYeuCau,phimYeuCau,ngayYeuCau,trangThai)
        const output = await request.createRequest()
        if (!output) res.status(400).send({ketQua: "Thất bại"})
        else res.send({ketQua: "Thành công"})
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const complain = async (req,res,next) => {
    const {idNguoiDung,tieuDeKhieuNai,noiDungKhieuNai} = req.body
    try {
        let complain = new Complain()
        const output = await complain.createComplain(null,idNguoiDung,tieuDeKhieuNai,noiDungKhieuNai)
        if (!output) res.status(400).send({ketQua: "Thất bại"})
        else res.send({ketQua: "Thành công"})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const rateFilm = async (req,res,next) => {
    const {idKhachHang,idPhim,soSaoDanhGia} = req.body
    try {
        let rating = new Rating(idKhachHang,idPhim,soSaoDanhGia)
        let film = new Film()
        film.setId = idPhim
        await rating.rateFilm()
        const ratingFilm =  await film.updateRatingFilm()
        const ratingNumber = await rating.amountOfRating()
        res.send({  
            danhGia: ratingFilm,
            soLuongDanhGia: ratingNumber
        })            
    } catch (error) {
        res.status(400).send(error.message)
    }
}


// **********************
// Nhóm chức năng cập nhật

const updateUserInfo = async (req,res,next) => {
    let {idNguoiDung,vaiTro,diaChi,ngaySinh,email,tenDayDu,gioiTinh} = req.body
    ngaySinh = ngaySinh.substring(0, 10)
    try {
        let user = new User(idNguoiDung,null,null,vaiTro,diaChi,ngaySinh,email,tenDayDu,gioiTinh);
        await user.updateUserInfo()
        const data = await user.getUserInfo()
        res.send(data[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
}




const likeFilm = async (req,res,next) => {
        const {idNguoiDung,idPhim} = req.body
        try {
            let user = new User()
            user.setIdFilm = idPhim
            user.setId = idNguoiDung
            await user.likeFilm()
            const likedFilms = await user.getLikedFilm()
            if (!likedFilms.length) res.send('')
            else res.send(likedFilms)
            
        } catch (error) {
            res.status(400).send(error.message)            
        }

}

const unlikeFilm = async (req,res,next) => {
        const {idNguoiDung,idPhim} = req.body
        try {
           let user = new User()
           user.setIdFilm = idPhim
           user.setId = idNguoiDung
           await user.unlikeFilm()
           const likedFilms = await user.getLikedFilm()
            if (!likedFilms.length) res.send('')
            else res.send(likedFilms)
            
        } catch (error) {
            res.status(400).send(error.message)            
        }
}


const randomizeFilm  = async (req,res,next) => {
        const  film = new Film()
        const randomFilm = await film.getAllIdFilm()
        const randomLength = randomFilm.length
        const randomNumber = Math.floor(Math.random() * randomLength)
        const idFilm = randomFilm[randomNumber+1].idPhim
        film.setId = idFilm
        const chosenFilm = await film.getFilmById()
        res.send(chosenFilm)
}


module.exports = {
    getUserInfo,
    updateUserInfo,
    getAllUser,
    subscribe,
    complain,
    rateFilm,
    request,
    likeFilm,
    unlikeFilm,
    getLikedFilm,
    randomizeFilm
    
}