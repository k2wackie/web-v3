"use strict";

const db = require("../config/db");
const UserStorage = require("../model/UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }
  async login() {
    const client = this.body;
    console.log("body", this);
    const userID = client.userID;
    const userPW = client.userPW;
    const params = [userID];
    try {
      const user = await UserStorage.getUserInfo(params);
      console.log("sqlData", user);
      if (user) {
        if (user.user_ID === userID && user.user_PW === userPW) {
          return { success: true, chkID: true };
        } else {
          return {
            success: false,
            chkID: true,
            msg: "비밀번호가 틀렸습니다.",
          };
        }
      } else {
        return {
          success: false,
          chkID: false,
          msg: "존재하지 않는 아이디입니다.",
        };
      }
    } catch (err) {
      return { success: false, err };
    }
  }
  async register() {
    const client = this.body;
    const userID = client.userID;
    const userPW = client.userPW;
    const params = [userID, userPW];
    try {
      const response = await UserStorage.register(params);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = User;
