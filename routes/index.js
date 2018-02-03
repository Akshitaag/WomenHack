var express = require("express");
var paypal = require('paypal-rest-sdk');
var router  = express.Router();
var User=require("../models/user.js");
var Blog=require("../models/blog.js");
var Seeker=require("../models/seeker.js");
var Mentor=require("../models/mentor.js");
var Ngo=require("../models/ngo.js");
var passport=require("passport");
const {requireRole} = require("../server/utils/role");
var fs = require("fs");
var contents = fs.readFileSync("inspired.json");
var data = JSON.parse(contents);
var  methodOverride=require("method-override");
router.use(methodOverride("_method"));
//-------------
//AUTH ROUTES
//-----------
//  REGISTER
router.get("/awareness",function(req,res){
     res.render("awareness.ejs",{data1:data});
});
// mentor details
router.get("/mentordetails/:id",function(req,res){
    res.render("mentordetails.ejs",{id:req.params.id});
});
router.post("/mentordetails/:id",function(req,res){
   // console.log(req.body);
    var id =req.params.id ;
    //console.log(id);
      Mentor.findById(id).exec(function(err,mfound){
       if(err)
       {
           console.log(err);
       }
       else
       {
           // console.log("found ");
            console.log("user");
            //console.log(ufound);
            profession=req.body.profession;
            adhaar=req.body.adhaar;
            contribute=req.body.contribute;
        var newdata={ username :mfound.username, _id:mfound._id,email:mfound.email,phone:mfound.phone,__v:mfound.__v,profession:profession,adhaar:adhaar,contribute:contribute};
         Mentor.updateOne({_id:mfound._id}, newdata, function(err, res) {
            if(err)
            {
                 console.log(err);
            }
            else
            {
                 console.log("updated");
            }
        //      Mentor.findByIdAndUpdate(req.params.id,{$set: newData},function(err,updated)
        // {
        //     if(err)
        //     {
        //         console.log(err);
        //     }
        //     else
        //     {
        //         console.log("here");
        //         console.log(mentor);
                
        //       //  console.log(mentor);
                
        //     }
        // });
        });
     }
    });
});

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
            res.render("mentorProf", {mentor: mentor[0] , id: mentor[0]._id});
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




router.get("/story", function(req, res){
            res.redirect("/blogs");

    });

router.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err)
        {
            console.log(err);
        }
        else
         res.render("blogs", {blogs: blogs});
        });
   
    });

router.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, foundBlog){
        if(err)
        console.log("Error has occured");
        else
        res.redirect("/blogs/"+req.params.id);
    });
});    
    
router.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err)
        {
            console.log("Error has been made");
        }
        else
        {
             res.render("edit", {blog: foundBlog});
        }
    });
});


router.get("/blogs/new", function(req, res){
    res.render("new");
    
});

router.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err)
        {
            console.log("Error has been made! :/ ");
        }
        else
        {
            res.render("show", {blog: foundBlog});
        }
    });
});


router.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err)
        {
            res.redirect("/blogs/new");
        }
        else
        res.redirect("/blogs");
    });
    
});

router.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(!err)
        {
            res.redirect("/blogs");
        }
        else
        {
            console.log("Error occured");
            
        }
        
    });
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
//Paypal routes!
var config = {
  "port" : 3000,
  "api" : {
    "host" : "api.sandbox.paypal.com",
    "port" : "",            
    "client_id" : "AcR0oUd9ThfVSRbKvZyHSiq6Eo0XWAlH8-Vz4elfHdUMbbGmHEX5loJy_hxdhPXL9sSrtkj5XpYji4mM",  // your paypal application client id
    "client_secret" : "EOuz5kkID1QRY88lxQHXDa-4NubvJdKVGbkFeDS10TZ7PpMbwmfMiwmQoMpVVhTGeXXTYrSKWfDwHv2o" // your paypal application secret id
  }
}
 
paypal.configure(config.api);
 
// Page will display after payment has beed transfered successfully
router.get('/success', function(req, res) {
  res.send("Payment transfered successfully.");
});
 
// Page will display when you canceled the transaction 
router.get('/cancel', function(req, res) {
  res.send("Payment canceled successfully.");
});
 
 
router.post('/paynow', function(req, res) {
   // paypal payment configuration.
  var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": "http://localhost:3000/success",
    "cancel_url": "http://localhost:3000/cancel"
  },
  "transactions": [{
    "amount": {
      "total":parseInt(req.body.amount),
      "currency":  req.body.currency
    },
    "description": req.body.description
  }]
};
 
  paypal.payment.create(payment, function (error, payment) {
  if (error) {
    console.log(error);
  } else {
    if(payment.payer.payment_method === 'paypal') {
      req.paymentId = payment.id;
      var redirectUrl;
      console.log(payment);
      for(var i=0; i < payment.links.length; i++) {
        var link = payment.links[i];
        if (link.method === 'REDIRECT') {
          redirectUrl = link.href;
        }
      }
      res.redirect(redirectUrl);
    }
  }
});
});




router.get("/logout",function(req,res){
   req.logout(); 
  // req.flash("success","Logged You Out!!");
   res.redirect("/");
});

module.exports = router;