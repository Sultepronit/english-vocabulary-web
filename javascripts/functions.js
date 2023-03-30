function randomFromRange(from, to) {
	return Math.round((Math.random() * (to - from)) + from);
}

function showInput() {
	$("input").val("");
	$("input").show();
	$("input").focus();
	$(".typed-in").hide();
}

function hideInput() {
	$("input").hide();
	$(".typed-in").text(" ");
	$(".typed-in").show();
}

function playSound() {
	//console.log("A!");
	if(progress == "TRAINING" || progress == "TYPE_IN_ANSWER") return;
	speakGenerate();
}

function speakGenerate() {
	let utterance = new SpeechSynthesisUtterance(currentCard[5]);
	utterance.lang = 'en';
	utterance.rate = 0.7;
	speechSynthesis.speak(utterance);
}

