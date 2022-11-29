const pool = require("../config/configMysql");
class Comment{
    #id
    #content
    #postDate
    #idFilm
    #idUser

    constructor(id,  idFilm, idUser,content, postDate){
    this.#id = id
    this.#postDate = postDate
    this.#content = content
    this.#idFilm = idFilm
    this.#idUser = idUser
    }

    
    set setId(id){
        this.#id = id
    }

    get getId(){
        return this.#id;
    }

    set setIdFilm(idFilm){
        this.#idFilm = idFilm
    }

    get getIdFilm(){
        return this.#idFilm;
    }

    set setIdUser(idUser){
        this.#idUser = idUser
    }

    get getIdUser(){
        return this.#idUser;
    }

    get getPostDate(){
        return this.#postDate;
    }

    set setPostDate(postDate){
        this.#postDate = postDate
    }

    set setContent(content){
        this.#content = content
    }

    get getContent(){
        return this.#content;
    }

    
// **********************
// Nhóm chức năng xem

        getCommentByIdFilm(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "SELECT B.idBinhLuan, A.tenDayDu, B.binhLuan, B.ngayDangBinhLuan FROM " +
                    "nguoi_dung_co_tai_khoan AS A " +
                    "INNER JOIN phim__binh_luan AS B " +
                    "ON  A.idNguoiDung = B.idNguoiDung " +
                    "WHERE idPhim = ?"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#idFilm],
                        (err, row) => {
                            if(err) throw err
                        //    if(row.length === 0) throw new NotFoundError()
                            resolve(row)
                        }
                    )
                    con.release()
                } catch (error) {
                    con.release()
                    reject(error)
                    console.log(error)
                }
            })
        })
    }

    getAmountCommentOfFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT COUNT(idBinhLuan) AS soLuong FROM phim__binh_luan WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#idFilm],
        (err,rows) =>{
        if (err) throw err
        resolve(rows[0])
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    // ///////////////////////////////////

    createComment(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "INSERT INTO phim__binh_luan VALUES (?,?,?,?,?)"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#id,this.#idFilm, this.#idUser, this.#content, this.#postDate],
                        (err, row) => {
                            if(err) throw err
                            // if(row.length === 0) throw new NotFoundError()
                            resolve(row)
                        }
                    )
                    con.release()
                } catch (error) {
                    reject(error)
                   
                }
            })
        })
    }


    updateComment(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "UPDATE `phim__binh_luan` SET "+
                    "`binhLuan`=?,`ngayDangBinhLuan`=? WHERE idBinhLuan = ?"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#content, this.#postDate, this.#id],
                        (err, row) => {
                            if(err) throw err
                            // if(row.length === 0) throw new NotFoundError()
                            resolve(row)
                        }
                    )
                    con.release()
                } catch (error) {
                    reject(error)
                    console.log(error)
                }
            })
        })
    }

    deleteComment(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "DELETE FROM phim__binh_luan  WHERE idBinhLuan = ?"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#id],
                        (err, row) => {
                            if(err) throw err
                            // if(row.length === 0) throw new NotFoundError()
                            resolve(row)
                        }
                    )
                    con.release()
                } catch (error) {
                    reject(error)
                    console.log(error)
                }
            })
        })
    }

    deleteAllCommentByIdFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM phim__binh_luan  WHERE idPhim = ?"
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

    

}

module.exports = Comment