//Create web server
const express = require('express');
const app = express();
const port = 3000;
//Create connection to database
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'reddit'
});
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});
//Set view engine to ejs
app.set('view engine', 'ejs');
//Serve static files from static folder
app.use('/static', express.static('static'));
//Use body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//Render main page
app.get('/', (req, res) => {
    res.render('index');
});
//Render new post page
app.get('/newpost', (req, res) => {
    res.render('newpost');
});
//Render new post page
app.get('/newpost', (req, res) => {
    res.render('newpost');
});
//Render new post page
app.post('/newpost', (req, res) => {
    let title = req.body.title;
    let url = req.body.url;
    let sql = `INSERT INTO posts (title, url) VALUES ('${title}', '${url}')`;
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err.toString());
            return;
        }
        res.redirect('/posts');
    });
});
//Render posts
app.get('/posts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err.toString());
            return;
        }
        res.render('posts', { rows });
    });
});
//Render posts
app.get('/posts/:id', (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM posts WHERE id = ${id}`;
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err.toString());
            return;
        }
        res.render('post', { rows });
    });
});
//Render posts