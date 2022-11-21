const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const pool = require("../config/configMysql");

class Image {
  #idFilm;
  #link;

  constructor(idFilm, link) {
    this.#idFilm = idFilm;
    this.#link = link;
  }

  set setIdFilm(idFilm) {
    this.#idFilm = idFilm;
  }

  get getIdFilm() {
    return this.#idFilm;
  }

  set setLinkImage(link) {
    this.#link = link;
  }

  get getLinkImage() {
    return this.#link;
  }

  createFilmImages() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        try {
          const query = "INSERT INTO phim__anh_cua_phim VALUES(?,?)";
          if (err) throw err;
          connection.query(query, [this.#idFilm, this.#link], (err, rows) => {
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

  updateImagesInFilm() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        try {
          const query = "UPDATE phim__anh_cua_phim SET duongDanAnh = ? WHERE idPhim = ?";
          if (err) throw err;
          connection.query(query, [this.#link, this.#idFilm], (err, rows) => {
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

  deleteImagesInFilm(){
    return new Promise((resolve, reject) => {
    pool.getConnection( (err,connection) =>{ 
    try {
    const query = "DELETE FROM phim__anh_cua_phim WHERE idPhim = ?"
    if (err) throw err
    connection.query(
    query,
    [this.#idFilm],
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
            "SELECT duongDanAnh FROM phim__anh_cua_phim WHERE idPhim = ? LIMIT 1";

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
            "SELECT duongDanAnh FROM phim__anh_cua_phim WHERE idPhim = ? ";
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
