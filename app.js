

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./routes');
var users = require('./routes/users');
var loginsuccess = require('./routes/login');
var updatedetails = require('./routes/updatedetails');
var register = require('./routes/register');
var home = require('./routes/home');
var updateitems = require('./routes/updateitems');
var search = require('./routes/search');
var logout = require('./routes/logout');
var http = require('http');
var path = require('path');


var app = express();
var count = 0;
var sess;

// Set app's environments
app.set('port', process.env.PORT || 7001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({key: 'express.sid' // use unique ids for session IDs
,secret: 'xyz123abC', resave: true, saveUninitialized: true, cookie:{expires:new Date(new Date().getMinutes()+240), maxAge:900000}
     }));


//Routes
app.get('/', routes.index);
app.get('/registerUser', routes.index);
app.post('/registerUser', register.register);
app.get('/login', function(req,res){
   res.render('login');
});
app.post('/login', loginsuccess.loginsuccess);
app.get('/updateInfo',updatedetails.displaydetails);
app.post('/updateInfo', updatedetails.updatedetails);
app.get('/getProducts', search.search);
app.get('/home', home.home);
app.post('/modifyProduct', updateitems.updateitems);
app.get('/modifyProduct',function(req,res){
    var sess = req.session;
    if(sess.username&&sess.role=='admin') {
        res.render('modifyproducts');
    }
    else
    res.render('error', {error:'You are not authorized to perform this operation'});
});

app.get('/viewUsers', users.list);
app.get('/logout', logout.logoutuser);
app.post('/logout', logout.logoutuser);


//Start Server
var serve = http.createServer(app);
serve.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

