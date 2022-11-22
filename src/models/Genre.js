const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");

class Genre{
    #id
    #idFilm
    #name

    constructor(id,name){
    this.#id = id
    this.#name = name
    }

    set setName(name){
        this.#name = name
    }

    get getName(){
        return this.#name;
    }

    set setIdFilm(idFilm){
        this.#idFilm = idFilm
    }

    get getIdFilm(){
        return this.#idFilm;
    }

    getFilmByGenre(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT idPhim, tenPhim, luotXem, danhGiaPhim FROM phim WHERE idPhim IN (SELECT idPhim FROM phim__the_loai WHERE theLoai = ? )"
        if (err) throw err
        connection.query(
        query,
        [this.#name],
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

    getGenresByIdFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT theLoai from phim__the_loai where idPhim = ?" 
        if (err) throw err
        connection.query(
        query,
        [this.#idFilm],
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

    getAllGenres(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT * FROM the_loai"
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

    createGenresInFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO phim__the_loai VALUES(?,?) "
        if (err) throw err
        connection.query(
        query,
        [this.#idFilm,this.#name],
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


    createGenre(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO the_loai VALUES(?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#name],
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


    updateGenresInFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE phim__the_loai SET theLoai = ? WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#name, this.#idFilm],
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

    updateGenre(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query ="UPDATE the_loai SET tenTheLoai = ? WHERE idTheLoai = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#name, this.#id],
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

    deleteGenresInFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM phim__the_loai WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#idFilm],
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

    deleteGenre(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM the_loai WHERE idTheLoai = ?"
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

module.exports = Genre