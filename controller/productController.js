const Product = require('../model/productModel')
const { getPostData } = require('../utils')

//========GETS ALL PRODUCTS=========
//========ROUTE api/products========
async function getProducts(req, res){
  try{
    const products = await Product.findModel()

     res.writeHeader(200, {'Content-Type': 'application/json'})
     res.end(JSON.stringify(products))
  }catch(error){
  console.log(error)
  }
}

//=========GETS A SINGLE PRODUCT========
//========ROUTE api/product/:id ========
async function getSingleProduct(req, res, id){
try{
  const product = await Product.findProductById(id)

  if(!product){
       res.writeHeader(404, {'Content-Type': 'application/json'})
       res.end(JSON.stringify({message: 'Product Not Found'}))
  }else{
       res.writeHeader(200, {'Content-Type': 'application/json'})
       res.end(JSON.stringify(product))
  }
    }catch(error){
      console.log(error)
    }
}


//========CREATE A PRODUCTS=========
//========POST api/products========
async function createProduct(req, res){
  try{
    const body = await getPostData(req)
    const {title, price, productCode, inStock} = JSON.parse(body)
    const product = {
    title,
    price,
    productCode,
    inStock
    }
    const newProduct = await Product.create(product)

    res.writeHead(201, {'Content-Type': 'application/json'})
    return res.end(JSON.stringify(newProduct))

  }catch(error){
  console.log(error)
  }
}


//========UPDATE A  PRODUCTS=========
//========PUT api/products:id========
async function updateProduct(req, res, id){
  try{
    const product = await Product.findProductById(id)

     if(!product){
       res.writeHeader(404, {'Content-Type': 'application/json'})
       res.end(JSON.stringify({message: 'Product Not Found'}))
  }else{

    const body = await getPostData(req)
    const {title, price, productCode, inStock} = JSON.parse(body)

    const productData = {
    title: title || product.title,
    price: price || product.price,
    productCode: productCode || product.productCode,
    inStock: inStock || product.inStock
    }
    const updProduct = await Product.update(id, productData)

    res.writeHead(200, {'Content-Type': 'application/json'})
    return res.end(JSON.stringify(updProduct))

  }


  }catch(error){
  console.log(error)
  }
}


//========DELETE PRODUCTS=========
//========ROUTE DELETE api/products========
async function deleteProduct(req, res, id){
try{
  const product = await Product.findProductById(id)

  if(!product){
       res.writeHeader(404, {'Content-Type': 'application/json'})
       res.end(JSON.stringify({message: 'Product Not Found'}))
  }else{
       await Product.remove(id)
       res.writeHeader(200, {'Content-Type': 'application/json'})
       res.end(JSON.stringify({message: `Product ${id} removed`}))
  }
    }catch(error){
      console.log(error)
    }
}





module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
}