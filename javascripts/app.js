var repeatList = [];
var confirmList = [];
var learnList = [];
var sessionList = [];

var currentCardIndex;
var currentCard;
var direction;
var progress;
var mark;
var typedIn;

function startSession() {
	
	for(var i = 0; i < dbArray.length; i++) {
		//console.log(dbArray[i][0]);
		switch(dbArray[i][0]) {
			case 0:
				learnList.push(i);
				break;
			case 1:
				confirmList.push(i);
				break;
			default: 
				repeatList.push(i);
		}
	}
	console.log(repeatList);
	console.log(confirmList);
	console.log(learnList);
	
	var repeatNumber = 10;
	console.log("repeat: " + repeatNumber);
	var confirmNumber = confirmList.length / 10;
	console.log("confirm: " + confirmNumber);
	var learnNumber = learnList.length - 2;
	console.log("learn: " + learnNumber);
	
	for(var i = 0; i < repeatNumber; i++) sessionList.push("REPEAT");
	for(var i = 0; i < confirmNumber; i++) sessionList.push("CONFIRM");
	for(var i = 0; i < learnNumber; i++) sessionList.push("LEARN");
	console.log(sessionList);
	
	nextCard();
}

function nextCard() {
	$(".word").css("border-bottom", "6px solid white");
	
	var nextCardStatusIndex = (sessionList.length < 5) ? 0 : randomFromRange(0, sessionList.length - 1);
	console.log(nextCardStatusIndex + ": " + sessionList[nextCardStatusIndex]);
	sessionList.splice(nextCardStatusIndex, 1);
	console.log(sessionList);
	
	var currentCardId = 0;
	switch(sessionList[nextCardStatusIndex]) {
		case "REPEAT":
			currentCardIndex = randomFromRange(0, repeatList.length - 1);
			//currentCard = dbArray[ repeatList[currentCardIndex] ];
			currentCardId = repeatList[currentCardIndex];
			repeatList.splice(currentCardIndex, 1);
			break;
		case "CONFIRM":
			currentCardIndex = randomFromRange(0, confirmList.length - 1);
			currentCardId = confirmList[currentCardIndex];
			confirmList.splice(currentCardIndex, 1);
			break;
		case "LEARN":
			currentCardIndex = randomFromRange(0, learnList.length - 1);
			//currentCard = dbArray[ learnList[currentCardIndex] ];
			currentCardId = learnList[currentCardIndex];
			learnList.splice(currentCardIndex, 1);//////!!!!!!!
			console.log(learnList);
			break;
		default:
			console.log("SOMETHING IS JUST WRONG!!!!!!!!!");
			break;
	}
	$(".card-number").text(currentCardId);
	currentCard = dbArray[currentCardId];
	
	//var randomNumber = randomFromRange(0,dbArray.length - 1);
	//console.log(randomNumber);
	//console.log(dbArray[randomNumber][5]);
	//currentCard = dbArray[randomNumber];
	direction = "FORWARD";
	direction = "BACKWARD";
	var di = randomFromRange(0, 1);
	//if(di) 
	direction = (di) ? "FORWARD" : "BACKWARD";
	progress = "QUESTION";
	mark = "UNEVALUATED";
	askQuestion();
	
	//$(".card-number").text(randomNumber);
}

function askQuestion() {
	//console.log(currentCard);
	$(".transcription").text(" ");
	if(direction == "FORWARD") {
		/*$("input").hide();
		$(".typed-in").show();*/
		hideInput();
		
		$(".word").text(currentCard[5]);
		$(".translation").text(" ");
	} else { //BACKWARD
		progress = "TYPE_IN_ANSWER";
	
		showInput();
		
		$(".word").text(" ");
		$(".translation").text(currentCard[7]);
	}
}

function evaluateAnswer() {
	showAnswer();
	
	hideInput();
	
	if(isTypedInCorrect()) { //correct
		$(".typed-in").css("color", "blue");
		pressedG();
	} else { //incorrect
		$(".typed-in").css("color", "red");
		pressedB();
	}
	
	if(typedIn == "") typedIn = "_";
	$(".typed-in").text(typedIn);
	
	//showAnswer();
}

function showAnswer() {
	console.log(currentCard);
	progress = "EVALUATE";
	speakGenerate();
	
	$(".transcription").text(currentCard[6]);
	if(direction == "FORWARD") {
		$(".translation").text(currentCard[7]);
	} else { //BACKWARD
		$(".word").text(currentCard[5]);
	}
	
	//$(".status").text("evaluate");
}

function saveProgress() {
	if(mark == "UNEVALUATED") return;
	
	if(direction == "BACKWARD" && mark == "GOOD") {
		nextCard();
	} else {
		startTraining();
	}
}

function startTraining() {
	progress = "TRAINING";
	showInput();
}

function endTraining() {
	if(!isTypedInCorrect()) return;
	nextCard();
}

function isTypedInCorrect() {
	typedIn = $("input").val();
	console.log(typedIn);
	if(typedIn == currentCard[5]) {
		console.log("Bingo!");
		//nextCard();
	}
	return (typedIn == currentCard[5]);
}

function pressedEnter() {
	switch(progress) {
		case "QUESTION":
			showAnswer();
			break;
		case "TYPE_IN_ANSWER":
			evaluateAnswer();
			break;
		case "EVALUATE":
			saveProgress();
			break;
		case "TRAINING":
			endTraining();
			break;
	}
}

function pressedG() {
	if(progress != "EVALUATE") return;
	$(".status").css("background-color", "green");
	$(".word").css("border-bottom", "6px solid green");
	mark = "GOOD";
}

function pressedB() {
	if(progress != "EVALUATE") return;
	$(".status").css("background-color", "red");
	$(".word").css("border-bottom", "6px solid red");
	mark = "BAD";
}

function pressedN() {
	if(progress != "EVALUATE") return;
	$(".status").css("background-color", "yellow");
	$(".word").css("border-bottom", "6px solid yellow");
	mark = "NEUTRAL";
}

var main = function () {
	"use strict";
	//document.getElementById("input").focus();
	//$("input").focus();
	/*$.getJSON("ultimate.json", function(card) {
		console.log("ok");
	});*/
	
	/*$.getJSON("Access-Control-Allow-Origin: https://github.com/Sultepronit/learn-web/blob/main/ultimate.json", function(card) {
		console.log("ok");
	});*/
	
	getTasks ();
	
	$(document).on("keypress", function (event) {
		/*console.log(event.keyCode);
		console.log(event.code);
		console.log(event.key);*/
		$(".status").text(event.key);

		switch(event.keyCode) {
			case 97: 
				playSound();
				break;
			case 13: 
				pressedEnter();
				break;
			case 103:
				pressedG();
				break;
			case 98:
				pressedB();
				break;
			case 110:
				pressedN();
				break;
		}

	});
	
}

$(document).ready(main);



