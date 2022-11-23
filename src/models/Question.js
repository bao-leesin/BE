const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");


class Question{
    #id;
    #title;
    #content;

    constructor(id,title,content){
        this.#id = id;
        this.#title = title;
        this.#content = content
    }

    set setId(id) {
        this.#id = id;
      }
    
      get getId() {
        return this.#id;
      }

    createQuestion(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO cau_hoi_thuong_gap VALUES(?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#title,this.#content],
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

    updateQuestion(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE cau_hoi_thuong_gap SET  tieuDeCauHoi = ?, noiDungGiaiPhap = ? WHERE idCauHoi = ? "
        if (err) throw err
        connection.query(
        query,
        [this.#title,this.#content,this.#id],
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

    deleteQuestion(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM cau_hoi_thuong_gap WHERE idCauHoi = ?"
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

    getAllQuestion(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT * FROM cau_hoi_thuong_gap"
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

    getQuestionById(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT tieuDeCauHoi, NoiDungGiaiPhap FROM cau_hoi_thuong_gap WHERE idCauHoi = ?"
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



}

module.exports = Question