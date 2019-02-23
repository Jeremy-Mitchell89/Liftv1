var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var router = express.Router;
var passport = require("passport");
var localStrategy = require("passport-local");
var flash = require("connect-flash");
//MODELS
var Movement = require("./models/movements");
var Log = require("./models/log");
var Move = require("./models/move");
var User = require("./models/user")

//ROUTES
var movementsRoutes = require("./routes/movements"),
    logRoutes = require("./routes/log"),
    moveRoutes = require("./routes/move"),
    indexRoutes = require("./routes/index"),
    userRoutes = require("./routes/user");

//CONNECT DB
mongoose.connect("mongodb://localhost/lift");
//USE BODY PARSER TO PARSE JSON OBJECT FROM REQ.BODY
app.use(bodyParser.urlencoded({extended:true}));
//SHORTEN FILE NAMES BY ELIMINATING EJS FROM ALL FILES IN ROUTES
app.set("view engine", "ejs");
//LINK TO STYLESHEET/JAVASCRIPT
app.use(express.static(__dirname + "/public"));
//USE METHOD OVERRIDE TO APPEND ?_METHOD= TO URL
app.use(methodOverride("_method"));
//USE FLASH MESSAGES
app.use(flash());



// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//pass the current User and flash messages in for use
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/log", logRoutes);
app.use("/log/:id/move", moveRoutes);
app.use("/movements", movementsRoutes);
app.use("/user", userRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Lift Server Started");
})