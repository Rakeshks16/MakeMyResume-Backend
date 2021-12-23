const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const signup=require('./routes/Signup')
const login=require('./routes/login')

const dataBaseUrl = 'mongodb://localhost:27017/mmr' 
mongoose
  .connect(dataBaseUrl)
  .then(() => {
    console.log(`connected to ${dataBaseUrl}`)
  })
  .catch((err) => {
    console.log('error encounterd', err)
  })
app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({extended:true}))
app.use('/signup', signup)

app.use('/login', login)
app.get('/',(req,res)=> {
    res.send('working')

})

const PORT = 8000|| process.env.PORT
app.listen(PORT,()=>{
    console.log(`Listening on port${PORT}...`)
})
