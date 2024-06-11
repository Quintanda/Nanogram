// Save gameInfo at local storage
function saveLocalStorage() {
	localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
}

// Get saved gameInfo at local storage
function getLocalStorage() {

	// If gameInfo is saved
	if (localStorage.getItem('gameInfo')) {
		gameInfo = JSON.parse(localStorage.getItem('gameInfo'));//Parse string into object
		return gameInfo;
	}
	// If game info is not saved 
	else {
		return {// Default gameInfo
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

// Add into gameInfo and save at local storage
function setGameInfo(name, info){
	gameInfo[name] = info;
	saveLocalStorage();
}

// Remove something from gameInfo
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
	
	saveLocalStorage(); // Save at local storage
}
