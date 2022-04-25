const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./config/db");
const router = express.Router();

const app = express();
dotenv.config({
  path: path.join(__dirname, ".env"),
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  db.query(
    "SELECT * FROM web_v3.bulletin WHERE is_deleted=0;",
    (err, data, fields) => {
      res.send(data);
    }
  );
});

app.post("/add", (req, res) => {
  const sql =
    "INSERT INTO web_v3.bulletin (author, content, in_date) VALUES (?, ?, now());";
  const author = req.body.author;
  const content = req.body.content;
  const params = [author, content];
  db.query(sql, params, (err, data, fields) => {
    res.send(data);
  });
});

app.post("/edit", (req, res) => {
  const sql = "UPDATE web_v3.bulletin SET author=?, content=? WHERE id=?;";
  const author = req.body.author;
  const content = req.body.content;
  const id = req.body.id;
  const params = [author, content, id];
  db.query(sql, params, (err, data, fields) => {
    res.send(data);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "UPDATE web_v3.bulletin SET is_deleted = 1 WHERE id = ?;";
  const id = req.params.id;
  const params = [id];
  db.query(sql, params, (err, data, fields) => {
    res.send(data);
  });
});

app.post("/api/login", (req, res) => {
  const sql = "SELECT * FROM web_v3.user_data WHERE user_ID = ?;";
  const userID = req.body.userID;
  const userPW = req.body.userPW;
  const params = [userID];
  db.query(sql, params, (err, data, fields) => {
    console.log(data[0]);
    if (err) {
      res.send(err);
      return;
    }
    if (data[0]) {
      if (data[0].user_ID === userID && data[0].user_PW === userPW) {
        res.send({ success: true, chkID: true });
      } else {
        res.send({
          success: false,
          chkID: true,
          msg: "비밀번호가 틀렸습니다.",
        });
      }
    } else {
      res.send({
        success: false,
        chkID: false,
        msg: "존재하지 않는 아이디입니다.",
      });
    }
  });
});

app.post("/api/user_register", (req, res) => {
  const sql =
    "INSERT INTO web_v3.user_data (user_ID, user_PW, in_date) VALUES (?, ?, now());";
  const userID = req.body.userID;
  const userPW = req.body.userPW;
  const params = [userID, userPW];
  db.query(sql, params, (err, data, fields) => {
    res.send(data);
  });
});

module.exports = app;
