/**
 * Created by Bharath on 9/10/15.
 */
exports.search = function(req,res){
    sess = req.session;
    console.log('Remaining Time'+sess.cookie.maxAge);

    console.log(req.query.searchtexta);
    //if(sess.username)
    //res.render('searchitems',{id:'1',name:'Fan', desc:'Ceiling Fan'})
    //
    // else

    var id = req.query.searchtexta;
    var categories = req.query.searchtextb;
    var title = req.query.searchtextc;

    console.log(id);

    if(typeof id=='undefined')
        id='\'\%\'';
    else
        id='\'\%'+id+'\%\'';
    if(typeof categories=='undefined')
        categories='\'\%\'';
    else
        categories='\'\%'+categories+'\%\'';
    if(typeof title=='undefined')
        title='\'\%\'';
    else
        title='\'\%'+title+'\%\'';



    console.log(id+categories+title);
    var mysql      = require('mysql');
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
            console.log("Error connecting database ... \n\n");
        }
    });


    connection.query('SELECT id, ASIN, title, groups from product_details where id like '+id+' and categories like '+categories+' and title like '+title+' order by id', function(err, rows) {
        if (rows.length == 0)
            res.render('feedback',{feedback:'No items available that match search criteria'});
        else if(!err && rows.length > 0){
            console.log('displaying results');
            var result = {};
            var result1 = [];
            var count =0;
            var count1 = 0;
            for(var i=0;i<rows.length;i++){

                var id = rows[i].id;
                var ASIN = rows[i].ASIN;
                var title = rows[i].title;
                var groups = rows[i].groups;

                console.log(id+ASIN+title+groups);
                result1[0]=id;
                result1[1] = ASIN;
                result1[2] =title;
                result1[3] = groups;

                console.log(result1);
                result[count++]=result1;
                result1=[];
                //count1=0;

            }

            console.log(result);

            console.log(sess.username);

            if(sess.username){
                res.render('searchitems',{data:result});}
            else
                res.render('urusearchitems',{data:result});
        }
    });

        };