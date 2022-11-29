class Rating{
    #idUser;
    #idFilm;
    #rating;

    constructor(idUser,idFilm,rating){
        this.#idUser = idUser
        this.#idFilm = idFilm
        this.#rating = rating
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

    rateFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO khach_hang_danh_gia VALUES(?,?,?)" 
        if (err) throw err
        connection.query(
        query,
        [this.#idUser,this.#idFilm,this.#rating],
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
    
    amountOfRating(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT COUNT(idPhim) FROM khach_hang_danh_gia WHERE idPhim = ? "
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

module.exports = Rating