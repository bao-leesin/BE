var fs = require('fs')
const path = require("path");


async function streamVideo(range,input) {
    
  const link = path.join(__dirname , '../../asset' , input);

  const videoSize = await fs.statSync(link).size;
  const chunkSize = 1 * 1e6;
  const start = await Number(range.replace(/\D/g, "")); 
  const end = Math.min(start + chunkSize, videoSize - 1);
  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  const stream = await fs.createReadStream(link, { start, end });
  
  return{
    headers,
    stream
  }
}

module.exports = {streamVideo}
