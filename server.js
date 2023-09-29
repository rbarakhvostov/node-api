const express = require('express')
const mongoose = require('mongoose')
const ProductModel = require('./models/productModel')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/blog', (req, res) => {
  res.send('Blog')
})

app.post('/products', async (req, res) => {
  try {
    const product = await ProductModel.create(req.body)
    res.status(200).json(product)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
})

app.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find()
    res.status(200).json(products)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await ProductModel.findById(id)

    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({message: `Cannot find any product with id ${id}`})
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
})

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params

    const product = await ProductModel.findByIdAndUpdate(id, req.body)

    if (product) {
      const updatedProduct = await ProductModel.findById(id)
      res.status(200).json(updatedProduct)
    } else {
      res.status(404).json({message: `Cannot find any product with id ${id}`})
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
})

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await ProductModel.findByIdAndDelete(id)
    
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({message: `Cannot find any product with id ${id}`})
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
})

// replace <password> with the password
mongoose
  .connect('mongodb+srv://rbarakhvostov:<password>@cluster0.rvxoaq5.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('connected to MongoDB')

    app.listen(3000, () => {
      console.log('app is running on port 3000')
    })
  })
  .catch((err) => console.log(err))
