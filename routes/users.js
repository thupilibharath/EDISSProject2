

/* GET users listing. */
exports.list = function(req, res){
  sess = req.session;


  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
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
    connection.query('SELECT uname, fname, lname from user_details', function (err, rows) {
      if (rows.length == 0)
        res.render('feedback', {feedback: 'No Registered users available'});
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
