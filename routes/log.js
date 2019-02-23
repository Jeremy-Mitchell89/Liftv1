var express = require("express");
var router = express.Router();
var Log = require("../models/log")
var User = require("../models/user");

//LOG INDEX ROUTE
router.get("/", function(req,res){
    Log.find({}, function(err, allWorkouts){
        if(err){
            console.log(err)
        }else{
            res.render("log/index", {log:allWorkouts, currentUser:req.user});
        }
    })
});

//LOG NEW ROUTE
router.get("/new", function(req,res){
    res.render("log/new")
})

//LOG CREATE ROUTE
router.post("/", function(req,res){
    var title = req.body.title;
    var date = req.body.date;
    var notes = req.body.notes;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newLog = {title:title,date:date,notes:notes, author:author};
    //console.log(req.body)
    Log.create(newLog,function(err,newLog){
        if(err){
            console.log(err)
        }else{
            console.log(newLog, newLog.author.username)
            res.redirect("/log/" + newLog._id)
        }
    })
    
})
//LOG SHOW ROUTE
router.get("/:id", function(req,res){
    Log.findById(req.params.id).populate("move").exec(function(err,foundLog){
        if(err){
            console.log(err)
        }else{
            res.render("log/show", {workout:foundLog})
        }
    })
})


//LOG EDIT
router.get("/:id/edit", function(req,res){
    Log.findById(req.params.id, function(err,foundWorkout){
        if(err){
            console.log(err)
        }else{
            res.render("log/edit",{workout:foundWorkout})
        }
    })
})

//LOG UPDATE
router.put("/:id", function(req,res){
    Log.findByIdAndUpdate(req.params.id,req.body.workout,function(err,updatedLog){
        if(err){
            res.redirect("/log")
        }else{
            res.redirect("/log/" + req.params.id)
        }
    })
})

//LOG DESTROY ROUTE
router.delete("/:id", function(req,res){
    Log.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/log")
        }else{
            res.redirect("/log")
        }
    })
})

module.exports = router