var mongoose = require("mongoose");
var logSchema = new mongoose.Schema({
    title: String,
    date: String,
    move:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Move"
    }],
    notes: String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
});

module.exports=mongoose.model("Log", logSchema);