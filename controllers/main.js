const e = require("express");
const { request } = require("express");
const httpStatus = require("http-status-codes");
const { add } = require("nodemon/lib/rules");
const db = require("../middleware/database");
const pool = new db();

class main {
    /* main page */
    async main(req, res) {
        try {
            let sess = req.session.user_id;
            console.log(sess);

            let book_info = await pool.query('select * from book')
            
            return res.render('home/main', {book_info: book_info, sess: sess});
        } catch (error) {
            console.log(error)
        }
    }

    async search(req, res) {
        try {
            let sess = req.session.user_id;
            let book_name = req.body.book_name;

            let book_info = await pool.query('select * from book where book_name like ?', ['%' + book_name + '%'])

            return res.render('home/main', {book_info: book_info, sess: sess});
        } catch (error) {
            
        }
    }
    
}

module.exports = main;