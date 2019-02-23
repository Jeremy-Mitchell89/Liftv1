var mongoose=require("mongoose");
var moveSchema = new mongoose.Schema({
    movement: String,
    weight:[],
    reps:[]
});
module.exports = mongoose.model("Move",moveSchema);