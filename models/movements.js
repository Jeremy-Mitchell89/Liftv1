var mongoose=require("mongoose");
var movementSchema = new mongoose.Schema
({
   name:String,
   image:String,
   description: String,
   bodyPart: String
});

module.exports=mongoose.model("Movement", movementSchema);