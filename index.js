const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
     useNewUrlParser: true ,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify: false
    });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    });

// get all workouts
app.get("/api/workouts",(req,res)=>{
    db.Workout.find().then(allWorkouts=>{
        res.json(allWorkouts);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
  });

app.get("/stats", (req, res) => {
res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// add an exercise
app.put('/api/workouts/:workoutid',(req,res)=>{
    db.Workout.findOneAndUpdate({_id:req.params.workoutid}, {$push: {exercises: req.body}}, {new:true}).then(newExercise=>{
        res.json(newExercise)
    }).catch(err=>{
        res.status(500).json(err);
    })
})

// create a workout
app.post('/api/workouts',(req,res)=>{
    db.Workout.create(req.body).then(newWorkout=>{
        res.json(newWorkout)
    }).catch(err=>{
        res.status(500).json(err);
    })
})

app.listen(PORT,()=>{
    console.log("listenin on port " + PORT)
})