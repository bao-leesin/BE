const express = require("express");
const router = express.Router();
const filmController = require("../controllers/filmController");

router.use("/search/name/:tenPhim", filmController.getFilmByName);
router.use("/create", filmController.createFilm);

// {
//     tenPhim,
//     moTa,
//     danhGia,
//     trailer,
//     luotXem,
//     ngayChieu,
//     duongDan,
//     phimBo,
//     dienVien,
//     theLoai,
//     duongDanAnh,
//   }

router.use("/update", filmController.updateFilm);

// {
//     idPhim,
//     tenPhim,
//     moTa,
//     danhGia,
//     trailer,
//     luotXem,
//     ngayChieu,
//     duongDan,
//     phimBo,
//     dienVien,
//     theLoai,
//     duongDanAnh,
//   }


router.use("/delete/:idPhim", filmController.deleteFilm);
router.use("/playFilm/:idPhim", filmController.playFilmCtrl);
router.use("/playTrailer/:idPhim", filmController.playTrailer);
router.use("/show/:idPhim", filmController.getFilmById);
router.use("/show/rating/:idPhim", filmController.showRatingFilm);
router.use("/show", filmController.getAllFilm);

module.exports = router;

