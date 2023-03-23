const http = require('http')
const {getProducts, getSingleProduct, createProduct, updateProduct,  deleteProduct} = require('./controller/productController')

const server = http.createServer((req, res) => {

  if(req.url === '/api/products' && req.method === 'GET'){

   getProducts(req, res)

  }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET'){
    
    const id = req.url.split('/')[3] // api/product/1
    getSingleProduct(req, res, id)

  }else if(req.url === '/api/products' && req.method === 'POST'){
    createProduct(req, res)
  }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT'){
  const id = req.url.split('/')[3] // api/product/:id
  updateProduct(req, res, id)
  }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE'){
  const id = req.url.split('/')[3] // api/product/:id
  deleteProduct(req, res, id)

  }else{
      res.writeHeader(404, {'Content-Type': 'application/json'})

      res.end(JSON.stringify({message: 'Route Not Found..'}))
  }
})
const PORT = process.env.PORT || 500

server.listen(PORT, () => console.log(`server running on port ${PORT}`))