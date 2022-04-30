"use strict";
const User = require("../model/User");

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    const url = {
      method: "POST",
      path: "/login",
      status: response.err ? 400 : 200,
    };
    return res.status(url.status).json(response);
  },

  create: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    const url = {
      method: "POST",
      path: "/register",
      status: response.err ? 500 : 201,
    };
    return res.status(url.status).json(response);
  },
};

module.exports = {
  process,
};
