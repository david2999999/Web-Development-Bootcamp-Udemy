var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


// showing all campgrounds
router.get("/", function(req, res){  // the site of all the campgrounds
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    });
});


// Showing the form page for new campgrounds
router.get("/new", function(req, res){
    res.render("campgrounds/new");   // renders the page with the form
});

// SHOW:  more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with the provided ID
    // by using the populate statement. the comments are no longer IDs
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           console.log(foundCampground);
               //render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});


//create new campground in the form
router.post("/", function(req, res){
    // get data from form and add to database
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name : name, image: image, description: desc};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });       
});

module.exports = router;