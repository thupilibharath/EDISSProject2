/**
 * Created by Bharath on 9/11/15.
 */
exports.home = function(req,res){

    sess = req.session;
    if(sess.username &&  sess.role=='admin')
        res.render('admin');
    else if(sess.username)
        res.render('ruserstorehome');
    else
        res.render('urusersstorehome');
};