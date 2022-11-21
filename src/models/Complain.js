const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");


class Complain{
    #id;
    #title;
    #content;
    #idTopic;
    #topic;
    #solution;
    #idUser;
    #idAdmin;

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

      set setIdTopic(idTopic) {
        this.#idTopic = idTopic;
      }
    
      get getIdTopic() {
        return this.#idTopic;
      }

      set setTopic(topic) {
        this.#topic = topic;
      }
    
      get getTopic() {
        return this.#topic;
      } 

      set setSolution(solution) {
        this.#solution = solution;
      }
    
      get getSolution() {
        return this.#solution;
      } 

      set setIdAdmin(idAdmin) {
        this.#idAdmin = idAdmin;
      }
    
      get getIdAdmin() {
        return this.#idAdmin;
      }

    constructor(topic,title,content,solution){
        this.#topic = topic
        this.#title = title
        this.#content = content
        this.#solution = solution
    }


// ***********************************************
// Nhóm chức năng xem

    getAllComplain(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT A.idKhieuNai, A.tieuDeKhieuNai, A.noiDungKhieuNai, C.tenChuDe, C.trangThai " +
      "FROM khach_hang_khieu_nai AS A " +
      "INNER JOIN chu_de_khieu_nai__ds_khieu_nai AS B ON A.idKhieuNai = B.idKhieuNai "  +
      "INNER JOIN chu_de_khieu_nai AS C ON B.idChuDe = C.idChuDe"  
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

    // getComplainByTopic(){
    //   return new Promise((resolve, reject) => {
    //   pool.getConnection( (err,connection) =>{ 
    //   try {
    //   const query = "SELECT  "
    //   if (err) throw err
    //   connection.query(
    //   query,
    //   [],
    //   (err,rows) =>{
    //   if (err) throw err
    //   if(rows.length === 0) throw new NotFoundError() 
    //   resolve(rows)
    //   })
    //   connection.release()
    //   }catch (error) {
    //   reject(error)
    //   console.log(error)
    //   }})})
    // }

    getSolutionForTopic(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT cachGiaiQuyet FROM chu_de_khieu_nai__ds_phuong_huong_giai_quyet where idChuDe = ?"
      if (err) throw err
      connection.query(
      query,
      [this.#idTopic],
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

    getAllTopic(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT A.idChuDe, A.tenChuDe, A.trangThai,  B.cachGiaiQuyet AS cachGiaiQuyet, B.idAdminDongGop " + 
                    "FROM  chu_de_khieu_nai AS A " +
                    "INNER JOIN  chu_de_khieu_nai__ds_phuong_huong_giai_quyet AS B ON A.idChuDe = B.idChuDe "
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

    // ****************************************
    // Nhóm chức năng thêm

    createComplain(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query ="INSERT INTO khach_hang_khieu_nai VALUES(?,?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#idUser,this.#title,this.#content],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        this.#id = rows.insertId 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    createTopic(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO chu_de_khieu_nai VALUES(?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [null,this.#topic,null],
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

    

    createComplainListWithTopic(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO chu_de_khieu_nai__ds_khieu_nai VALUES(?,?) "
        if (err) throw err
        connection.query(
        query,
        [this.#topic,this.#id],
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

    createSolutionForTopic(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO chu_de_khieu_nai__ds_phuong_huong_giai_quyet VALUES(?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#idTopic,this.#idAdmin,this.#solution],
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


// *****************************************************************
    // Nhóm chức năng xoá

    deleteTopic(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM chu_de_khieu_nai__ds_khieu_nai WHERE idChuDe = ? ;" + 
                      "DELETE FROM chu_de_khieu_nai__ds_phuong_huong_giai_quyet WHERE idChuDe = ? ;"+
                      "DELETE FROM chu_de_khieu_nai WHERE idChuDe = ? ;"
        if (err) throw err
        connection.query(
        query,
        [this.#topic, this.#topic, this.#topic],
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

    deleteComplainByTopic(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM khach_hang_khieu_nai WHERE idKhieuNai IN "+
                      "(SELECT idKhieuNai FROM chu_de_khieu_nai__ds_khieu_nai WHERE idChuDe = ?)"
        if (err) throw err
        connection.query(
        query,
        [this.#topic],
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

module.exports = Complain