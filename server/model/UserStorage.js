"use strict";
const db = require("../config/db");

class UserStorage {
  static getUserInfo(params) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM web_v3.user_data WHERE user_ID = ?;";
      db.query(query, params, (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]);
      });
    });
  }

  static async register(params) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO web_v3.user_data (user_ID, user_PW, in_date) VALUES (?, ?, now());";
      db.query(query, params, (err) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }
}

module.exports = UserStorage;
