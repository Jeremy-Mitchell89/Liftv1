var express = require("express");
var router=express.Router({mergeParams:true});
var Log = require("../models/log");
var Move = require("../models/move");
var User = require("../models/user");

//MOVE NEW
router.get("/new", function(req,res){
    Log.findById(req.params.id, function(err,log){
        if(err){
            console.log(err);
        }else{
                res.render("move/new", {log:log});
        }
    });
});

//MOVE CREATE
router.post("/", function(req,res){
    Log.findById(req.params.id, function(err,log){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            var name = req.body.name;
            var weight = req.body.weight;
            var reps = req.body.reps;
            var newMove = {movement:name,weight:weight,reps:reps};
            Move.create(newMove,function(err,newMove){
                if(err){
                    console.log(err);
                }else{
                    log.move.push(newMove);
                    log.save();
                    console.log(newMove);
                    res.redirect("/log/" + req.params.id);
                }
            });
        }
    });
});
//MOVE EDIT
router.get("/:move_id/edit", function(req,res){
    Move.findById(req.params.move_id,function(err,foundMove){
        if(err){
            res.redirect("back");
        }else{
            res.render("move/edit", {log_id:req.params.id, move:foundMove});
        }
    });
});
//MOVE UPDATE
router.put("/:move_id",function(req,res){
    Move.findByIdAndUpdate(req.params.move_id, req.body,function(err,updatedMove){
        if(err){
            res.redirect("back");
        }else{
            console.log(req.params.move_id);
            console.log(req.body);
            res.redirect("/log/" + req.params.id);
        }
    });
});
//MOVE DESTROY
router.post("/:move_id", function(req,res){
    Move.findByIdAndRemove(req.params.move_id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/log/" + req.params.id);
        }
    });
});

module.exports = router;