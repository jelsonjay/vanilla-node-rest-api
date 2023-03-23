let products = require('../data/products.json')
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils')


//========MODEL FIND PRODUCT=========
function findModel(){
  return new Promise((resolve, reject) => {
    resolve(products)
  })
}   

//========MODEL FIND PRODUCT BY ID=========
function findProductById(id){
  return new Promise((resolve, reject) => {
    const product = products.find((item) => item.id === id)
    resolve(product)
  })
}

//========MODEL CREATE NEW PRODUCT=========
function create(product){
  return new Promise((resolve, reject) => {
    const newProduct = {id: uuidv4(),...product}
    products.push(newProduct)
    writeDataToFile('./data/products.json', products)
    resolve(newProduct)
  })
}


//========MODEL UPDATE PRODUCT=========
function update(id, product){
  return new Promise((resolve, reject) => {

    const index = products.findIndex((p) => p.id === id )
    products[index] = {id, ...product}
    writeDataToFile('./data/products.json', products)
    resolve(products[index])
  })
}

//========MODEL DELETE PRODUCT=========
function remove(id){
  return new Promise((resolve, reject) => {
    products = products.filter((p)=> p.id !== id )
    writeDataToFile('./data/products.json', products)
    resolve()
  })
}


module.exports = {
  findModel,
  findProductById,
  create,
  update,
  remove
}