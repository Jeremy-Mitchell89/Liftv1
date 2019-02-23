var middlewareOBJ = {};
var Movement = require("../models/movements");
var Log = require("../models/log");
var Move = require("../models/move");
var User = require("../models/user");

middlewareOBJ.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("/login")
    }
}