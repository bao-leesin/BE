const Actor  = require("../models/Actor");
const Film = require("../models/Film");
const Genre = require("../models/Genre");



const getAllFilm = async (req,res,next) => {
    let film = new Film()
    try {
        const films = await film.getAllFilm()
        const data = await Promise.all (films.map( async (film) => {
            let actor = new Actor()
            let genre = new Genre()
            let films= new Film()
            actor.setIdFilm = film.idPhim
            genre.setIdFilm =  film.idPhim
            films.setId = film.idPhim
            const actors =  await actor.getActorsByIdFilm()
            film.dienVien = actors
            const genres =  await genre.getGenresByIdFilm()
            film.theLoai = genres
            const images = await films.getFilmImages()
            film.duongDanAnh = images
            // console.log(film);
            return film
        }))
        res.send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getFilmById = async (req,res,next) => {
    let film = new Film()
    let actor = new Actor()
    let genre = new Genre()
 
    const idFilm = req.params.idPhim
    try {
    film.setId = idFilm
    actor.setIdFilm = idFilm
    genre.setIdFilm = idFilm
    const films = await film.getFilmById()
    const actors = await actor.getActorsByIdFilm()
    const genres = await genre.getGenresByIdFilm()
    const images = await film.getFilmImages()
    films.dienVien = actors
    films.theLoai = genres
    films.duongDanAnh = images
    res.send(films)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getFilmByGenres = async (req,res,next) => {
    const object = req.body;
    const genres = object.genres;
    try {
        let film = new Film()
        film.setGenre = genres
    const films = await  film.getFilmByGenres()
    res.send(films)
    } catch (error) {
    res.status(400).send(error.message)
    }
}

const getFilmByViews = async (req,res,next) => {
    const view = req.params.luotXem
    try {
        let film = new Film()
        film.setView = view
        const output = film.getFilmByViews()
        res.send(output)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getFilmByRating = async (req,res,next) => {
    const rating = req.params.danhGia
    try {
        let film = new Film()
        film.setRating = rating
        const output = film.getFilmByRatings()
        res.send(output)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const getFilmByName = async (req,res,next) => {
    const searchingWord = req.params.keyword    
    console.log(searchingWord);
    const film = new Film();
    film.setName = searchingWord
    try {
        const films = await film.getFilmByName()
        res.send(films)
    } catch (error) {
        next(error)
    }
}

const createFilm = async (req,res,next) => {
    const  {
        tenPhim,
        moTa,
        danhGia,
        trailer,
        luotXem,
        ngayChieu,
        dienVien,
        theLoai,
        duongDanAnh
    } = req.body
try {
    let film = new Film(null,tenPhim,moTa,danhGia,trailer,luotXem,ngayChieu)
    let actor = new Actor()
    let genre = new Genre()
    await film.createFilm()
    const idFilm = film.getId
    if(dienVien){
        dienVien.forEach(async (actor) => {
            let actors = new Actor()
            actors.setIdFilm = idFilm
            actors.setName = actor.tenDienVien
            await actors.getIdByName()
            await actors.createActorsInFilm()
        })
    }
    if(theLoai){
        theLoai.forEach( async(genre) => {
            let genres = new Genre()
            genres.setIdFilm = idFilm
            genres.setName = genre.theLoai
            await genres.createGenresInFilm()
        })
    }
    
    if(duongDanAnh){
        duongDanAnh.forEach( async(image) => {
            film.setImage = image.duongDanAnh
            film.createFilmImages()
        })
    }
   
    actor.setIdFilm = idFilm
    genre.setIdFilm = idFilm
    const films = await film.getFilmById()
    const actors = await actor.getActorsByIdFilm()
    const genres = await genre.getGenresByIdFilm()
    const images = await film.getFilmImages()
    films.dienVien = actors
    films.theLoai = genres
    films.duongDanAnh = images
    res.send(films)
} catch (error) {
    res.status(400).send(error.message)
} }

    const updateFilm = async (req,res,next) => {
        const{
            idPhim,
            tenPhim,
            moTa,
            danhGia,
            trailer,
            luotXem,
            ngayChieu,
            dienVien,
            theLoai
        } = req.body
    try {
        let film = new Film(idPhim,tenPhim,moTa,danhGia,trailer,luotXem,ngayChieu)
        let actor = new Actor()
        let genre = new Genre()
        await film.updateFilm()
        dienVien.forEach(async (actor) => {
            let actors = new Actor()
            actors.setIdFilm = idFilm
            actors.setName = actor.tenDienVien
            await actors.getIdByName()
            await actors.updateActorsInFilm()
        })
        theLoai.forEach( async(genre) => {
            let genres = new Genre()
            genres.setIdFilm = idFilm
            genres.setName = genre.theLoai
            await genres.updateGenresInFilm()
        })
        actor.setIdFilm = idFilm
        genre.setIdFilm = idFilm
        const films = await film.getFilmById()
        const actors = await actor.getActorsByIdFilm()
        const genres = await genre.getGenresByIdFilm()
        films.dienVien = actors
        films.theLoai = genres
        res.send(films)
    } catch (error) {
        res.status(400).send(error.message)
    }}

    const deleteFilm = async (req,res,next) => {
        const idFilm = req.params.id
        let film = new Film()
        let actor = new Actor()
        let genre = new Genre()
        film.setId = idFilm
        actor.setIdFilm = idFilm
        genre.setIdFilm = idFilm
        try {
            await actor.deleteActorsInFilm()
            await genre.deleteGenresInFilm()
            await film.deleteFilm()
            const films = await film.getAllFilm()
            res.send(films)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }


   

   const showRatingFilm = async (req,res,next) => {
        const idFilm = req.params.id
        try {
            let film = new Film()
            film.setId = idFilm
            await film.updateRatingFilm()
            const rating = await film.showRatingFilm()
            res.send({danhGia: rating})
        } catch (error) {
            res.status(400).send(error.message)
        }
   }

   const createFilmImages = async (req,res,next) => {
        const idFilm = req.params.id
        const images = req.body.duongDanAnh
        try {
            let film = new Film()
            film.setId = idFilm
            images.forEach( async (image) => {
                film.setImage = image.duongDanAnh
                await film.createFilmImages()
            })
            const data = await film.getFilmById()
           res.send(data)
        } catch (error) {
            res.status(400).send(error.message)
        }
   }

   const playFilmCtrl = async(req, res, next) => {
    const range = req.headers.range
    const videoId = req.params.id
    
    let film = new Film()
    film.setId = videoId
    const path = await film.getFilmPath()
    const pathToDir = 'videoColls/' + path
    const pathVar = require("path");
    
    // const hardCodedPath = "E:/BaiWeb9NGitClone/FilmExpressJS/src/videoColls/samplevid.mp4"
    
    let absPath = pathVar.join(__dirname, "..", pathToDir)
     
    film.setPath = absPath
    console.log("abs path: ", absPath)

    console.log(film.getPath)
    film.playFilm(range, res)
}

   module.exports = {
    getAllFilm,
    getFilmByGenres,
    getFilmByName,
    getFilmById,
    getFilmByRating,
    getFilmByViews,
    createFilm,
    updateFilm,
    deleteFilm,
    showRatingFilm,
    createFilmImages,
    playFilmCtrl
}
