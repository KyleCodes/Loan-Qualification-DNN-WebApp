////////////////////////////////////////////////////////
//            USER INFO SUBMISSON
////////////////////////////////////////////////////////

const submitBton=document.getElementById("submit");
if(submitBton){
  submitBton.addEventListener("click", sendInfo);
  console.log("attatched submit button listener")
}

var numBirthdays="";

function getBirthday(){
  var now=new Date();
  let birthday=document.getElementById("bday").value;
  var userbday=new Date(birthday);
  var DateDiff = {

      inDays: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();
          return parseInt((t2-t1)/(24*3600*1000));
      }
  }

    numBirthdays=DateDiff.inDays(userbday,now);
    numBirthdays=numBirthdays*(-1);
}

function sendInfo(){
  getBirthday();
  let firstname = document.querySelector("#firstname").value;
  let lastname = document.querySelector("#lastname").value;
  let gender = document.querySelector("#gender").value;
  let birthday = numBirthdays;
  let car = document.querySelector("#car").value;
  let property = document.querySelector("#property").value;
  let childnum = document.querySelector("#childnum").value;
  let income = document.querySelector("#income").value;
  let incomeType = document.querySelector("#incomeType").value;
  let eduLevel = document.querySelector("#eduLevel").value;
  let marital = document.querySelector("#marital_status").value;
  let livingType = document.querySelector("#living").value;
  let months=document.querySelector("#months").value;
  let workPhone=document.querySelector("#workPhone").value;
  let Phone=document.querySelector("#Phone").value;
  let email=document.querySelector("#email").value;
  let jobType=document.querySelector("#jobType").value;
  let data = {
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    birthday: birthday,
    property: property,
    car: car,
    income: income,
    childnum: childnum,
    eduLevel: eduLevel,
    incomeType: incomeType,
    livingType:livingType,
    marital: marital,
    months:months,
    workPhone:workPhone,
    Phone:Phone,
    email:email,
    jobType:jobType
  }
  console.log(data);
  


  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "/saveData");

  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onloadend = function(e) {
    console.log(xmlhttp.responseText);
    window.location = "/result.html";
  }
  xmlhttp.send(JSON.stringify(data));
}


////////////////////////////////////////////////////////
//            RESULTS TABLE RETRIEVAL
////////////////////////////////////////////////////////

const resultsBton = document.getElementById("load_table");
if(resultsBton){
  resultsBton.addEventListener("click", getTable);
  console.log("attatched results button listener")
}

function getTable() {
  
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/result");

  xmlhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");

  xmlhttp.onloadend = function(e) {
    console.log(xmlhttp.responseText);
    
    let theDiv = document.getElementById("appli_record_tabl");
    let content = " ";
    let value = parseInt(xmlhttp.responseText);
    
    if (value === 0){
        content =  document.createTextNode("QUALIFIED! ");
        theDiv.className = "qualified";
        console.log("qualified")
    }else{
        content =  document.createTextNode("NOT QUALIFIED! ");
        theDiv.className = "unqualified";
        console.log("unqualified")
    }
    
    theDiv.appendChild(content);     
  }
  
  console.log('sending response')
  xmlhttp.send();
    
};
