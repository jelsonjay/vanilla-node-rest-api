const fs = require('fs')

//========WRITE DATA TO FILE ========
function writeDataToFile(filename, content){
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if(err){
      console.log(err)
    }
  })
}


//========POST DATA TO DATABASE========
function getPostData(req){
return new Promise((resolve , reject) => {
  try{
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
  resolve(body)
  })

  }catch(error){
  reject(err)
  }
})
}

module.exports = {
  writeDataToFile,
  getPostData
}