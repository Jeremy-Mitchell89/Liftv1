var express = require("express");
var router = express.Router();
var Movement = require("../models/movements");
var User = require("../models/user");

//MOVEMENT INDEX
router.get("/", function(req,res){
    Movement.find({}, function(err,allMovements){
        if(err){
            console.log(err)
        }else{
         res.render("movements/index", {movements:allMovements});   
        }
    })
});
//MOVEMENT NEW
router.get("/new", function(req,res){
    res.render("movements/new");
});
//MOVEMENT CREATE
router.post("/", function(req,res)
    {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var bodyPart = req.body.bodyPart;
    var newMovement = {name:name, image:image, description:description, bodyPart:bodyPart};
    Movement.create(newMovement,function(err,newlyCreated){
        if(err){
            console.log(err)
        } else{
            console.log(newlyCreated)
            res.redirect("/movements/index");
        }
    });
});
//MOVEMENT SHOW

router.get("/:id", function(req,res){
    Movement.findById(req.params.id, function(err,foundmovement){
        if(err){
            console.log(err);
            res.redirect("/movements");
        }else{
            res.render("movements/show",{movement:foundmovement})
        }
    })
})

//MOVEMENT EDIT
router.get("/:id/edit", function(req,res){
    Movement.findById(req.params.id, function(err, foundmovement){
        if(err){
            console.log(err)
        }else{
            res.render("movements/edit",{movement:foundmovement})
        }
    })
})

//MOVEMENT UPDATE
router.put("/:id", function(req,res){
    Movement.findByIdAndUpdate(req.params.id,req.body.movement, function(err,updatedMovement){
        if(err){
            res.redirect("/movements");
        }else{
            res.redirect("/movements/" + req.params.id)
        }
    })
})

//MOVEMENT DESTROY ROUTE
router.delete("/:id", function(req,res){
    Movement.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/movements")
        }else{
            res.redirect("/movements")
        }
    })
})

module.exports = router