const Actor = require("../models/Actor")
const Film = require("../models/Film")

const getIdByName = async (req,res,next) => {
    let actor = new Actor()
    actor.setName = "Camila Mendes"  
    const kq = await actor.getIdByName()
}




module.exports = {
    getIdByName
}