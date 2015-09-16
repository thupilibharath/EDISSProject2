/**
 * Created by Bharath on 9/4/15.
 */

exports.updatedetails = function(req, res){

    //var data = body.number;
    //console.log('Received Data is'+ data);
    sess = req.session;
    data = '';
    var squel = require("squel");
    var mysql = require('mysql');

    var email = req.body.email;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var address = req.body.address1;
    var city = req.body.city;
    var state = req.body.statel;
    var zip = req.body.zip;
    var uname = req.body.uname;
    var pwd = req.body.pwd;

    data = data+' '+email+' '+fname+' '+lname+' '+address+' '+city+' '+state+' '+zip+' '+uname+' '+pwd;
    //console.log(data);

    var connection = mysql.createConnection({
        host     : 'edissproject2.crbxasmdgbrq.us-east-1.rds.amazonaws.com',
        user     : 'root',
        password : 'Pop123465.',
        database : 'Project2'
    });


    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting to database ... \n\n");
        }
    });

    //Prepare update statement

    if(!sess.username){
        console.log('Unauthorized user');
        res.render('error', {error:'Session not available!! Please login to update your information'});
    }

    else {
        var upd = squel.update();
        upd.table('user_details').set('email', email).set('fname', fname).set('lname', lname).set('address', address)
            .set('city', city).set('state', state).set('zip', zip).set('uname', uname).set('pwd', pwd).set('role', 'normal').where('uname =' + '\'' + sess.username + '\'');
        console.log(upd.toString());

        connection.query(upd.toString(), function(err, rows) {
            if(!err){
                console.log('Update Success')
                res.render('feedback', {feedback:'Your information is updated'});
            }
            else
                console.log('Error while performing Insert');
        });


    }

    connection.end();
    sess.username = uname;

};


exports.displaydetails = function(req,res){

    sess = req.session;
    data = '';
    var squel = require("squel");
    var mysql = require('mysql');


   // data = data+' '+email+' '+fname+' '+lname+' '+address+' '+city+' '+state+' '+zip+' '+uname+' '+pwd;
    //console.log(data);

    var connection = mysql.createConnection({
        host     : 'edissproject2.crbxasmdgbrq.us-east-1.rds.amazonaws.com',
        user     : 'root',
        password : 'Pop123465.',
        database : 'Project2'
    });

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting to database ... \n\n");
        }
    });

    //Prepare update statement

    if(!sess.username){
        console.log('Unauthorized user');
        res.render('error', {error:'Session not available!! Please login to update your information'});
    }

    else {
        var temp = '\''+sess.username+'\'';
        connection.query('select email, fname, lname, address, city, state, zip, uname, pwd from user_details where uname = '+temp, function(err, rows) {
            if(!err){
                var email = rows[0].email;
                var fname = rows[0].fname;
                var lname = rows[0].lname;
                var address = rows[0].address;
                var city = rows[0].city;
                var state = rows[0].state;
                var zip = rows[0].zip;
                var uname = rows[0].uname;
                var pwd = rows[0].pwd;

                console.log('Fetching details Success')
                console.log(address);
                res.render('updatedetails', {email:email,fname:fname, lname:lname, address:address,city:city, state:state, zip:zip,uname:uname, pwd:pwd});
            }
            else
                console.log('Error while fetching existing records');
        });


    }

    connection.end();


};