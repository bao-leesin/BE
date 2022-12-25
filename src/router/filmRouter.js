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
router.use("/playfilm/:id", filmController.playFilmCtrl);

router.use("/show/id/:idPhim", filmController.getFilmById);
router.use("/show/rating/:idPhim", filmController.showRatingFilm);
router.use("/show/top", filmController.showTopFilm);
router.use("/show", filmController.getAllFilm);

module.exports = router;

