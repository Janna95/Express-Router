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

app.post('/result', function(req, res) {
    const user = {
            username: req.body.name,
            gender: req.body.gender,
            agree: req.body.agree,
            password: req.body.password,
        }
        users.push(user); 
        console.log(users);
    res.render('result', { title: "Result route is working. The data is saved" })
});

//GET /api/time
app.get('/api/time', (req, res) => {
    let date = new Date();
    res.json(date);
});

//POST  /api/users
app.post('/api/users', (req, res) => {
   res.post(users)
})

// GET /api/users
app.get('/api/users', (req, res) =>{
   res.json(users)
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port} `));