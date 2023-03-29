var currentCard;
var direction;
var progress;
var mark;

function randomFromRange(from, to) {
	return Math.round((Math.random() * (to - from)) + from);
}

function speakGenerate() {
	let utterance = new SpeechSynthesisUtterance(currentCard[5]);
	utterance.lang = 'en';
	utterance.rate = 0.7;
	speechSynthesis.speak(utterance);
}

function askQuestion() {
	console.log(currentCard);
	$(".transcription").text(" ");
	if(direction == "forward") {
		$(".word").text(currentCard[5]);
		$(".translation").text(" ");
	}
}

function pressedEnter() {
	switch(progress) {
		case "QUESTION":
			showAnswer();
			break;
		case "EVALUATE":
			saveProgress();
			break;
	}
}

function showAnswer() {
	progress = "EVALUATE";
	speakGenerate();
	
	$(".transcription").text(currentCard[6]);
	if(direction == "forward") {
		$(".translation").text(currentCard[7]);
	}
	
	$(".status").text("evaluate");
}

function saveProgress() {
	
	startTraining();
}

function startTraining() {
	progress = "TRAINING";
	document.getElementById("input").focus();
}

function checkTypedIn() {
	if(progress != "TRAINING") return;
	console.log($("input").val());
	console.log($("input").val());
	
}

function pressedG() {
	if(progress != "EVALUATE") return;
	$(".status").css("background-color", "green");
	mark = "GOOD";
}

function pressedB() {
	if(progress != "EVALUATE") return;
	$(".status").css("background-color", "red");
	mark = "BAD";
}

function pressedN() {
	if(progress != "EVALUATE") return;
	$(".status").css("background-color", "yellow");
	mark = "NEUTRAL";
}

function randomWord() {
	var randomNumber = randomFromRange(0,dbArray.length - 1);
	//console.log(randomNumber);
	console.log(dbArray[randomNumber][5]);
	currentCard = dbArray[randomNumber];
	direction = "forward";
	progress = "QUESTION";
	mark = "UNEVALUATED";
	askQuestion();
	
	$(".card-number").text(randomNumber);
}

var main = function () {
	"use strict";
	//document.getElementById("input").focus();
	/*$.getJSON("ultimate.json", function(card) {
		console.log("ok");
	});*/
	
	/*$.getJSON("Access-Control-Allow-Origin: https://github.com/Sultepronit/learn-web/blob/main/ultimate.json", function(card) {
		console.log("ok");
	});*/
	
	getTasks ();
	
	$(document).on("keypress", function (event) {
		console.log(event.keyCode);
		//$("input").val("");
		/*if(event.keyCode == 97) {
			speakGenerate();
			$("input").val("");
		}*/
		checkTypedIn();
		switch(event.keyCode) {
			case 97: 
				speakGenerate();
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
			//default: 
				//checkTypedIn();
		}
		//randomWord();
	});
	
}

$(document).ready(main);



