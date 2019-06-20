var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var {Books} = require('./models/book');
var {Users} = require('./models/user');
var {mongoose} = require('./db/mongoose');


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.post('/login', (req,res) =>{
    var username = req.body.username;
    var password = req.body.password;
    console.log("Username:",username + " password:",password);
    if(username === "admin" && password === "admin"){
        console.log("Match");
    }
    Users.findOne({
        username:req.body.username
    }, function(err,user){
        if (err) {
            res.code = "400";
            res.value = "The email and password you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            res.sendStatus(400).end(); 
        } else if(user && user.password == req.body.password){
            res.code = "200";
            res.value = user;
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            res.sendStatus(200).end();
        }
    })
})

app.get('/home',(req,res)=>{
    Books.find().then((books)=>{
        res.code = "200";
        res.send({books});
    },(err) => {
        res.code = "400";
        res.send("Bad Request");
    })
})

app.post('/create',(req,res)=>{
    var book = new Books({
        bookID : req.body.bookID,
        title : req.body.title,
        author : req.body.author
    });

    book.save().then((book)=>{
        console.log("Book created : ",book);
        res.sendStatus(200).end();
    },(err)=>{
        console.log("Error Creating Book");
        res.sendStatus(400).end();
    })
})

app.delete('/delete/:id',(req,res)=>{
    console.log("Inside Delete Request");
    console.log("Book to Delete : ", req.params.id);

    Books.findOneAndDelete({
        bookID : req.params.id
    }).then((book) =>{
        console.log("Book Deleted Successfully",book);
        res.sendStatus(200).end();
    },(err) =>{
        console.log("Unable to delete book");
        res.sendStatus(400).end();
    })
})

app.listen(3001,()=>{
    console.log("Server Listening on port 3001");
})