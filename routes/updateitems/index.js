/**
 * Created by Bharath on 9/11/15.
 */
exports.updateitems=function(req,res){

    var sess = req.session;
    var id = '\''+req.body.texta+'\'';
    var groups = '\''+req.body.textb+'\'';
    var title = '\''+req.body.textc+'\'';
    var mysql = require('mysql');
    console.log('id is '+id);

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


    if(id=='\'\''&&sess.role=='admin'||groups=='\'\''&&sess.role=='admin'||title=='\'\''&&sess.role=='admin'){
        res.render('feedback', {feedback:'Please provide proper details'});
    }
    else if(sess.username&&sess.role=='admin') {
        connection.query('update product_details set description=' + groups + ',title=' + title + 'where id=' + id, function (err, rows) {
            if (!err) {
                console.log('updated items');
                res.render('feedback', {feedback: 'Details updated successfully'});
            }
            else {
                res.render('feedback', {feedback: 'Unable to update please provide proper details'});


            }
        });
    }

    else{
        res.render('error', {error: 'You are not authorized to perform this operation'});

    }
};