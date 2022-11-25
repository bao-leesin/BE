const pool = require("../config/configMysql")

const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
class Visitor {
  _username;
  _password;

  constructor(username, password) {
    this._username = username;
    this._password = password;
  }

  set setUsername(username) {
    this._username = username;
  }

  get getUsername() {
    return this._username;
  }


  set setPassword(password) {
    this._password = password;
  }

  get getPassword() {
    
    return this._password;
  }

  signIn() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        try {
          const query =
            "Select * from nguoi_dung_co_tai_khoan where tenDangNhap = ?";
          if (err) throw err;
          connection.query(query, [this._username], (err, rows) => {
            if (err) throw err;
           resolve(rows[0]);
          });
          connection.release();
        } catch (error) {
          // connection.release();
          reject(error);
        }
      });
    });
  }

  getEmail(){
    return new Promise((resolve, reject) => {
    pool.getConnection( (err,connection) =>{ 
    try {
    const query = "SELECT email FROM nguoi_dung_co_tai_khoan WHERE tenDangNhap = ?"
    if (err) throw err
    connection.query(
    query,
    [this._username],
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
module.exports = Visitor 
