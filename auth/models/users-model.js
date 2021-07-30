'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'admin', enum: ['guest', 'author', 'editor', 'admin'] },
});

user.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const roles = {
  guest: ['read'],
  author: ['read', 'create'],
  editor: ['read', 'update', 'delete'],
  admin: ['read', 'create', 'update', 'delete'],
};

user.methods.can = function (capability) {
  return roles[this.role].includes(capability);
};

user.methods.generateToken = function () {
  let tokenObject = {
    username: this.username,
    role: this.role,
    permissions: roles[this.role],
  };
  let options = {
    expiresIn: 600,
  };
  let token = jwt.sign(tokenObject, process.env.SECRET, options);
  return token;
};

user.statics.validateBasic = async function (username, password) {
  let user = await this.findOne({ username: username });
  let isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    return user;
  } else {
    return undefined;
  }
};

user.statics.authenticateWithToken = function (token) {
  const parsedToken = jwt.verify(token, process.env.SECRET);
  let user = this.findOne({ username: parsedToken.username });
  return user;
};

module.exports = mongoose.model('user', user);
