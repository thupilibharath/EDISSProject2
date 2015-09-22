/**
 * Created by Bharath on 9/10/15.
 */

exports.register = function(req,res){
    var body = req.body;
    var data = body.number;
    //console.log('Received Data is'+ data);
    data = '';
    var squel = require("squel");
    var mysql      = require('mysql');

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


    //Check if user already exists

    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'Pop123465.',
        database : 'Project2'
    });

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting database ... \n\n");
        }
    });


    connection.query('select * from user_details where uname = \''+uname+'\'', function(err, rows) {
        var exists = false;
        if(!err){
            console.log('No error');
        }
        if(!err&&rows.length>0)
            exists=true;

        else if(!err&&exists==false&&rows.length==0){
            //Create SQL query;
            var ins = squel.insert();
            ins.into('user_details').set('email',email).set('fname',fname).set('lname',lname).set('address',address)
                .set('city',city).set('state',state).set('zip',zip).set('uname', uname).set('pwd',pwd).set('role','normal');
            console.log(ins.toString());

            //Connect to Database

            var connection1 = mysql.createConnection({
                host     : '127.0.0.1',
                user     : 'root',
                password : 'Pop123465.',
                database : 'Project2'
            });

            connection1.connect(function(err){
                if(!err) {
                    console.log("Database is connected ... \n\n");
                } else {
                    console.log("Error connecting database ... \n\n");
                }
            });


            connection1.query(ins.toString(), function(err, rows) {
                if(!err){
                    console.log('Insert Success')
                }
                else
                    console.log('Error while performing Insert');
            });

            res.render('error', {error:'Registration was  successful  !!'});

            connection1.end();

        }
        if(exists==true) {
            console.log('User Already Exists');
            res.render('error', {error:'Profile with the given username alreay exists'});
        }
        else
            console.log('Error while performing search for existance of user'+err);
    });

    connection.end();








        //res.render('responsesuccess');
}