const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");


class Request{
    #id;
    #nameFilm;
    #idUser;
    #time
    #status;

    constructor (id,nameFilm,idUser,time,status){
      this.#id = id
      this.#nameFilm = nameFilm
      this.#idUser = idUser
      this.#time = time
      this.#status = status
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
  
    get getIdUser() {
      return this.#idUser;
    }

    set setNameFilm(nameFilm) {
      this.#nameFilm = nameFilm;
    }
  
    get getNameFilm() {
      return this.#nameFilm;
    }

    set setStatus(status) {
      this.#status = status;
    }
  
    get getStatus() {
      return this.#status;
    }

    getAllRequest(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT * FROM yeu_cau_phim"
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

    getFilmByNameRequest(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query =  "SELECT * FROM yeu_cau_phim WHERE phimYeuCau LIKE" 
                      + "'%" + this.#nameFilm + "%'" 
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



    createRequest(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "INSERT INTO yeu_cau_phim VALUES(?,?,?,?,?)"
      if (err) throw err
      connection.query(
      query,
      [this.#id, this.#nameFilm, this.#idUser, this.#time, this.#status],
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

    updateStatusRequest(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "UPDATE yeu_cau_phim SET tacVu = ? WHERE idYeuCau = ?"
      if (err) throw err
      connection.query(
      query,
      [this.#status, this.#id],
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
module.exports = Request