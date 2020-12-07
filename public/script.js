console.log("js loaded");

////////////////////////////////////////////////////////
//            USER INFO SUBMISSON
////////////////////////////////////////////////////////

const submitBton=document.getElementById("submit");
if(submitBton){
  submitBton.addEventListener("click", sendInfo);
  console.log("attatched submit button listener");
}

var numBirthdays = "";
let birthDay = "";

function getBirthday(){
var now=new Date();
var input = document.getElementById("datePicker").value;
console.log(input);
//numBirthdays = "";
var birthday = new Date(input.replace(/-/g, '\/'));
console.log(birthday);
var birthYear = birthday.getFullYear();
console.log(birthYear);
var birthMonth = birthday.getMonth();
console.log(birthMonth);
var birthDay = birthday.getDate();
console.log(birthDay);
if(isNaN(birthDay)){
    console.log(numBirthdays);
}else{
    var userbday=new Date(birthday);
    var DateDiff = {

        inDays: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            var day = parseInt((t2-t1)/(24*3600*1000));
            console.log(day);
            return day;
        }
    }
    numBirthdays=DateDiff.inDays(birthday,now);
    console.log(numBirthdays);
    }
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
      let employDay=document.querySelector("#employDay").value;

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
    employDay:employDay
  }
  console.log(data);

  let complete = true;
  var i = 0;

      function isFilledOut(content, id) {
        if (content == "") {
          document.getElementById(id).classList.add("required");
          complete = false;
        } else {
          document.getElementById(id).classList.remove("required");
        }
      }

      isFilledOut(data.gender, "gender");
      isFilledOut(data.car, "car");
      isFilledOut(data.property, "property");
      isFilledOut(data.childnum, "childnum");
      isFilledOut(data.income, "income");
      isFilledOut(data.employDay, "employDay");
      isFilledOut(data.workPhone, "workPhone");
      isFilledOut(data.Phone, "Phone");
      isFilledOut(data.email, "email");
      isFilledOut(data.months, "months");
      isFilledOut(data.incomeType, "incomeType");
      isFilledOut(data.eduLevel, "eduLevel");
      isFilledOut(data.living, "living");
      isFilledOut(data.marital_status, "marital_status");

      if(isNaN(birthDay)){
          complete = false;
      }

      if (!complete) {
        alert("Please fill out all required fields");
        return false;
      }

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
    let content = document.createTextNode(xmlhttp.responseText);
    theDiv.appendChild(content);
  }

  console.log('sending response')
  xmlhttp.send();

};
