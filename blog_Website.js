var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose=require("mongoose");

mongoose.connect("mongodb+srv://parna:parna123@cluster0.5l8pg.mongodb.net/clickncapture?retryWrites=true&w=majority",{ useUnifiedTopology: true ,useNewUrlParser: true })
var campgroundSchema=new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var campground=mongoose.model("campground",campgroundSchema);

// campground.create(  
//     {  
//         name : 'salmon creek',
//         image:"https://toputourworkon.com/wp-content/uploads/2019/08/The-Placer-Lake-Recreation-Site.jpg",
//         description:"this is a huge granite hill btu there is no water "
//     }, function(err,campground){
//         if(err)
//         {
//             console.log("there is some error")
//         }
//         else{
//             console.log("\n newly created campground")
//             console.log(campground)
//         }
//    });

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.render("landing");
});
app.get("/campgrounds",function(req,res){
    campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index",{campgrounds: allCampgrounds});
        }
    })
});
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.post("/campgrounds",function(req,res){
    var name= req.body.name;
    var image= req.body.image;
    var newCampgrounds= {name: name, image: image}
    //create a new campground and save to DB
    campground.create( newCampgrounds, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id,function(err, found){
        if(err){
            res.json(err);
        } else{
            res.render("show", {campground: found});
        }

    });
});


app.listen(
    //process.env.PORT,process.env.IP,
    3000,"127.0.0.1",
    function(){
    console.log("yelpCamp has started");
});

