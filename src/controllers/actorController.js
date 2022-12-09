const Actor = require("../models/Actor")


const getFilmByActor = async (req,res,next) => {
   const idDienVien = req.params.idDienVien;
   try {
    let actor = new Actor()
    actor.setId = idDienVien
     const films = await actor.getFilmByActor();
     res.send(films);
   } catch (error) {
     res.status(400).send(error.message);
   }
}

const getAllActor = async (req,res,next) => {
  try {
    let actor = new Actor()
    const actors =  await actor.getAllActor()
    res.send(actors)
  } catch (error) {
    res.status(400).send(error.message);
  }
}





module.exports = {
  getAllActor,
    getFilmByActor
}