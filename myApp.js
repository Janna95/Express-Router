const express = require('express');
const app = express();
var bodyParser = require('body-parser')

let users = [];

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
    res.send('<h1>Hello World</h1') 
});

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

app.get('/result', (req,res) => {
    
    res.render('result', {
        users : resultUsers,
    })
})

app.get('/api/time', (req, res) => {
    let date = new Date();
    res.json(date);
});

app.post('/api/users', (req, res) => {
    let user = {
        username: req.body.name,
        gender: req.body.gender,
        agree: req.body.agree ? true : false,
        password: req.body.password,
    };
   resultUsers.push(user);
   res.end();
});

app.get('/api/users', (req, res) =>{
   res.json(resultUsers)
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port} `));