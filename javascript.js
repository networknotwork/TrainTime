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

$("#add-train").on("click",function(event){
  event.preventDefault();
  train=$("#train-input").val().trim();
  destination=$("#destination-input").val().trim();
  firsttime=$("#time-input").val();
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
////Convert first train time to hours and minutes 
  var basetime=snapshot.val().firsttime;
  var timeFormat=moment(basetime,"HH:mm").subtract(1,"years");
  console.log(timeFormat);
  var currentTime=moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  var frequency=(snapshot.val().frequency);
  var minuteFormat=moment(frequency,"mm");
  console.log("Frequency (min): "+minuteFormat.format("mm"));
  //Insert calculations for Next Arrival Time and Minutes Away here.
  var diffTime = moment().diff(moment(timeFormat), "minutes");
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
  var eta = frequency - tRemainder;
  var nextTrain = moment().add(eta, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var tRow=$("<tr>");
  var trainTd=$("<td>").text(snapshot.val().train);
  var destTd=$("<td>").text(snapshot.val().destination);
  var freqTd=$("<td>").text(frequency);
  var arriveTd=$("<td>").text(moment(nextTrain).format("HH:mm"));//"Next Arrival Time" calculations output here
  var etaTd=$("<td>").text(eta);//"Minutes Away" calculations output here
  tRow.append(trainTd, destTd, freqTd,arriveTd, etaTd);
  $("#traintable").append(tRow);
  

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});