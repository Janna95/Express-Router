const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require('moment')

let users = [];

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

/**
 * Creating or sending existing cookies
 */
app.get('/', (req, res) => {

    let cookie = req.cookies.time;
    
    if(cookie === undefined) {
        console.log("Cookies created")
        res.cookie("time", moment().format('LTS'))
    }
    else console.log("Cookies exist " + cookie)
    
    res.send(cookie);
});

/**
 * Renders a page for route "/myroute/:param" param, param query, param header and param cookie
 */
app.get('/myroute/:param', (req, res) => {

    res.cookie('param', "paramCookie", {maxAge:50000});
    let result = {
        "Params.param": req.params.param,
        "Query.param": req.query.param,
        "Header.param": req.get('param'),
        "Cookie param": req.cookies.param,
    };
    res.json(result);

    // console.log(req.params.param);
    // console.log(req.query.param);
    // console.log(req.get('param'));
    // console.log(req.cookies.param) 
})

app.get('/form', function(req, res) {
    res.render('form', {
        title: 'Registration Form',        
    });
});

app.post('/form', function(req, res) {
    const user = {
        username: req.body.name,
        gender: req.body.gender,
        agree: req.body.agree ? true : false,
        password: req.body.password,
    }
    users.push(user); 
    console.log(req.body);
    res.redirect('/result');
});

var resultUsers = [];

app.get('/api/time', (req, res) => {
    let date = new Date();
    res.json(date);
});

app.post('/api/users', (req, res) => {
    let user = {
        username: req.body.username,
        gender: req.body.gender,
        agree: req.body.agree ? true : false,
        password: req.body.password,
    };
   resultUsers.push(user);
   console.log(resultUsers)
   res.end();
});

app.get('/result', (req,res) => {
    
    res.render('result', {
        users: users,
    })
})

app.get('/api/users', (req, res) =>{
   res.json(resultUsers)
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port} `));