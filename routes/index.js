var express = require("express");
var router  = express.Router();
var User=require("../models/user.js");
var passport=require("passport");
const {requireRole} = require("../server/utils/role");
//-------------
//AUTH ROUTES
//-----------
//  REGISTER
router.get("/register",function(req,res){
    res.render("register.ejs");
});
router.post("/register", function(req, res){
    console.log(req.body.role);
    //var role =String(req.body.role);
    var role;
     if(req.body.role.seeker!=undefined)
            {
                role="seeker";
            }
            else if(req.body.role.mentor!=undefined)
            {
                role="mentor";
            }
            else 
            {
                role="ngo";
            }
    var newUser = new User({email: req.body.email,username: req.body.username,role:role});
    console.log(newUser.role);
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //req.flash("error",err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            //req.flash("success","Welcome to YelpCamp "+ req.body.username);
            if(req.body.role.seeker!=undefined)
            {
                res.send("heya seeker here");
            }
            else if(req.body.role.mentor!=undefined)
            {
                res.send("heya agro here");
            }
            else 
            {
                res.send("heya ngo here");
            }
          // res.redirect("/login"); 
        });
    });
});

//LOGIN 
router.get("/login",function(req,res){
    res.render("login");
});
router.get("/seeker",function(req,res){
     res.send("heya seeker here");
});
router.get("/mentor",function(req,res){
     res.send("heya agro here");
});
router.post("/login", passport.authenticate("local", 
    {
        failureRedirect: "/login"
    }), function(req, res){
            console.log(req.user.role );
             if (req.user && req.user.role == "seeker")
                 res.redirect('/seeker');
             else
                res.redirect("/mentor");
        
});
// router.post("/login",requireRole("mentor"), passport.authenticate("local", 
//     {
//         failureRedirect: "/login"
//     }),function(req, res){
//             console.log(res.user);
//             res.redirect('/');
        

// });
// router.post('/login', passport.authenticate("local", function(err, user ,res){
//     var error = err;
//     if (error) return res.status(401).json(error);
//     if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});

//     else {
//         if(requireRole("seeker")){
//             res.redirect('/seeker');
//         }
//         else if(requireRole("mentor")){
//             res.redirect('/seeker');
//         }
//         else{
//             res.redirect('/ngo');
//         }
//     }
// }));
//LOGOUT
router.get("/logout",function(req,res){
   req.logout(); 
  // req.flash("success","Logged You Out!!");
   res.redirect("/");
});

module.exports = router;