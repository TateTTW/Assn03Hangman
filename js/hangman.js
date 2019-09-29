var words = ["rock","paper","scissors","airplane","cat","car","tree","dog","house","book", "foot" , "firepit", "police"
	,"keyboard","computer","building","road","train","desk","neighbor","picture","boat","elephant","frame","game","motorcycle",
	"printer","light","pillow","bed","arcade","window","hill","grass","garage","weight","office","stapler","couch","monkey",
	"cup","bottle","carpet","wood","ship","sky","father","mother","brother","sister","aunt","uncle","cousin","bridge","stone",
	"rug","vacuum", "boy", "girl", "europe" , "america", "canada", "russia", "africa", "asia", "japan", "antarctica", "alaska",
	"bike","mountain", "ocean", "sea", "continent", "trade", "school", "class", "student", "teacher", "science", "art", "human",
	"read", "predator", "religion", "idiot", "money", "phone", "watch", "electricity", "wire", "gym", "fun", "heavy", "dolphin"];
var guesses = [];

function getRandomWord(){
	var num = Math.floor(Math.random() * ((words.length-1) - 0 + 0)) + 0;
	return words[num];
}

function start(){
	this.word = getRandomWord();
	clearGuesses();
	hideHangman();
	buildRandomWord();
}

function clearWordDisplay(){
	var wordDisplay = document.getElementById('randomWord');
	wordDisplay.innerHTML = '';
}

function buildRandomWord(){
	clearWordDisplay();
	var wordDisplay = document.getElementById('randomWord');
	var str = '';
	for(var i = 0; i < this.word.length ; i++){
		wordDisplay.insertAdjacentHTML('beforeend','<span class="letterPlaceholder"><span class="letter" style="visibility: hidden">'+ this.word.charAt(i) +'</span></span>');
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
		showAnImage();
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

function showAnImage(){
	var imgs = document.getElementsByTagName("img");
	for(var i = 0; i < imgs.length ; i++){
		if(imgs[i].style.visibility === 'hidden'){
			if(imgs[i].id === 'leftArm' && imgs[i+1].style.visibility === 'hidden'){
				imgs[i+1].style.visibility = 'visible';
			} else {
				imgs[i].style.visibility = 'visible';
			}
			setTimeout(function(){
				if(hasLost()){
					alert('You Lose! The word was ' + this.word + '.');
					start();
			}});
			break;
		}
	}
}

function hasLost(){
	var imgs = document.getElementsByTagName("img");
	for(var i = 0; i < imgs.length ; i++){
		if(imgs[i].style.visibility === 'hidden'){
			return false;
		}
	}
	return true;
}

function hideHangman(){
	var imgs = document.getElementsByTagName("img");
	for(var i = 0; i < imgs.length ; i++){
		imgs[i].style.visibility = 'hidden';
	}
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