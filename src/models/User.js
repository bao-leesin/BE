const  Visitor  = require("./Visitor");
const moment = require("moment/moment");


const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const pool = require("../config/configMysql");
class User extends Visitor{
    #id
    #username;
    #password;
    #role
    #address;
    #birthday;
    #email;
    #fullname;
    #sex;
    #idFilm;
    #idSubscription;
    #subscriptionDay;
    #idPromotion
    constructor(id,username,password,role,address,birthday,email,fullname,sex){
        super()
        this.#id = id
        this.#username = username
        this.#password = password
        this.#role = role
        this.#address =address
        this.#birthday = birthday
        this.#email = email
        this.#fullname = fullname
        this.#sex = sex
    }

    set setId(id){
        this.#id = id
    }

    get getId(){
        return this.#id
    }

    set setUsername(username) {
      super.setUsername(username)
      
    }
  
    set setPassword(password) {
     super.setPassword(password)
    }
  
    get getUsername() {
      super.getUsername()
    }
  
    get getPassword() {
      super.getPassword()
    }

    set setIdFilm(idFilm){
      this.#idFilm = idFilm
  }

  get getIdFilm(){
      return this.#idFilm
  }

    set setRole(role){
        this.#role = role
    }

    get getRole(){
        return this.#role
    }

    set setAddress(address){
        this.#address = address
    }

    get getAddress(){
        return this.#address
    }

    set setBirthday(birthday){
        this.#birthday = birthday
    }

    get getBirthday(){
        return this.#birthday
    }

    set setEmail(email){
        this.#email = email
    }

    get getEmail(){
        return this.#email
    }

    set setFullname(fullname){
        this.#fullname = fullname
    }

    get getFullname(){
        return this.#fullname
    }

    set setSex(sex){
        this.#sex = sex
    }

    get getSex(){
        return this.#sex
    }

    set setSubsciption(idSubscription){
      this.#idSubscription = idSubscription
    }

    get getSubsciption(){
      return this.#idSubscription
    }

    set setSubsciptionDay(subscriptionDay){
      this.#subscriptionDay = subscriptionDay
    }

    get getSubsciptionDay(){
      return this.#subscriptionDay
    }

    set setPromotion(Promotion){
      this.#idPromotion =Promotion
    }

    get getPromotion(){
      return this.#idPromotion
    }



// **********************
// Nhóm chức năng thêm tạo

    signUp() {
        return new Promise((resolve, reject) => {
          pool.getConnection((err, connection) => {
            try {
              const query =
                "Select idNguoiDung from nguoi_dung_co_tai_khoan where tenDangNhap = ?";
              if (err) throw err;
              connection.query(query, [this.#username], (err, rows) => {
                if (err) throw err;
                if (rows.length !== 0) 
                resolve(false)
                return 
              });
    
              connection.query(
                "INSERT INTO nguoi_dung_co_tai_khoan VALUES (?,?,?,?,?,?,?,?,?)",
                [
                  this.#id,
                  this.#username,
                  this.#password,
                  this.#role,
                  this.#address,
                  this.#birthday,
                  this.#email,
                  this.#fullname,
                  this.#sex
                ],
                (err, rows) => {
                  if (err) throw err;
                  this.#id = rows.insertId 
                  resolve(rows)
                }
              );
              connection.release();
            } catch (error) {
              connection.release();
              reject(error);
            }
          });
        });
      }

      subscribe(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO khach_hang_dang_ki_goi VALUES(?,?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#idSubscription,this.#subscriptionDay,this.#idPromotion],
        (err,rows) =>{
        if (err) throw new Error('')
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
      }

      getUserById(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT * FROM nguoi_dung_co_tai_khoan WHERE idNguoiDung = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#id],
        (err,rows) =>{
        if (err) throw err
        // if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
      }

      getAllUserInfo(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT idNguoiDung,diaChi,ngaySinh,email,tenDayDu,gioiTinh FROM nguoi_dung_co_tai_khoan"
        if (err) throw err
        connection.query(
        query,
        [],
        (err,rows) =>{
        if (err) throw err
        // if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
      }

      getUserInfo(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT idNguoiDung,diaChi,ngaySinh,email,tenDayDu,gioiTinh FROM nguoi_dung_co_tai_khoan WHERE idNguoiDung = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#id],
        (err,rows) =>{
        if (err) throw err
        // if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    updateUserInfo(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
          
        const query = "UPDATE nguoi_dung_co_tai_khoan SET " + 
        "diaChi = ?, ngaySinh = ? , email = ?, tenDayDu = ?, gioiTinh = ? "+  
        "WHERE idNguoiDung = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#address, this.#birthday, this.#email, this.#fullname, this.#sex, this.#id],
        (err,rows) =>{
        if (err) throw err
        resolve(rows)
        }
        )
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    likeFilm(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "INSERT INTO phim_yeu_thich VALUES(?,?)"
      if (err) throw err
      connection.query(
      query,
      [this.#idFilm,this.#id],
      (err,rows) =>{
      if (err) throw err
      // if(rows.length === 0) throw new NotFoundError() 
      resolve(rows)
      })
      connection.release()
      }catch (error) {
      reject(error)
      console.log(error)
      }})})
    }

    unlikeFilm(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "DELETE FROM phim_yeu_thich WHERE idKhachHang = ? AND idPhim = ?"
      if (err) throw err
      connection.query(
      query,
      [this.#id,this.#idFilm],
      (err,rows) =>{
      if (err) throw err
      // if(rows.length === 0) throw new NotFoundError() 
      resolve(rows)
      })
      connection.release()
      }catch (error) {
      reject(error)
      console.log(error)
      }})})
    }
    
    getLikedFilm(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT idPhim,tenPhim, danhGiaPhim, phim.luotXem FROM phim WHERE idPhim IN (SELECT idPhim FROM phim_yeu_thich WHERE idKhachHang = ? ) "
      if (err) throw err
      connection.query(
      query,
      [this.#id],
      (err,rows) =>{
      if (err) throw err
      // if(rows.length === 0) throw new NotFoundError() 
      resolve(rows)
      })
      connection.release()
      }catch (error) {
      reject(error)
      console.log(error)
      }})})
    }

    

}

module.exports = User