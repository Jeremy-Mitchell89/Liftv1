var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//LANDING PAGE
router.get("/", function(req,res){
    res.render("landing");
});

router.get("/register", function(req,res){
    res.render("register");
});

//Sign up logic
router.post("/register", function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password, function(err,user){
        if(err){
            req.flash("error", err.message)
            return res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success", "Welcome to LiftLog" + user.username)
                res.redirect("/log");
            });
        }
    });
});


router.get("/login", function(req,res){
    res.render("login");
});

//LOGIN logic
router.post("/login", passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
}),function(req,res){
    req.flash("success", "Logged in");
    res.redirect("/user/" + req.user._id);
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});


module.exports = router;