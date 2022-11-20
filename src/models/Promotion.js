const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");

  class Promotion{
    #id;
    #title;
    #content;
    #object;
    #startDay;
    #endDay;
    #status;
    #coupon;
    #image;


    constructor(id,title,content,object,startDay,endDay,status,coupon,image){
        this.#id=id
        this.#title=title
        this.#content= content
        this.#object = object
        this.#startDay = startDay
        this.#endDay = endDay
        this.#status = status
        this.#coupon = coupon
        this.#image = image
    }

    set setId(id) {
        this.#id = id;
      }
    
      get getId() {
        return this.#id;
      }

      set setStatus(status) {
        this.#status = status;
      }
    
      get getStatus() {
        return this.#status;
      }

      set setTitle(title) {
        this.#title = title;
      }
    
      get getTitle() {
        return this.#title;
      }

    createPromotion(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO chuong_trinh_khuyen_mai VALUES (?,?,?,?,?,?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#title,this.#content,this.#object,this.#startDay,this.#endDay,this.#status,this.#coupon,this.#image],
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

// **********************
// Nhóm chức năng thêm tạo
    updatePromotion(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE chuong_trinh_khuyen_mai SET" + 
                        "tieuDeChuongTrinhKhuyenMai = ?, " +
                        "noiDungChuongTrinhKhuyenMai = ?," +
                        "doiTuongKhuyenMai = ?," +
                        "thoiGianBatDau = ?," +
                        "thoiGianKetThuc = ?," +
                        "trangThai = ?, " +
                        "maKhuyenMai = ?,"+
                        "anhDaiDien = ?" +
                        "WHERE idChuongTrinhKhuyenMai = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#title,this.#content,this.#object,this.#startDay,this.#endDay,this.#status,this.#coupon,this.#image,this.#id],
        (err,rows) =>{
        if (err) throw err
        // if(rows.length === 0) throw new NotFoundError()
        this.#id = rows.insertId 
        resolve(rows)
        })
        connection.release()    
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }
// Nhóm chức năng cập nhật
    updateStatusPromotion(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE chuong_trinh_khuyen_mai SET trangThai = ? WHERE idChuongTrinhKhuyenMai = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#status, this.#id],
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

// Nhóm chức năng xoá 
    deletePromotion(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM chuong_trinh_khuyen_mai WHERE idChuongTrinhKhuyenMai = ?"
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
 
    // **********************
// Nhóm chức năng tìm kiếm

    getAllPromotion(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT * FROM chuong_trinh_khuyen_mai"
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

    getPromotionsByTitle(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT * FROM chuong_trinh_khuyen_mai WHERE tieuDeChuongTrinhKhuyenMai LIKE"
                        + "'%" + this.#title + "%'" 
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

}

module.exports = Promotion