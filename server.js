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
//            DATABASE SETUP
////////////////////////////////////////////////////////


const userDB=new sql.Database("userData.db");


let cmd = " SELECT * FROM sqlite_master WHERE type='table' AND name='userInfo_ext' ";
userDB.get(cmd, function(err,val){
  console.log(err,val);
  if(val==undefined){
    console.log("No database file - Creating a new one");
    createUsrDB();
  }
  else
  {
    console.log("Database Found!");
    console.log(val)
  }
})

function createUsrDB()
{
  const cmd=  `CREATE TABLE userInfo_ext(firstname TEXT, lastname TEXT, gender TEXT, birthday TEXT, property TEXT, car TEXT, income TEXT, childnum TEXT, eduLevel TEXT, incomeType TEXT, livingType TEXT, marital TEXT, months TEXT)`;
  
  userDB.run(cmd, function(err, val) {
    if (err) {
      console.log("Database creation failure", err.message);
    } else {
      console.log("Created database");
    }
  });
}


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

app.post('/saveData',function(req,res){
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
  let workPhone=req.body.workPhone;
  let Phone=req.body.Phone;
  let email=req.body.email;
  
  
  const cmd=  `INSERT INTO userInfo_ext(firstname,lastname,gender,birthday,property,car,income,childnum,eduLevel,incomeType,livingType,marital,months,workPhone,Phone,email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  
  userDB.run(
        cmd,
        firstname,
        lastname,
        gender,
        birthday,
        property,
        car,
        income,
        childnum,
        eduLevel,
        incomeType,
        livingType,
        marital,
        months,
        workPhone,
        Phone,
        email,
        function(err,val){
          if (err) {
            console.log("DB insert error", err.message);
          } else {
            console.log("sucess");
          }
        }
  );
  // res.send(this.lastID);
  res.send("User Data Received")
})


// This part should handle the process when user click "submit application"
app.get('/result', function (req, res) {
  let gender;
  let car;
  let cmd = "SELECT * FROM userInfo_ext ORDER BY rowid DESC LIMIT 1";
  userDB.get(cmd, dataCallback);
    
  function dataCallback( err, rowData ) {    
     if (err) { console.log("error: ",err.message); }
     else { 
       console.log( "got data"); 
       gender = rowData.gender;
       car = rowData.car;
     }} 
 
  console.log('gender:', gender);
  console.log('car:', car);
  console.log('Entering the result page ...');
  let dataToSend;
  const process = spawn('python', ['./python/classification.py']);  // exec python as the shell commands

  
  // send features to the model
  process.stdout.on('data', function (data) {
    console.log('Getting the result from the model ...');
    dataToSend = data.toString();
    console.log('RESULT: ' + dataToSend)
    res.send(dataToSend);
  });
  

  // close and send the data back to browser
  //process.on('close', (code) => {
  // console.log(`child process close all stdio with code ${code}`);
   
  //res.send(dataToSend);
  //});
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
