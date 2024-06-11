// Save game info in local storage
function saveLocalStorage() {
	localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
}

// Get saved game info in local storage
function getLocalStorage() {

	// If game info is saved
	if (localStorage.getItem('gameInfo')) {
		//Parse string into object
		gameInfo = JSON.parse(localStorage.getItem('gameInfo'));

		return gameInfo;
	}
	// If game info is not saved 
	else {
		return {
				new: true,
    			level: 'easy',
    			levelNumber: 10,
   				lifes: 4,
    			sorx : undefined,
    			tested : [],
    			x : [],
    			numbersLeft : [],
    			numbersUp : [],
				}
	}
}

// Add info into game info and save
function setGameInfo(name, info){
	gameInfo[name] = info;
	saveLocalStorage();
}

function restoreGameInfo(newGame, level, lifes, sorx, tested, x, numbersLeft, numbersUp){

	if (newGame){
		gameInfo.new = true;
	}

	if (level) {
		gameInfo.level = 'easy';
		gameInfo.levelNumber = 10;
	}

	if (lifes) {
		gameInfo.lifes = 4;
	}

	if (sorx) {
		gameInfo.sorx = undefined;
	}

	if (tested) {
		gameInfo.tested = [];
	}

	if (x) {
		gameInfo.x = [];
	}
	
	if (numbersLeft) {
		gameInfo.numbersLeft = [];
	}

	if (numbersUp) {
		gameInfo.numbersUp = [];
	}
	
	saveLocalStorage();
}


//-----------------------------------//


function createSpan(parent, text){
	//Create Span
	let spanElement = document.createElement('span');
	spanElement.textContent = text; 
	parent.appendChild(spanElement);
}

function changeStyle(element, style, remove){
	
	if (remove){
		element.classList.remove(style)
	}
	else {
		element.classList.add(style)
	}
	

}

function changeImage(element, source){
    

    if (element.tagName == "IMG"){
    	element.src = source
    }
    else {
    	let img = document.createElement("img");
		img.src = source
    	element.appendChild(img);
    }
    
}

function setIndexTested(){

	let square = document.querySelectorAll('div.square');
	for (let i = 0; i < gameInfo.levelNumber**2; i++){

		square[i].setAttribute('index', i)

		//Set all squares to tested false
        if (gameInfo.tested[i] != "true") gameInfo.tested[i] = "false"
		
	}
}