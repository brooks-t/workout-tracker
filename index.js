const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
     useNewUrlParser: true ,
     useUnifiedTopology: true
    });

app.get("/api/workouts",(req,res)=>{
    db.Workout.find().then(allWorkouts=>{
        res.json(allWorkouts)
    }).catch(err=>{
        res.status(500).json(err);
    })
})