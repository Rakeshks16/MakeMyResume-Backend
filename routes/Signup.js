const express = require('express')
const mongoose = require('mongoose')


const User = require('../models/UserSchema')

const router = express.Router()


router.get('/', async (req, res) => {
  try {
    let users = await User.find().sort('name')
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
  }
})
router.post('/', async (req, res) => {
  try {
      console.log(req.body)
   
    let user = await User.findOne({ email: req.body.email })
    if (user) throw 'email aready exists'

    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin
    })
    

    user = await user.save()
    console.log(user)

    
    const token = user.generateAuthToken() //? values are genrated from uservalidare.js file

    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token') //* Setting this header is extreamly important to access jwt token in client side
      .send({ _id: user._id, name: user.name, email: user.email })

   
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id)
    res.send(user)
  } catch (error) {
    console.log('error occured while deleting a user', error)
  }
})

module.exports = router