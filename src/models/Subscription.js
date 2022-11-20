const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");

class Subscription{
    #id;
    #name;
    #price;
    #quality;
    #idUser;

    constructor(id,name,price,quality){
        this.#id = id
        this.#name = name
        this.#price = price
        this.#quality = quality
    }

      set setId(id) {
        this.#id = id;
      }
    
      get getId() {
        return this.#id;
      }

      set setIdUser(idUser) {
        this.#idUser = idUser;
      }
    
      get getIdUser(){
        return this.#idUser;
      }
  
      set setName(name) {
        this.#name = name;
      }
    
      get getName() {
        return this.#name;
      }

    getAllSub(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT * FROM goi_xem_phim"
        if (err) throw err
        connection.query(
        query,
        [],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    getSubOfUser(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT A.idKhachHang, B.tenGoi, B.giaTien, B.chatLuong, A.ngayDangKiGoi, A.khuyenMaiSuDung " +
      "FROM goi_xem_phim AS B "+
      "INNER JOIN khach_hang_dang_ki_goi AS A " +
      "ON A.idGoi = B.idGoi " +
      "WHERE A.idKhachHang = ?"
      if (err) throw err
      connection.query(
      query,
      [this.#idUser],
      (err,rows) =>{
      if (err) throw err
      resolve(rows)
      })
      connection.release()
      }catch (error) {
      reject(error)
      console.log(error)
      }})})
    }

    getHotSub(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT A.idGoi , A.tenGoi, A.giaTien, A.chatLuong, COUNT(*) AS soLanDangKi "  +
                   " FROM goi_xem_phim AS A INNER JOIN "+
                    " khach_hang_dang_ki_goi AS B "+
                    " ON A.idGoi = B.idGoi "+
                    " GROUP BY idGoi "+
                    "HAVING COUNT(*) >= ALL "+
                    "( SELECT COUNT(*) FROM khach_hang_dang_ki_goi GROUP BY idGoi)"
      if (err) throw err
      connection.query(
      query,
      [],
      (err,rows) =>{
      if (err) throw err
      resolve(rows)
      })
      connection.release()
      }catch (error) {
      reject(error)
      console.log(error)
      }})})
    }

    createSub(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO goi_xem_phim VALUES(?,?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#name,this.#price,this.#quality],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        this.#id=rows.insertId
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    updateSub(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE goi_xem_phim SET tenGoi = ?, giaTien = ?, chatLuong = ? WHERE idGoi = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#name,this.#price,this.#quality,this.#id],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    deleteSub(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM goi_xem_phim WHERE idGoi = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#id],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }
}

module.exports = Subscription