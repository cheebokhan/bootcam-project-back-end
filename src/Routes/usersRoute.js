const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const asynHandler = require('express-async-handler');
const authMiddleware = require('../middlewares/authMiddleware.js');
const User=require('../Model/User.js');
const generateToken = require('../utils/generateToken');

const usersRoute = express.Router();

//Register
usersRoute.post(
  '/register',
  asynHandler(async (req, res) => {
    const { fullname, username, phonenumber, email, gender, profession, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      throw new Error('User Exist');
    }
    const phonenumberExists = await User.findOne({ phonenumber: phonenumber });
    if (userExists) {
      throw new Error('User Exist');
    }
    const userCreated = await User.create({ fullname, username, phonenumber, email, gender, profession, password });
    res.json({
      _id: userCreated._id,
      fullname: userCreated.fullname,
      username: userCreated.username,
      phonenumber: userCreated.phonenumber,
      email: userCreated.email,
      gender: userCreated.gender,
      profession: userCreated.profession,
      password: userCreated.password,
      token: generateToken(userCreated._id),
    });
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

      res.json({
        _id: user._id,
        fullnam: user.fullname,
        username: user.username,
        phonenumber: user.phonenumber,
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

//update user
usersRoute.put(
  '/update',
  authMiddleware,
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

//Delete user
usersRoute.delete('/:id', (req, res) => {
  res.send('Delete route');
});

//fetch Users
usersRoute.get(
  '/',
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(500);

      throw new Error('No users found at the moment');
    }
  })
);

module.exports = usersRoute;
