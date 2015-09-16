/**
 * Created by Bharath on 9/5/15.
 */

exports.logoutuser = function(req,res){
    if(req.session.username){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.render('error', {error:'You have been logged out'});
        }
    });
    }
    else
        res.render('error', {error:'You are not logged in'});

};