const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
mongoose.connect("mongodb://localhost:27017/patientListDB");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";



const patientSchema = {

  pName: String,
  pLoc: String,
  pAddress: String,
  pNumber: Number,
  pNumber2: Number,
  pMediaction: String,
  pTherapy: String,
  pSuggestion: String
 };

const Patient = mongoose.model("Patient", patientSchema);



app.get("/", function(req, res){

    Patient.find({}, function(err, posts){
        res.render("home", {
          homeContent: homeStartingContent,
          posts: posts
          });
      });
});



app.get("/patient_details", function(req, res){
    res.render("patient_details");
});

app.post("/patient_details", function(req, res){

    const patient = new Patient ({
        pName : req.body.patient_name,
        pLoc : req.body.patient_loc,
        pAddress : req.body.patient_address,
        pNumber : req.body.patient_number,
        pNumber2 : req.body.patient_number2,
        pMedication : req.body.medication,
        pTherapy : req.body.therapy,
        pSuggestion : req.body.suggestion
        
      });

      patient.save(function(err){
        if (!err){
            res.redirect("/");
        }
      });

});


app.get("/patient/:patientName", function(req, res){
    const requestedPostId = req.params.patientName;

    Patient.findOne({_id: requestedPostId}, function(err, post){
        res.render("patient", {
            pName: post.pName,
            pLoc: post.pLoc,
            pAddress: post.pAddress,
            pNumber: post.pNumber,
            pNumber2: post.pNumber2,
            pMedication: post.pMedication,
            pTherapy: post.pTherapy,
            pSuggestion: post.pSuggestion
        });
      });

});

app.get("/about", function(req, res){
    res.render("about", {aboutContent: aboutContent});
});

app.listen(3000, function(){
    console.log("Server Started");
})