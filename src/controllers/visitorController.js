const {
  ValidationError,
  FieldRequiredError,
  NotFoundError,
} = require("../helper/customError");
const  nodemailer = require('nodemailer')
const { jwtSign } = require("../helper/jwt");
const { bcryptHash, bcryptCompare } = require("../helper/bcrypt");
const Visitor  = require("../models/Visitor")
const Film = require("../models/Film");
const User  = require("../models/User");
const Image = require("../models/Image");


  const login = async (req,res,next) => {
    const {tenDangNhap,matKhau} = req.body;
    let visitor = new Visitor(tenDangNhap,matKhau);
    try {
       const existentUser = await visitor.signIn();
       if (!existentUser) throw new Error('')
       const pwd = await bcryptCompare(matKhau, existentUser.matKhau)
       if (!pwd) throw new Error('')
      const jwt = await jwtSign(existentUser)
      res.send({token: jwt})

      // res.send(existentUser)
     } catch (error) {
      res.status(400).send(error)
     }
   }

   const register = async (req,res,next) => {
    let {tenDangNhap,matKhau,vaiTro,diaChi,ngaySinh,email,tenDayDu,gioiTinh} = req.body
    ngaySinh = ngaySinh.substring(0, 10)
    try { 
    const hashPassword = await bcryptHash(matKhau);
    let user = new User(null,tenDangNhap,hashPassword,vaiTro,diaChi,ngaySinh,email,tenDayDu,gioiTinh);
    const result =  await user.signUp()
    if (!result){
      res.status(400).send("Sai mật khẩu")
      return
    }
    const newUser = await user.getUserById()
      const jwt = await jwtSign(newUser[0])
      res.send({token: jwt})

      // res.send(newUser[0])
  }catch (error){
    res.status(400).send(error.message)
  }
}

const showHomePage =async (req,res,next) =>{
  try {
  let film = new Film();

  const hotFilm = await film.getTopView()
  const appreciatedFilm = await film.getTopRating()
  const newFilm = await film.getTopNew();

  const phimHot = await Promise.all(
    hotFilm.map(async film => {
    let image = new Image()
    image.setIdFilm = film.idPhim
    const images =   await image.getImageOfFilm()
    film = {...film,...images}
    return film
  }))


  const phimHay = await Promise.all(
    appreciatedFilm.map(async film => {
    let image = new Image()
    image.setIdFilm = film.idPhim
    const images =   await image.getImageOfFilm()
    film = {...film,...images}
    return film
  }))

  const phimMoi = await Promise.all(
    newFilm.map(async film => {
    let image = new Image()
    image.setIdFilm = film.idPhim
    const images =   await image.getImageOfFilm()
    film = {...film,...images}
    return film
  }))

  const dataFilm = {
      phimHot:phimHot,
      phimHay:phimHay,
      phimMoi:phimMoi
  }
  res.send(dataFilm)
  } catch (error) {
  res.send(error)
  }
}

const  passwordRetrieval = async (req,res,next) => {
  let {tenDangNhap,email}  = req.body
  // email = "haduytuanbao@gmail.com"

  var emailReceiver = "";
  if (email) emailReceiver = email
  else{
    let visitor = new Visitor(tenDangNhap,null)
    const email = visitor.getEmail()
    emailReceiver = email
  }

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      
      user: "nguyenhaitiennghd@gmail.com",
      pass: "fkmjnuawlxpyfgyj"
    }
  })
  let token = "DOOM" + Math.floor(Math.random() * 10)

  let info = await transporter.sendMail({
    from: '"Nhóm làm phim siêu cấp vippro DOOM 👻" <nguyenhaitiennghd@gmail.com>',
    to: emailReceiver, 
    subject: "Bạn hãy copy đoạn text dưới đây nhé", 
    text: token, 
  });

res.send({token})

console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
login,
register,
showHomePage,
passwordRetrieval
}

