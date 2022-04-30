const express = require("express");
const router = express.Router();
const db = require("../config/db");
const userCtrl = require("./userCtrl");
const bulletinCtrl = require("./bulletinCtrl");

router.get("/api/bulletin/read", bulletinCtrl.process.read);

router.post("/api/bulletin/create", bulletinCtrl.process.create);

router.post("/api/bulletin/update", bulletinCtrl.process.update);

router.delete("/api/bulletin/delete/:id", bulletinCtrl.process.delete);
// router.delete("/api/bulletin/delete/:id", (req, res) => {
//   console.log(req);
//   const sql = "UPDATE web_v3.bulletin SET is_deleted = 1 WHERE id = ?;";
//   const id = req.params.id;
//   const params = [id];
//   db.query(sql, params, (err, data, fields) => {
//     res.send(data);
//   });
// });

router.post("/api/login", userCtrl.process.login);

router.post("/api/user_register", userCtrl.process.create);

module.exports = router;
