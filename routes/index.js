var express = require("express");
var router  = express.Router();
var User=require("../models/user.js");
var Seeker=require("../models/seeker.js");
var Mentor=require("../models/mentor.js");
var Ngo=require("../models/ngo.js");
var passport=require("passport");
const {requireRole} = require("../server/utils/role");
//-------------
//AUTH ROUTES
//-----------
//  REGISTER
router.get("/register",function(req,res){
    res.render("register.ejs");
});
// router.post("/register", function(req, res){
//     console.log(req.body.role);
//      var newUser = new User({email: req.body.email,username:req.body.username,pincode: req.body.pin,role:role,phone:req.body.phone});
//     //var role =String(req.body.role);
//     var role;
//      if(req.body.role.seeker!=undefined)
//             {
//                 role="seeker";
//                 var newSeeker = new Seeker({email: req.body.email,pincode: req.body.pin,phone:req.body.phone,username:req.body.username});
//                 Seeker.create( newSeeker ,function(err,camp){});
//             }
//             else if(req.body.role.mentor!=undefined)
//             {
//                 role="mentor";
//             }
//             else 
//             {
//                 role="ngo";
//             }
   
//     console.log(newUser.role);
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             //req.flash("error",err.message);
//             console.log(err);
//             return res.redirect("/register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             //req.flash("success","Welcome to YelpCamp "+ req.body.username);
//             if(req.body.role.seeker!=undefined)
//             {
//                 res.send("heya seeker here");
//             }
//             else if(req.body.role.mentor!=undefined)
//             {
//                 res.send("heya agro here");
//             }
//             else 
//             {
//                 res.send("heya ngo here");
//             }
//           // res.redirect("/login"); 
//         });
//     });
// });

router.post("/register", function(req, res){
    //console.log(req.body.role);
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
            var newUser = new User({email: req.body.email,username: req.body.username,role:role,phone:req.body.phone});
    
   // console.log(newUser.role);
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //req.flash("error",err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            //req.flash("success","Welcome to YelpCamp "+ req.body.username);
            console.log("user is");
            console.log(user);
              var username={
            id:user._id,
            username:user.username
            };
            if(req.body.role.seeker!=undefined)
            {
                 var seeker = new Seeker({email: user.email,phone:user.phone,username:username});
                seeker.save(function(err){
            if(!err){
                console.log("Saved");
            res.redirect("/login");
            }
            else
            {
                console.log(err);
            }
            
             }); //  res.redirect("/login");
            }
            else if(req.body.role.mentor!=undefined)
            {
                 var mentor = new Mentor({email: user.email,phone:user.phone,username:username});
                mentor.save(function(err){
            if(!err){
                console.log("Saved");
            res.redirect("/login");
            }
            else
            {
                console.log(err);
            }
            
             });
            }
            else 
            {
                var ngo = new Ngo({email: user.email,phone:user.phone,username:username});
                ngo.save(function(err){
            if(!err){
                console.log("Saved");
            res.redirect("/login");
            }
            else
            {
                console.log(err);
            }
            
             });
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
       console.log(req.user);
       Seeker.find({"email":req.user.email},function(err,allseekers)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log("here");
            console.log(allseekers);
            res.render("seekerProf", {seeker: allseekers[0]});
       }
   });
      

});
router.get("/mentor",function(req,res){
     //console.log(req.user);
      console.log(req.user);
       Mentor.find({"email":req.user.email},function(err,mentor)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log("here");
            console.log(mentor);
            res.render("mentorProf", {mentor: mentor[0]});
       }
   });
   // res.render("agroProf", {mentor: req.user});
});
router.get("/ngo", function(req, res){
     Ngo.find({"email":req.user.email},function(err,ngo)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log("here");
            console.log(ngo);
            res.render("ngoProf", {ngo: ngo[0]});
       }
   });
    //res.render("buyerProf", {buyer: req.user});
});
router.post("/login", passport.authenticate("local", 
    {
        failureRedirect: "/login"
    }), function(req, res){
            console.log("success");
             // console.log(req.user);
             if (req.user){
                if(req.user.role == "seeker")
                 res.redirect('/seeker');
                else if(req.user.role == "mentor")
                res.redirect("/mentor");
                else if(req.user.role == "ngo")
                    res.redirect("/ngo");
            }
        
});

//LOGIN 
// router.get("/login",function(req,res){
//     res.render("login");
// });
// router.get("/seeker",function(req,res){
//      res.send("heya seeker here");
// });
// router.get("/mentor",function(req,res){
//      res.send("heya agro here");
// });
// router.post("/login", passport.authenticate("local", 
//     {
//         failureRedirect: "/login"
//     }), function(req, res){
//             console.log(req.user.role );
//              if (req.user && req.user.role == "seeker")
//                  res.redirect('/seeker');
//              else
//                 res.redirect("/mentor");
        
// });
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