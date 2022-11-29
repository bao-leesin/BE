const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const pool = require("../config/configMysql");

var express = require('express')
var fs = require('fs')
var app = express()


class Film{
    #id
    #name
    #genre
    #description
    #rating
    #trailer
    #view
    #releaseDay
    #path
    #series


    #idUser
    #image
    #top

    constructor(id,name,description,rating,trailer,view,releaseDay,path,series){
      this.#id = id  
      this.#name= name
      this.#description= description
      this.#rating= rating
      this.#trailer= trailer
      this.#view= view
      this.#releaseDay= releaseDay
      this.#path = path
      this.#series = series
    }

    set setId(id) {
      this.#id = id;
    }
  
    get getId() {
      return this.#id;
    }

    set setName(name) {
      this.#name = name;
    }
  
    get getName() {
      return this.#name;
    }

    set setIdUser(idUser) {
      this.#idUser = idUser;
    }
  
    get getIdUser() {
      return this.#idUser;
    }

    get getView() {
      return this.#view;
    }


    set setRating(rating) {
      this.#rating = rating;
    }
  
    get getRating() {
      return this.#rating;
    }    

    set setTop(top) {
      this.#top = top;
    }
  
    get getTop() {
      return this.#top;
    }
  
    set setImage(image) {
      this.#image = image;
    }
  
    get getImage() {
      return this.#image;
    }

    set setPath(path) {
      this.#path = path;
    }
  
    get getPath() {
      return this.#path;
    }

// Nhóm chức năng tìm kiếm, show dữ liệu

    getAllFilm(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT * FROM phim"
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
        connection.release()
      reject(error)
      console.log(error)
      }})})}

    getListFilm(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT idPhim,tenPhim FROM phim"
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

    getFilmById(){
     return new Promise((resolve, reject) => {
       pool.getConnection( (err,connection) =>{ 
     try {
     const query = "SELECT * FROM phim WHERE idPhim = ?"
     if (err) throw err
     connection.query(
     query,
     [this.#id],
     (err,rows) =>{
     if (err) throw err
    //  if(rows.length === 0) throw new NotFoundError() 
     resolve(rows[0])
    })
    connection.release()
     }catch (error) {
      connection.release()
      reject(error)
     console.log(error)
    }})})}

    getEpisodeOfFilm(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT idTap, tenTap, duongDanPhim FROM phim__phim_bo WHERE idPhim = ?"
      if (err) throw err
      connection.query(
      query,
      [this.#id],
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

    getFilmByName(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT * FROM phim WHERE tenPhim LIKE" 
      + "'%" + this.#name + "%'" 
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
        connection.release()
        reject(error)
      console.log(error)
      }})})}

    getFilmByViews(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
          try {
            const query = "SELECT A.idPhim, A.tenPhim, A.luotXem , B.duongDanAnh " +
                          "FROM phim AS A " +
                          "INNER JOIN phim__anh_cua_phim AS B "  +
                          "ON A.idPhim = B.idPhim " +
                          "WHERE A.luotXem > ? " +
                          "GROUP BY A.idPhim"
            if (err) throw err
            connection.query(
              query,
              [this.#view],
              (err,rows) =>{
                if (err) throw err
                else resolve(rows)
              })
              connection.release();
            
          } catch (error) {
            connection.release();
            reject(error)
            console.log(error);
          }})})}
    
      getFilmByRatings(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ if (err) throw err
          try {
              const query = 
              "SELECT A.idPhim, A.tenPhim, A.danhGiaPhim , B.duongDanAnh " +
              "FROM phim AS A " +
              "INNER JOIN phim__anh_cua_phim AS B "  +
              "ON A.idPhim = B.idPhim " +
              "WHERE A.danhGiaPhim > ? " +
              "GROUP BY A.idPhim" 

            connection.query(
              query,
              [this.#rating],
              (err,rows) => {
                if (err) throw err
                else resolve(rows)
              })
              connection.release()
          } catch (error) {
            connection.release();
            reject(error)
            console.log(error);
            
          }})})}
    
      getTopNew(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
         try {
        const query = "SELECT idPhim, tenPhim FROM phim ORDER BY ngayChieu DESC LIMIT 5"
          if (err) throw err
         connection.query(
          query,
          [],
          (err,rows) =>{
            if (err) throw err
            else resolve(rows)
          })
        connection.release()      
      } catch (error) {
        connection.release()
        reject(error)
        console.log(error)
      
      }})})
      }

      getTopView(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
          try {
            const query = "SELECT idPhim, tenPhim FROM phim ORDER BY luotXem DESC LIMIT 5"
            if (err) throw err
            connection.query(
              query,
              [],
              (err,rows) =>{
                if (err) throw err
                else resolve(rows)
              })
              connection.release();
            
          } catch (error) {
            connection.release();
            reject(error)
            console.log(error);
          }})})}


      getTopRating(){
            return new Promise((resolve, reject) => {
              pool.getConnection( (err,connection) =>{ if (err) throw err
              try {
                  const query = 
                  "SELECT idPhim, tenPhim FROM phim ORDER BY danhGiaPhim DESC  LIMIT 5"
                connection.query(
                  query,
                  [],
                  (err,rows) => {
                    if (err) throw err
                    else resolve(rows)
                  })
                  connection.release()
              } catch (error) {
                connection.release();
                reject(error)
                console.log(error);
                
              }})})}
        

      getFilmByGenres(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
        try {
        const length = this.#genre.length
        const query = 
        "SELECT * FROM phim WHERE idPhim IN " +
        "(SELECT idPhim FROM phim__the_loai WHERE theLoai IN " +
          "(?) GROUP BY idPhim HAVING COUNT(*) = ?)"
        if (err) throw err
        connection.query(
        query,
        [this.#genre,length],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError()
        resolve(rows)
        })
        connection.release()
        
        }catch (error) {
          connection.release()
          reject(error)
        console.log(error)
        }})})
      }

      // showRatingFilm(){
      //   return new Promise((resolve, reject) => {
      //   pool.getConnection( (err,connection) =>{ 
      //   try {
      //   const query = "SELECT round(AVG(soSaoDanhGia)) AS tb FROM khach_hang_danh_gia WHERE idPhim = ?"
      //   if (err) throw err
      //   connection.query(
      //   query,
      //   [this.#id],
      //   (err,rows) =>{
      //   if (err) throw err
      //   // if(rows.length === 0) throw new NotFoundError() 
      //   this.#rating = rows[0].tb
      //   resolve(this.#rating)
      //   })
      //   connection.release()
      //   }catch (error) {
      //   reject(error)
      //   console.log(error)
      //   }})})
      // }

     

