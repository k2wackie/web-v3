"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./ctrl");

router.get("/", ctrl.output.home);
router.get("/create", ctrl.output.create);

router.post("/create", ctrl.process.create);

module.exports = router;
