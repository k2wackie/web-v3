"use strict";

const output = {
  home: (req, res) => {
    res.json({ a: "b" });
  },
  create: (req, res) => {
    res.send("complete");
  },
};

const process = {
  create: async (req, res) => {
    console.log(req, res);

    const url = {
      method: "POST",
      path: "/create",
      status: response.err ? 400 : 200,
    };
    return res.status(url.status).json(response);
  },
};

module.exports = {
  output,
  process,
};
