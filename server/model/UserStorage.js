"use strict";
const db = require("../config/db");

class UserStorage {
  static getUserInfo(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM web_v3.user_data WHERE user_ID = ?;";
      db.query(query, userInfo, (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]);
      });
    });
  }

  static async register(userInfo) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO web_v3.user_data (user_ID, user_PW, in_date) VALUES (?, ?, now());";
      db.query(query, userInfo, (err) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }
}

module.exports = UserStorage;
