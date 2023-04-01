var repeatList = [];
var confirmList = [];
var learnList = [];
var sessionList = [];

var currentCardId = 0;
var currentCard = [];
var direction;
var progress;
var mark;

var typedIn;

var nextRepeatedStatus = 100;

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
	if(sessionList.length < 1) {
		$(".word").text("Happy End!");
		return;
	}
	
	var learnStatusIndex = randomFromRange(0, sessionList.length - 1);
	var learnStatus = sessionList[learnStatusIndex];
	console.log(learnStatusIndex + ": " + learnStatus);
	sessionList.splice(learnStatusIndex, 1);
	console.log(sessionList);
	
	function chooseRandomCard(list) {
		console.log("Hello there!");
		var index = randomFromRange(0, list.length - 1);
		currentCardId = list[index];
		list.splice(index, 1);
		console.log(list);
	};
	
	var localIndex = 0;
	switch(learnStatus) {
		case "REPEAT":
			chooseRandomCard(repeatList);
			/*localIndex = randomFromRange(0, repeatList.length - 1);
			currentCardId = repeatList[localIndex];
			repeatList.splice(localIndex, 1);*/
			break;
		case "CONFIRM":
			chooseRandomCard(confirmList);
			/*localIndex = randomFromRange(0, confirmList.length - 1);
			currentCardId = confirmList[localIndex];
			confirmList.splice(localIndex, 1);*/
			break;
		case "LEARN":
			chooseRandomCard(learnList);
			/*localIndex = randomFromRange(0, learnList.length - 1);
			currentCardId = learnList[localIndex];
			learnList.splice(localIndex, 1);*/
			//console.log(learnList);
			break;
		default:
			console.log("SOMETHING IS JUST WRONG!!!!!!!!!");
			break;
	}
	//console.log("localIndex: " + localIndex);
	currentCard = dbArray[currentCardId];
	$(".card-number").text(currentCardId + ": " + currentCard[0]);
	
	//direction = "FORWARD";
	/*direction = "BACKWARD";
	var di = randomFromRange(0, 1);
	direction = (di) ? "FORWARD" : "BACKWARD";*/
	//if(currentCard[1] > currentCard[2]) direction = "BACKWARD";
	direction = (currentCard[1] > currentCard[2]) ? "BACKWARD" : "FORWARD";
	
	progress = "QUESTION";
	mark = "UNEVALUATED";
	askQuestion();
}

function askQuestion() {
	$(".word").css("border-bottom", "6px solid white");
	$(".transcription").text(" ");
	$(".example").text(" ");
	
	if(direction == "FORWARD") {
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
	//speakGenerate();
	playSound();
	
	$(".transcription").text(currentCard[6]);
	$(".example").text(currentCard[8]);
	if(direction == "FORWARD") {
		$(".translation").text(currentCard[7]);
	} else { //BACKWARD
		$(".word").text(currentCard[5]);
	}
	
}

function saveProgress() {
	if(mark == "UNEVALUATED") return;
	
	//if(currentCard[0] < 1 && mark == "NEUTRAL") mark = "BAD";
	if(currentCard[0] < 1) { // learn
		if(mark == "NEUTRAL") mark = "BAD";
		if(mark == "BAD") {
			sessionList.push("LEARN");
			learnList.push(currentCardId);
			console.log("I'll be back!");
			console.log(sessionList);
			console.log(learnList);
			console.log("I'm back!");
		}
	}
	
	if(direction == "FORWARD") {
		switch(mark) {
			case "GOOD":
				currentCard[1]++;
				break;
			case "BAD":
				currentCard[1]--;
				break;
		}
	} else { //BACKWARD
		switch(mark) {
			case "GOOD":
				currentCard[2]++;
				break;
			case "BAD":
				currentCard[2]--;
				break;
		}
	}
	
	//degrade
	if(currentCard[1] < -1 || currentCard[2] < -1) {
		if(currentCard[0] > 0) { //confrim & repeat
			currentCard[0] = 0;
			currentCard[1] = 0;
			currentCard[2] = 0;
			toCell(currentCardId + 1, 'A', currentCard[0]);
		} else { // learn
			if(currentCard[1] < -1) { // FORWARD
				currentCard[1] = -1;
			} else { // BACKWARD
				currentCard[1] = 0;
				currentCard[2] = 0;
			}
		}
	} else if(currentCard[0] > 0) { //confirm & repeat
		if(currentCard[1] > 0 && currentCard[2] > 0) { //upgrade confirm & repeat
			currentCard[0] = (currentCard[0] < 2) ? 2 : nextRepeatedStatus++;
			currentCard[1] = 0;
			currentCard[2] = 0;
			toCell(currentCardId + 1, 'A', currentCard[0]);
		}
	} else if(currentCard[1] > 1 && currentCard[2] > 1) { //upgrade learn
		currentCard[0] = 1;
		currentCard[1] = 0;
		currentCard[2] = 0;
		toCell(currentCardId + 1, 'A', currentCard[0]);
	}
	
	console.log(currentCard[0] + ": " + currentCard[1] + " | " + currentCard[2]);
	toCell(currentCardId + 1, 'B', currentCard[1]);
	toCell(currentCardId + 1, 'C', currentCard[2]);
	
	if(direction == "BACKWARD" && mark == "GOOD") {
		nextCard();
	} else {
		startTraining();
	}
}

function startTraining() {
	progress = "TRAINING";
	showInput();
	//nextCard();
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
	$(".word").css("border-bottom", "6px solid green");
	mark = "GOOD";
}

function pressedB() {
	if(progress != "EVALUATE") return;
	$(".word").css("border-bottom", "6px solid red");
	mark = "BAD";
}

function pressedN() {
	if(progress != "EVALUATE") return;
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



