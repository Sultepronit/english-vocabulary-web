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
	//pronunciation2();
	pronunciation3();
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

function pronunciation2() {
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
}

var currentWord;
var urlIndex = 0;
var links = [];
function pronunciation3() {
	if(currentWord != currentCard[5]) {
		currentWord = currentCard[5];
		urlIndex = 0;
		links = [];
		for(; urlIndex < soundUrlList.length; urlIndex++) {
			//if(soundUrlList[urlIndex][0] == currentWord.toLowerCase())	break;
			if(soundUrlList[urlIndex][0] == currentWord.toLowerCase()) {
				for(var i = 1; i < soundUrlList[urlIndex].length; i++) {
					var prefix = soundUrlList[urlIndex][i].slice(0,20);
					if(prefix == "http://static.sfdict") continue;
					if(prefix == "http://www.yourdicti") continue;
					if(prefix == "http://www.oxforddic") continue;
					if(prefix == "http://img2.tfd.com/") continue;
					console.log(soundUrlList[urlIndex][i]);
					links.push(soundUrlList[urlIndex][i]);
				}
				break;
			}
		}
	}
	console.log("Here!");
	
	if(links.length > 0) {
		var randomUrl = randomFromRange(0, links.length - 1);
		console.log(links[randomUrl]);
		audio.src = links[randomUrl];
		audio.play();
	} else {
		//console.log("No sound!");
		speakGenerate();
	}
	/*console.log(urlIndex);*/
	
	/*if(urlIndex < soundUrlList.length) {
		//console.log(soundUrlList[urlIndex]);
		//var randomUrl = randomFromRange(1, soundUrlList[urlIndex].length);
		var randomUrl;
		for(;;) {
			randomUrl = randomFromRange(1, soundUrlList[urlIndex].length);
			console.log(soundUrlList[urlIndex][randomUrl]);
			if(soundUrlList[urlIndex][randomUrl].slice(0,20) == "http://static.sfdict") continue;
			if(soundUrlList[urlIndex][randomUrl].slice(0,20) == "http://www.yourdicti") continue;
			if(soundUrlList[urlIndex][randomUrl].slice(0,20) == "http://www.oxforddic") continue;
			break;
		}
		
		//console.log(soundUrlList[urlIndex][randomUrl]);
		console.log(soundUrlList[urlIndex][randomUrl].slice(0,30));
		audio.src = soundUrlList[urlIndex][randomUrl];
		audio.play();
	}*/
}

function speakGenerate() {
	console.log("no pronunciation!");
	let utterance = new SpeechSynthesisUtterance(currentCard[5]);
	utterance.lang = 'en';
	utterance.rate = 0.7;
	speechSynthesis.speak(utterance);
}

