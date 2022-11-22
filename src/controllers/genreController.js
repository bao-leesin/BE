const Genre = require("../models/Genre")

const createGenre = async (req,res,next) => {
    const tenTheLoai = req.params.tenTheLoai
    try {
        const genre = new Genre(null,tenTheLoai)
        await genre.createGenre()
        const genres = await genre.getAllGenres()
        res.send(genres)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateGenre = async (req,res,next) => {
    const {idTheLoai,tenTheLoai} = req.body
    try {
        const genre = new Genre(idTheLoai,tenTheLoai)
        await genre.updateGenre()
        const genres = await genre.getAllGenres()
        res.send(genres)
    } catch (error) {
        res.status(400).send(error.message)
    } 
}

const deleteGenre = async (req,res,next) => {
    const idTheLoai = req.params.idTheLoai
    try {
        const genre = new Genre(idTheLoai,null)
        await genre.deleteGenre()
        const genres = await genre.getAllGenres()
        res.send(genres)
    } catch (error) {
        
        res.status(400).send(error.message)
    } 
}

const getAllGenres = async (req,res,next) => {
    try {
        const genre = new Genre()
        const genres = await genre.getAllGenres()
        res.send(genres)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    createGenre,
    updateGenre,
    deleteGenre,
    getAllGenres
}