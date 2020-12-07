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

function getBirthday(){
var now=new Date();
var input = document.getElementById("bday").value;
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

    //var userbday=new Date(birthday);
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

function sendInfo(){
    getBirthday();
  let firstname = document.getElementById("firstname").textContent;
  let lastname = document.getElementById("lastname").textContent;
  let gender = document.getElementById("gender").value;
  let birthday = numBirthdays;
  let car = document.getElementById("car").value;
  let property = document.getElementById("property").value;
  let childnum = document.getElementById("childnum").textContent;
  let income = document.getElementById("income").textContent;
  let incomeType = document.getElementById("incomeType").value;
  let eduLevel = document.getElementById("eduLevel").value;
  let marital = document.getElementById("marital_status").value;
  let livingType = document.getElementById("living").value;
  let months=document.getElementById("months").textContent;
  let workPhone=document.getElementById("workPhone").value;
  let Phone=document.getElementById("Phone").value;
  let email=document.getElementById("email").value;
  let employDay=document.getElementById("employDay").textContent;
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

      function isFilledOut(content, id) {
        if (content == "") {
          document.getElementById(id).classList.add("required");
          complete = false;
        } else {
          //document.getElementById(id).classList.remove("required");
        }
      }

      isFilledOut(data.gender, "gender");
      isFilledOut(data.car, "car");
      isFilledOut(data.property, "property");
      isFilledOut(data.childnum, "childnum");
      isFilledOut(data.income, "income");
      isFilledOut(data.birthday, "birthday");
      isFilledOut(data.employDay, "employDay");
      isFilledOut(data.workPhone, "workPhone");
      isFilledOut(data.Phone, "Phone");
      isFilledOut(data.email, "email");
      isFilledOut(data.months, "months");
      isFilledOut(data.incomeType, "incomeType");
      isFilledOut(data.eduLevel, "eduLevel");
      isFilledOut(data.living, "living");
      isFilledOut(data.marital_status, "marital_status");

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
