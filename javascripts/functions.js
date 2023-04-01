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
	//speakGenerate();
	//pronunciation1();
	pronouciation2();
}

var audio = new Audio();
function pronunciation1() {
	audio.src = "https://www.onelook.com/pronounce/macmillan/US/" + currentCard[5] + "-American-English-pronunciation.mp3";
	audio.play().catch(function() {
		console.log("no onelook!");
		audio.src = "https://d1qx7pbj0dvboc.cloudfront.net/" + currentCard[5] + ".mp3";
		audio.play().catch(function() {speakGenerate();});
	});
	
	//audio.src = "https://d1qx7pbj0dvboc.cloudfront.net/" + currentCard[5] + ".mp3";
	//audio.play().catch(function() {speakGenerate();});
	
}

function pronouciation2() {
	//https://dictionary.cambridge.org/us/media/english/us_pron/s/spe/speci/species.mp3
	//https://dictionary.cambridge.org/us/media/english/us_pron/m/mou/mouse/mouse.mp3
	//https://dictionary.cambridge.org/us/media/english/us_pron/a/ace/ace__/ace.mp3
	/*console.log(currentCard[5].slice(0,1));
	console.log(currentCard[5].slice(0,3));
	console.log(currentCard[5].slice(0,5));
	var l1 = currentCard[5].slice(0,1);
	var l3 = currentCard[5].slice(0,3);
	var l5 = currentCard[5].slice(0,5);
	var query = l1 + "/" + l3 + "/" + l5 + "/" + currentCard[5] + ".mp3";
	console.log(query);
	audio.src = "https://dictionary.cambridge.org/us/media/english/us_pron/" + query;*/
	//audio.play();
	//console.log(soundUrlList3[6]);
	//var arr = ["'tween decks"];
	//var ind = soundUrlList3.indexOf(arr);
	//var ind = soundUrlList3.findIndex(arr);
	//console.log(ind);
	/*console.log(soundUrlList[667][0]);
	console.log(soundUrlList[667][0][0]);*/
	var urlIndex = 0;
	for(var urlIndex = 0; urlIndex < soundUrlList.length; urlIndex++) {
		if(soundUrlList[urlIndex][0] == currentCard[5])	break;
	}
	if(urlIndex < soundUrlList.length) {
		//console.log(soundUrlList[urlIndex]);
		var randomUrl = randomFromRange(1, soundUrlList[urlIndex].length);
		console.log(soundUrlList[urlIndex][randomUrl]);
		audio.src = soundUrlList[urlIndex][randomUrl];
		audio.play();
	}
}

function speakGenerate() {
	console.log("no pronounciation!");
	let utterance = new SpeechSynthesisUtterance(currentCard[5]);
	utterance.lang = 'en';
	utterance.rate = 0.7;
	speechSynthesis.speak(utterance);
}

