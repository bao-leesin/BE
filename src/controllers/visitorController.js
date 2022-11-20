const {
  ValidationError,
  FieldRequiredError,
  NotFoundError,
} = require("../helper/customError");
const { jwtSign } = require("../helper/jwt");
const { bcryptHash, bcryptCompare } = require("../helper/bcrypt");
const Visitor  = require("../models/Visitor")
const Film = require("../models/Film");
const User  = require("../models/User");


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
     } catch (error) {
      res.status(400).send(error)
     }
   }

   const register = async (req,res,next) => {
    const {tenDangNhap,matKhau,vaiTro,diaChi,ngaySinh,email,tenDayDu,gioiTinh} = req.body
    try { 
    const hashPassword = await bcryptHash(matKhau);
    let user = new User(null,tenDangNhap,hashPassword,vaiTro,diaChi,ngaySinh,email,tenDayDu,gioiTinh);
    const result =  await user.signUp()
    if (!result){
      res.status(400).send("Bạn đã có tài khoản rồi, cố mà đăng nhập đi. Tôi chưa làm được chức năng lấy lại mật khẩu đâu")
      return
    }
    const newUser = await user.getUserById()
      const jwt = await jwtSign(newUser[0])
      res.send({token: jwt})
  }catch (error){
    res.status(400).send(error.message)
  }
}

const showHomePage =async (req,res,next) =>{
  const view = 500
  const topNew= 5
  const topRating = 5
  const topLiked = 5
  try {
  let film = new Film();
  film.setView = view
  const hotFilm = await film.getFilmByViews()
  film.setTop = topRating
  const appreciatedFilm = await film.getFilmByRatings()
  film.setTop = topNew
  const newFilm = await film.getNewFilm();
  const dataFilm = {
      phimHot:hotFilm,
      phimDanhGiaCao:appreciatedFilm,
      phimMoi:newFilm
  }
  res.send(dataFilm)
  } catch (error) {
  res.send(error)
  }
}


module.exports = {
login,
register,
showHomePage
}

