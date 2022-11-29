const Image = require("../models/Image");
const  {readImageFile,writeImageFile}  = require("../helper/readImageFile");
const path = require('path')

const createImageInFilm = async (req,res,next) => {
    const {idPhim,vaiTro,soHieu} = req.body
    let duongDanAnh = idPhim + "_" + vaiTro + "_"+ soHieu + ".jpg"
    const duLieuAnh = readImageFile(duongDanAnh)
    duongDanAnh = duongDanAnh.substring(0,length-3) + "png"
    let image = new Image(null,idPhim,vaiTro,duongDanAnh,duLieuAnh)
    await image.createFilmImages()
    res.send("Success")
}


const getImageFilm = async (req,res,next) => {
    const duongDanAnh = req.params.duongDanAnh
    let image = new Image()
    image.setLink = duongDanAnh
    const data = await image.getImageByLink()
    const dataImage = data[0].duLieuAnh
    await writeImageFile(dataImage, duongDanAnh)
    var options = {
        root: path.join('C:/NodeProject/BE', 'asset'),
      }
    res.sendFile(duongDanAnh,options)
}

const getImagesFilm = async (req,res,next) => {

}

module.exports = {
    createImageInFilm,
    getImageFilm
}