// *****************************************************************************************
      // Nhóm chức năng thêm

      createFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO phim VALUES(?,?,?,?,?,?,?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#name,this.#description,this.#rating,this.#trailer,this.#view,this.#releaseDay,this.#path,this.#series],
        (err,result) =>{
          if (err) throw err
         this.#id = result.insertId
        resolve(result.insertId)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
      }


      // *****************************************************************************************
      // Nhóm chức năng Sửa

      updateFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE phim SET " +
                      "tenPhim = ?, moTa = ?, danhGiaPhim = ?, trailer = ?, luotXem = ?, ngayChieu = ? , duongDan = ? , phimBo = ? " +
                      "WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#name, this.#description, this.#rating, this.#trailer, this.#view, this.#releaseDay, this.#path, this.#series, this.#id],
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

      updateRatingFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE phim SET danhGiaPhim = "+
        "(SELECT round(AVG(soSaoDanhGia)) AS tb FROM khach_hang_danh_gia ) "+
        "WHERE idPhim IN (SELECT idPhim FROM khach_hang_danh_gia ORDER BY idPhim)"
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#id],
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


      // *****************************************************************************************
      // Nhóm chức năng Xoá
      deleteFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM phim WHERE idPhim = ?"
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


       // *****************************************************************************************
      // Nhóm chức năng Xem phim

      async playFilm(range, res){
        const videoSize = fs.statSync(this.#path).size
        const chunkSize = 1 * 1e+6
        const start = Number(range.replace(/\D/g, '')) // /_/g la global match, \D la 
        const end = Math.min(start + chunkSize, videoSize - 1)
        console.log('range: ', range)
        const contentLength = end - start + 1
        
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        }
    
        console.log('headers: ', headers)
        res.writeHead(206, headers)
        
        const stream = fs.createReadStream(this.#path, {start, end})
        stream.pipe(res)
      }

      getFilmPath() {
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
          try {
          const query = "SELECT duongDan FROM `phim` WHERE `idPhim` = ?"
          if (err) throw err
          connection.query(
          query,
          [this.#id],
          (err,rows) =>{
          if (err) throw err
          if(rows.length === 0) throw new NotFoundError() 
        //  this.#trailer = rows[0].duongDan
          resolve(rows[0].duongDan)
          })
          connection.release()
          }catch (error) {
          reject(error)
          console.log(error)
          }})})
      }

      getAllIdFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT idPhim FROM phim"
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
      
}

module.exports = Film;