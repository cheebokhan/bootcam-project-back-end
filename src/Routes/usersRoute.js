const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const asynHandler = require('express-async-handler');
const authMiddleware = require('../middlewares/authMiddleware');
const User=require('../Model/User.js');
const generateToken = require('../utils/generateToken');

const usersRoute = express.Router();

//Register
usersRoute.post(
  '/register',
  asynHandler(async (req, res) => {
    
    //ds=estruct ibjet 
    const { fullname, username, email, password,phone, gender, profession } = req.body;
    console.log("data here");

     //get user by email
    const userExists = await User.findOne({ email: email });

    //check if the user email is  already registered
    if (userExists) {
      throw new Error('User Exist');
    }

    //get user by username
    const usernameExists = await User.findOne({ username: username });

    //if username is  already Exist then throw an error user exist 
    if (userExists) {
      throw new Error('User Exist');
    }

    let userCreated = null;
    
    try {
     //create user 
      var usercreatetest = await User.create({ fullname, username, email,password, phone, gender, profession });
      userCreated= usercreatetest;
    } catch (error) {
      debugger;
      throw new Error('User Creation error');
    }
   
    //return empty response with status code 200
    res.json("singup successfuly");
  })
);

//Login
usersRoute.post(
  '/login',
  asynHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatch(password))) {
      //set status code
      res.status(200);
      console.log("hereh");

      res.json({
        _id: user._id,
        fullnam: user.fullname,
        username: user.username,
        phone: user.phone,
        email: user.email,
        gender: user.gender,
        profession: user.profession,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid credentials');
    }
  })
);

//this error come from every signup and login api

//update user
usersRoute.put(
  '/update',
  expressAsyncHandler(async (req, res) => {
    
    //Find the login user by ID
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password || user.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
      });
    }
  })
);

usersRoute.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {

    // const token = localStorage.getItem('token');
   
    //Find the login user by ID
    const user = await User.findById(req.params.id);

    res.json({
      username:user.username ,
      email:user.email ,
        password:user.password 
      })


    })
);


//Delete user
usersRoute.delete('/:id', (req, res) => {
  res.send('Delete route');
});

//fetch Users
usersRoute.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});

    if (users) {
      res.status(200);
      res.json(users);
    } else {
      res.status(500);

      throw new Error('No users found at the moment');
    }
  })
);

module.exports = usersRoute;
