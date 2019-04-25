var config = {
    apiKey: "AIzaSyA3tbUUCHzbVmg9b4oD2qPONAUHliOqZ6M",
    authDomain: "train07-8d9d8.firebaseapp.com",
    databaseURL: "https://train07-8d9d8.firebaseio.com",
    projectId: "train07-8d9d8",
    storageBucket: "train07-8d9d8.appspot.com",
    messagingSenderId: "999839813346"
  };
  firebase.initializeApp(config);
var database=firebase.database();

var train;
var destination;
var firsttime;
var frequency;
var firsthour;//Useless variable, hoped to use it to convert firsttime to something usable.

$("#add-train").on("click",function(event){
  event.preventDefault();
  train=$("#train-input").val().trim();
  destination=$("#destination-input").val().trim();
  firsttime=$("#time-input").val();//I can't use this for time calculations.
  frequency=$("#frequency-input").val();

  

  database.ref().push({
    train:train,
    destination:destination,
    firsttime:firsttime,
    frequency:frequency
  });
});
database.ref().on("child_added", function(snapshot) {

  console.log(snapshot.val());
  console.log(snapshot.val().train);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().firsttime);
  console.log(snapshot.val().frequency);

  var tRow=$("<tr>");
  var trainTd=$("<td>").text(snapshot.val().train);
  var destTd=$("<td>").text(snapshot.val().destination);
  var freqTd=$("<td>").text(snapshot.val().frequency);
  var arriveTd=$("<td>").text("Unavailable");//Time calculation results go here...
  var etaTd=$("<td>").text("Unavailable");//...IF I HAD ANY
  tRow.append(trainTd, destTd, freqTd,arriveTd, etaTd);
  $("#traintable").append(tRow);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});