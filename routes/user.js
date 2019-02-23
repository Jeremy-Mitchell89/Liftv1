var express = require("express");
var router = express.Router();
var User = require("../models/user");


//USER INDEX
router.get("/", function(req,res){
    res.redirect("../register");
});

//USER SHOW
router.get("/:id", function(req,res){
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            console.log(foundUser);
            res.render("user/show", {user:foundUser});
        }
    });
});

//USER UPDATE
router.put("/:id", function(req,res){
    User.findByIdAndUpdate(req.params.id, req.body, function(err, updatedUser){
        if(err){
            console.log(err);
        }else{
            console.log(updatedUser);
            console.log(req.body);
            res.redirect("/user/" + req.params.id);
        }
    });
});

module.exports = router;