const Actor = require("../models/Actor");
const Film = require("../models/Film");
const Genre = require("../models/Genre");
const Image = require("../models/Image");

const getAllFilm = async (req, res, next) => {
  let film = new Film();
  try {
    const films = await film.getAllFilm();
    const data = await Promise.all(
      films.map(async (film) => {
        let actor = new Actor();
        let genre = new Genre();
        let films = new Film();
        let image = new Image();
        films.setId = film.idPhim;
        actor.setIdFilm = film.idPhim;
        genre.setIdFilm = film.idPhim;
        image.setIdFilm = film.idPhim;
        const actors = await actor.getActorsByIdFilm();
        film.dienVien = actors;
        const genres = await genre.getGenresByIdFilm();
        film.theLoai = genres;
        const images = await image.getImageOfFilm();
        film.duongDanAnh = images;
        // console.log(film);
        return film;
      })
    );
    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFilmById = async (req, res, next) => {
  let film = new Film();
  let actor = new Actor();
  let genre = new Genre();
  let image = new Image();

  const idFilm = req.params.idPhim;
  try {
    film.setId = idFilm;
    actor.setIdFilm = idFilm;
    genre.setIdFilm = idFilm;
    image.setIdFilm = idFilm;

    const films = await film.getFilmById();
    const actors = await actor.getActorsByIdFilm();
    const genres = await genre.getGenresByIdFilm();
    const images = await image.getImagesOfFilm();

    films.dienVien = actors;
    films.theLoai = genres;
    films.duongDanAnh = images;
    res.send(films);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFilmByGenres = async (req, res, next) => {
  const object = req.body;
  const genres = object.genres;
  try {
    let film = new Film();
    film.setGenre = genres;
    const films = await film.getFilmByGenres();
    res.send(films);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFilmByViews = async (req, res, next) => {
  const view = req.params.luotXem;
  try {
    let film = new Film();
    film.setView = view;
    const output = await film.getFilmByViews();
    res.send(output);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFilmByRating = async (req, res, next) => {
  const rating = req.params.danhGia;
  try {
    let film = new Film();
    await film.updateRatingFilm();
    film.setRating = rating;
    const output = await film.getFilmByRatings();
    res.send(output);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFilmByName = async (req, res, next) => {
  const searchingWord = req.params.keyword;
  console.log(searchingWord);
  const film = new Film();
  film.setName = searchingWord;
  try {
    const films = await film.getFilmByName();
    res.send(films);
  } catch (error) {
    next(error);
  }
};

const createFilm = async (req, res, next) => {
  const {
    tenPhim,
    moTa,
    danhGia,
    trailer,
    luotXem,
    ngayChieu,
    duongDan,
    phimBo,
    dienVien,
    theLoai,
    duongDanAnh,
  } = req.body;
  try {
    let film = new Film(
      null,
      tenPhim,
      moTa,
      danhGia,
      trailer,
      luotXem,
      ngayChieu,
      duongDan,
      phimBo
    );
    let actor = new Actor();
    let genre = new Genre();
    let image = new Image();

    await film.createFilm();

    const idFilm = film.getId;
    if (dienVien.length)
      //    await Promise.all (
      dienVien.forEach(async (actor) => {
        let actors = new Actor();
        actors.setIdFilm = idFilm;
        actors.setName = actor.tenDienVien;
        await actors.getIdByName();
        await actors.createActorsInFilm();
      });
    // )

    if (theLoai.length)
      // await Promise.all (
      theLoai.forEach(async (genre) => {
        let genres = new Genre();
        genres.setIdFilm = idFilm;
        genres.setName = genre.theLoai;
        await genres.createGenresInFilm();
      });
    // )

    if (duongDanAnh.length)
      // await Promise.all (
      duongDanAnh.forEach(async (image) => {
        let images = new Image();
        images.setIdFilm = idFilm;
        images.setLinkImage = image.duongDanAnh;
        await images.createFilmImages();
      });
    // )

    actor.setIdFilm = idFilm;
    genre.setIdFilm = idFilm;
    image.setIdFilm = idFilm;
    const films = await film.getFilmById();
    const actors = await actor.getActorsByIdFilm();
    const genres = await genre.getGenresByIdFilm();
    const images = await image.getImagesOfFilm();
    films.dienVien = actors;
    films.theLoai = genres;
    films.duongDanAnh = images;
    res.send(films);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateFilm = async (req, res, next) => {
  const {
    idPhim,
    tenPhim,
    moTa,
    danhGia,
    trailer,
    luotXem,
    ngayChieu,
    duongDan,
    phimBo,
    dienVien,
    theLoai,
    duongDanAnh,
  } = req.body;
  try {
    let film = new Film(
      idPhim,
      tenPhim,
      moTa,
      danhGia,
      trailer,
      luotXem,
      ngayChieu,
      duongDan,
      phimBo
    );
    let actor = new Actor();
    let genre = new Genre();
    let image = new Image();
    await film.updateFilm();
    const idFilm = film.getId;

    if (dienVien.length)
      //    await Promise.all (
      dienVien.forEach(async (actor) => {
        let actors = new Actor();
        actors.setIdFilm = idFilm;
        actors.setName = actor.tenDienVien;
        await actors.getIdByName();
        await actors.updateActorsInFilm();
      });
    // )


    if (theLoai.length)
      // await Promise.all (
      theLoai.forEach(async (genre) => {
        let genres = new Genre();
        genres.setIdFilm = idFilm;
        genres.setName = genre.theLoai;
        await genres.updateGenresInFilm();
      });
    // )

    if (duongDanAnh.length)
      // await Promise.all (
      duongDanAnh.forEach(async (image) => {
        let images = new Image();
        images.setIdFilm = idFilm;
        images.setLinkImage = image.duongDanAnh;
        await images.updateImagesInFilm();
      });
    // )

    actor.setIdFilm = idFilm;
    genre.setIdFilm = idFilm;
    image.setIdFilm = idFilm;
    const films = await film.getFilmById();
    const actors = await actor.getActorsByIdFilm();
    const genres = await genre.getGenresByIdFilm();
    const images = await image.getImagesOfFilm();
    films.dienVien = actors;
    films.theLoai = genres;
    films.duongDanAnh = images;
    res.send(films);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteFilm = async (req, res, next) => {
  const idFilm = req.params.idPhim;
  let film = new Film();
  let actor = new Actor();
  let genre = new Genre();
  let image = new Image()
  film.setId = idFilm;
  actor.setIdFilm = idFilm;
  genre.setIdFilm = idFilm;
  image.setIdFilm = idFilm;
  

  try {
    await actor.deleteActorsInFilm();
    await genre.deleteGenresInFilm();
    await image.deleteImagesInFilm()
    await film.deleteFilm();
    const films = await film.getAllFilm();
    res.send(films);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const showRatingFilm = async (req, res, next) => {
  const idFilm = req.params.id;
  try {
    let film = new Film();
    film.setId = idFilm;
    await film.updateRatingFilm();
    const rating = await film.showRatingFilm();
    res.send({ danhGia: rating });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createFilmImages = async (req, res, next) => {
  const idFilm = req.params.id;
  const images = req.body.duongDanAnh;
  try {
    let film = new Film();
    film.setId = idFilm;
    images.forEach(async (image) => {
      film.setImage = image.duongDanAnh;
      await film.createFilmImages();
    });
    const data = await film.getFilmById();
    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};



const playFilmCtrl = async (req, res, next) => {
  const range = req.headers.range;
  const videoId = req.params.id;

  let film = new Film();
  film.setId = videoId;
  const path = await film.getFilmPath();
  const pathToDir = "videoColls/" + path;
  const pathVar = require("path");

  // const hardCodedPath = "E:/BaiWeb9NGitClone/FilmExpressJS/src/videoColls/samplevid.mp4"

  let absPath = pathVar.join(__dirname, "..", pathToDir);

  film.setPath = absPath;
  console.log("abs path: ", absPath);

  console.log(film.getPath);
  film.playFilm(range, res);
};

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
  playFilmCtrl,
};
