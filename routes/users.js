

/* GET users listing. */
exports.list = function(req, res){
  sess = req.session;

  var fname,lname;

  console.log(req.query.texta);
  console.log(req.query.textb);


  if(typeof req.query.texta=='undefined')
    fname = '\'\%\'';
  else
   fname = '\'\%'+req.query.texta+'\%\'';

  if(typeof req.query.textb=='undefined')
    lname = '\'\%\'';
  else
    lname = '\'\%'+req.query.textb+'\%\'';

  console.log('fname is '+fname);
  console.log('lname is '+lname);
  var mysql      = require('mysql');
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


  if(sess.username&&sess.role=='admin') {
    connection.query('SELECT uname, fname, lname from user_details where fname like '+fname+' and lname like '+lname, function (err, rows) {
      if(err)
        res.render('feedback', {feedback: 'Provide proper search criteria'});
      if (rows.length == 0)
        res.render('feedback', {feedback: 'No Registered users available with given criteria'});
      else if (!err && rows.length > 0) {
        console.log('displaying results');
        var result = {};
        var result1 = [];
        var count = 0;
        //var count1 = 0;
        for (var i = 0; i < rows.length; i++) {

          var uname = rows[i].uname;
          var fname = rows[i].fname;
          var lname = rows[i].lname;

          result1[0] = uname;
          result1[1] = fname;
          result1[2] = lname;

          console.log(result1);
          result[count++] = result1;
          result1 = [];
          //count1=0;

        }

        console.log(result);

        console.log('showing users');

        res.render('viewusers', {data: result});
      }
    });
  }
  else
    res.render('error', {error: 'You are not authorized to perform this operation'});


};
