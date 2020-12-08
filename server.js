
////////////////////////////////////////////////////////
//            DEPENDENCIES
////////////////////////////////////////////////////////

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const sql=require("sqlite3").verbose();
const { spawn } = require('child_process'); 

////////////////////////////////////////////////////////
//              ROUTING SETUP
////////////////////////////////////////////////////////

// set the main page
app.use(express.static("public"));
app.use(express.static('./user'));
app.use(bodyParser.urlencoded({extended:false}))

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});


app.use(bodyParser.json());


// This part should handle the process when user click "submit application"
app.get('/result', function (req, res) {
  console.log(req.body)
  
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let gender = req.body.gender;
  let birthday = req.body.birthday;
  let property = req.body.property;
  let car = req.body.car;
  let income = req.body.income;
  let childnum = req.body.childnum;
  let eduLevel = req.body.eduLevel;
  let incomeType = req.body.incomeType;
  let livingType = req.body.livingType;
  let marital = req.body.marital;
  let months=req.body.months;
  let has_phone=req.body.months;


  let dataToSend;
  const process = spawn('python', ['./python/classification.py']);  // exec python as the shell commands

  
  // send features to the model
  process.stdout.on('data', function (data) {
    console.log('Getting the result from the model ...');
    dataToSend = data.toString();
    console.log('RESULT: ' + dataToSend)
  });
  

  // close and send the data back to browser
  process.on('close', (code) => {
   console.log(`child process close all stdio with code ${code}`);
   res.send(dataToSend);
  });
});


////////////////////////////////////////////////////////
//            404 HANDLER
////////////////////////////////////////////////////////

app.all("*", function (request, response) {
  response.status(404); // the code for "not found"
  response.send("This page does not exist");
});


////////////////////////////////////////////////////////
//            SERVER STARTUP
////////////////////////////////////////////////////////

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
