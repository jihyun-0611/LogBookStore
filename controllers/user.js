const { promiseImpl } = require("ejs");
const e = require("express");
const { request } = require("express");
const httpStatus = require("http-status-codes");
const { add } = require("nodemon/lib/rules");
const db = require("../middleware/database");
const pool = new db();

class user {
  /* Sign-up */
  async signup(req, res) {
    try {
      const user_id = req.body.user_id;
      const user_pw = req.body.user_pw;
      const user_name = req.body.user_name;

      await pool.query(
        "insert into user(user_id, user_pw, user_name) values(?, ?, ?)",
        [user_id, user_pw, user_name]
      );
      // for (let allergy of allergy_name) {
      //     await pool.query('insert into allergy (user_id, allergy_name) values (?, ?)', [user_id, allergy])
      // }

      return res.render("user/login");
    } catch (error) {
      return res.send(
        '<script type="text/javascript">alert("중복된 회원이 존재합니다.");location.href="/signup";</script>'
      );
    }
  }

  /* Sign-up page */
  async signupPage(req, res) {
    try {
      let sess = req.session.user_id;

      return res.render("user/signup", { sess: sess });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /* Log-in */
  async login(req, res) {
    try {
      const user_id = req.body.user_id;
      const user_pw = req.body.user_pw;

      const login = await pool.query(
        "select * from user where user_id = ? AND user_pw = ?",
        [user_id, user_pw]
      );

      console.log(login);

      req.session.user_id = login[0].user_id;
      let sess = req.session.user_id;
      console.log(sess);

      if (login[0].user_id == user_id && login[0].user_pw == user_pw) {
        return res.redirect("/");
      }
    } catch (error) {
      console.error(error);
      // return res.status(500).json(error);
      return res.send(
        '<script type="text/javascript">alert("회원 정보가 일치하지 않습니다.");location.href="/user/login";</script>'
      );
    }
  }

  /* Log-in page */
  async loginPage(req, res) {
    try {
      return res.render("user/login");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /* logout */
  async logout(req, res) {
    try {
      req.session.destroy(function () {
        req.session;
      });

      return res.send(
        '<script type="text/javascript">alert("로그아웃 되셨습니다.");location.href="/user/login";</script>'
      );
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = user;
