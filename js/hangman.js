var guesses = [];
var misses = 0;

function getRandomWord(){
	var lvl = document.getElementById('lvlSelect');
	var url =  'https://hangman-api.lively.software';
	var word = '';
	
	if(lvl != undefined && lvl.value != ''){
		url+= '?difficulty='+lvl.value;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       var result = JSON.parse(xhttp.responseText);
	       buildWord(result.word);
	    }
	};
	xhttp.open("GET", url , true);
	xhttp.send();
}

function start(){
	clearCanvas();
	clearGuesses();
	getRandomWord();
}

function clearCanvas(){
	misses = 0;
	var canvas = document.querySelector('canvas');
	if(canvas != undefined){
		canvas.height = 400;
		canvas.width = 400;
		var c = canvas.getContext('2d');
		c.clearRect(0, 0, canvas.width, canvas.height);
	}
}

function drawHangman(){
	var canvas = document.querySelector('canvas');
	if(canvas != undefined){
	canvas.height = 400;
	canvas.width = 400;
	var c = canvas.getContext('2d');
	c.lineWidth = 3;
	c.strokeStyle = "black";
	misses++;
	
	switch(misses){
	case 9:	
		//right leg
		c.beginPath();
		c.moveTo(200, 270);
		c.lineTo(255, 360)
		c.stroke();
	case 8:	
		//left leg
		c.beginPath();
		c.moveTo(200, 270);
		c.lineTo(145, 360)
		c.stroke();
	case 7:	
		//right arm
		c.beginPath();
		c.moveTo(200, 210);
		c.lineTo(290, 150);
		c.stroke();
	case 6:		
		//left arm
		c.beginPath();
		c.moveTo(110, 150);
		c.lineTo(200, 210);
		c.stroke();
	case 5:	
		//body
		c.beginPath();
		c.moveTo(200, 170);
		c.lineTo(200, 270);
		c.stroke();	
		//noose
		c.fillStyle = "#804000";
		c.fillRect(197,170,10,5);
	case 4:	
		//head
		c.beginPath();
		c.arc(200,140,30,0,Math.PI * 2,false)
		c.stroke();		
		//noose
		c.fillStyle = "#804000";
		c.fillRect(197,170,10,5);
	case 3:	
		//rope
		c.fillStyle = "#804000";
		c.fillRect(200,50,9,60);
	case 2:	
		//branch
		c.fillStyle = "#663300";
		c.fillRect(95,50,270,15);
	case 1:
		//pole
		c.fillStyle = "#663300";
		c.fillRect(350,50,20,400);
		break;
	default:
	}
	}
}

function buildWord(word){
	this.word = word;
	var wordDisplay = document.getElementById('randomWord');
	wordDisplay.innerHTML = '';
	for(var i = 0; i < word.length ; i++){
		wordDisplay.insertAdjacentHTML('beforeend','<span class="letterPlaceholder"><span class="letter" style="visibility: hidden">'+ word.charAt(i) +'</span></span>');
	}
}

function processKeyPress(key){
	
	if(key.length !== 1 || !key.match(/[a-z]/i)){
		alert('Only letters of the alphabet please.')
		return;
	}
	
	var letters = document.getElementsByClassName("letter");
	var prevLetters = document.getElementById('prevLetters');
	
	if(!guesses.includes(key)){
		guesses[guesses.length] = key;
		buildGuesses();
	} else {
		alert('That letter has already been entered!')
		return;
	}
	

	if(this.word.includes(key)){
		for(var i=0; i < letters.length; i++)
			if(letters[i].innerHTML == key)
				letters[i].style.visibility = 'visible';
		setTimeout(function(){
		if(hasWon()){
			alert('You Win!');
			start();
		}});
	} else {
		drawHangman();
		if(hasLost()){
			setTimeout(function(){
				alert('You Lose! The word was ' + this.word + '.');
				start();
			});
		}
	}
	
}

function buildGuesses(){
	var prevLetters = document.getElementById('prevLetters');
	prevLetters.innerHTML = '';
	guesses.sort();
	var prevLetters = document.getElementById('prevLetters');
	for(var i = 0 ; i < guesses.length; i++){
		prevLetters.insertAdjacentHTML('beforeend', guesses[i]);
	}
}

function clearGuesses(){
	guesses = [];
	var prevLetters = document.getElementById('prevLetters');
	prevLetters.innerHTML = '';
}

function hasLost(){
	return misses >= 9;
}

function hasWon(){
	var letters = document.getElementsByClassName("letter");
	for(var i = 0; i < letters.length ; i++){
		if(letters[i].style.visibility === 'hidden'){
			return false;
		}
	}
	return true;
}