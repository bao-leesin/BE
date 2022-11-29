const pool = require("../config/configMysql");





class Image {
  #id;
  #idFilm;
  #role;
  #link;
  #data;


  constructor(id,idFilm,role,link,data) {
    this.#id = id
    this.#idFilm = idFilm;
    this.#role = role
    this.#link = link
    this.#data = data;
  }

  set setId(id) {
    this.#id = id;
  }

  get getId() {
    return this.#id;
  }

  set setIdFilm(idFilm) {
    this.#idFilm = idFilm;
  }

  get getIdFilm() {
    return this.#idFilm;
  }

  set setDataImage(data) {
    this.#data = data;
  }

  get getDataImage() {
    return this.#data;
  }

  set setRole(role) {
    this.#role = role;
  }

  get getRole() {
    return this.#role;
  }

  set setLink(link) {
    this.#link = link;
  }

  get getLink() {
    return this.#link;
  }


  createFilmImages() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        try {
          const query = "INSERT INTO phim__anh_cua_phim VALUES(?,?,?,?,?)";
          if (err) throw err;
          connection.query(query, [this.#id,this.#idFilm,this.#role,this.#link, this.#data], (err, rows) => {
            if (err) throw err;
            // if(rows.length === 0) throw new NotFoundError()
            resolve(rows);
          });
          connection.release();
        } catch (error) {
          reject(error);
          console.log(error);
        }
      });
    });
  }

  // updateImagesInFilm() {
  //   return new Promise((resolve, reject) => {
  //     pool.getConnection((err, connection) => {
  //       try {
  //         const query = "UPDATE phim__anh_cua_phim SET duongDanAnh = ? WHERE idPhim = ?";
  //         if (err) throw err;
  //         connection.query(query, [this.#link, this.#idFilm], (err, rows) => {
  //           if (err) throw err;
  //           // if(rows.length === 0) throw new NotFoundError()
  //           resolve(rows);
  //         });
  //         connection.release();
  //       } catch (error) {
  //         reject(error);
  //         console.log(error);
  //       }
  //     });
  //   });
  // }

  // deleteImagesInFilm(){
  //   return new Promise((resolve, reject) => {
  //   pool.getConnection( (err,connection) =>{ 
  //   try {
  //   const query = "DELETE FROM phim__anh_cua_phim WHERE idPhim = ?"
  //   if (err) throw err
  //   connection.query(
  //   query,
  //   [this.#idFilm],
  //   (err,rows) =>{
  //   if (err) throw err
  //   resolve(rows)
  //   })
  //   connection.release()
  //   }catch (error) {
  //   reject(error)
  //   console.log(error)
  //   }})})
  // }




  getImageByLink(){
    return new Promise((resolve, reject) => {
    pool.getConnection( (err,connection) =>{ 
    try {
    const query = "SELECT duLieuAnh FROM phim__anh_cua_phim WHERE duongDanAnh = ?"
    if (err) throw err
    connection.query(
    query,
    [this.#link],
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

  getImageOfFilm() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        try {
          const query =
            "SELECT duongDanAnh FROM phim__anh_cua_phim WHERE idPhim = ? AND vaiTro = 'banner' ";
          if (err) throw err;
          connection.query(query, [this.#idFilm], (err, rows) => {
            if (err) throw err;
            resolve(rows[0]);
          });
          connection.release();
        } catch (error) {
          reject(error);
          console.log(error);
        }
      });
    });
  }

  getImagesOfFilm() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        try {
          const query =
            "SELECT duongDanAnh FROM phim__anh_cua_phim WHERE idPhim = ? AND vaiTro = 'detail' ";
          if (err) throw err;
          connection.query(query, [this.#idFilm], (err, rows) => {
            if (err) throw err;
            // if(rows.length === 0) throw new NotFoundError()
            resolve(rows);
          });
          connection.release();
        } catch (error) {
          reject(error);
          console.log(error);
        }
      });
    });
  }
}

module.exports = Image;
