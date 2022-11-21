const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const pool = require("../config/configMysql");

class Notification{
    #id;
    #title;
    #content;
    #idUser;
    constructor(id,title,content){
      this.#id = id  
      this.#title = title
      this.#content = content
    }

      set setId(id) {
        this.#id = id;
      }
    
      get getId() {
        return this.#id;
      }

      set setTitle(title) {
        this.#title = title;
      }
    
      get getTitle() {
        return this.#title;
      }
      set setContent(content) {
        this.#content = content;
      }
    
      get getContent() {
        return this.#content;
      } 

      set setIdUser(idUser) {
        this.#idUser = idUser;
      }
    
      get getIdUser() {
        return this.#idUser;
      }

    createNoti(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO thong_bao VALUES(?,?,?)"
     
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#title,this.#content],
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

    updateNoti(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE thong_bao SET tieuDeThongBao = ?, noiDungThongBao = ? WHERE idThongBao = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#title, this.#content, this.#id],
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

    deleteNoti(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM thong_bao WHERE idThongBao = ?"
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

    getAllNoti(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT * FROM thong_bao"
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

    getNotisOfUser(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT idThongBao, tieuDeThongBao, noiDungThongBao WHERE idThongBao IN (SELECT idThongBao FROM ) "
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

    pushNotification(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO     VALUES(?,?)"
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

module.exports = Notification