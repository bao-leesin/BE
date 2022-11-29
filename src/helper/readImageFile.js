const fs = require("fs")
const path = require("path")

function readImageFile(input) {
    const link = path.join(__dirname , '../../asset' , input)
    const bitmap = fs.readFileSync( link)
    const output = new Buffer(bitmap)
    return output
}

function writeImageFile(input,output) {
    const link = path.join(__dirname , '../../asset' , output)
    console.log(link);
    const buffer = new Buffer(input,"binary")
    fs.writeFileSync(link,buffer)

}


module.exports = {
    readImageFile,
    writeImageFile
}