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
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.post("/add", (req, res) => {
  const sql = "INSERT INTO web_v3.bulletin VALUES (null, ?, ?, now());";
  const author = req.body.author;
  const content = req.body.content;
  const params = [author, content];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/edit", (req, res) => {
  const sql = "UPDATE web_v3.bulletin SET author=?, content=? WHERE id=?;";
  const author = req.body.author;
  const content = req.body.content;
  const id = req.body.id;
  const params = [author, content, id];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "UPDATE web_v3.bulletin SET is_deleted = 1 WHERE id = ?;";
  const id = req.params.id;
  const params = [id];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = app;
