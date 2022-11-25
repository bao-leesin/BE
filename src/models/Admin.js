const Visitor = require("./Visitor")

class  Admin extends Visitor {
    _id;
    constructor(id, username, password){
        super(username,password)
        this._id = id
    }

   get idAdmin(){
    return this._id
   }

}

module.exports = Admin

