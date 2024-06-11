// Clone main squares and the numbers squares
function createSquare(){

		let numbersUp = document.getElementById('numbers-up');// Number up container
		let numbersLeft = document.getElementById('numbers-left');// Number left container
		let squaresUp = document.getElementById('numbers-square-up');// Square number up within container
		let squaresLeft = document.getElementById('numbers-square-left');// Square number left within container
		let square = document.getElementById('square')// Main square

		for (var i = 0; i < gameInfo.levelNumber-1; i++){

				// Clone the left squares
	            var clone = squaresLeft.cloneNode(true);
	            numbersLeft.appendChild(clone);
	            
	            //Clone the up squares
	            clone = squaresUp.cloneNode(true);
	            numbersUp.appendChild(clone);

	    }

	    for (var i = 0; i < gameInfo.levelNumber**2-1; i++){
	    		
	    		//Clone the main quares
	            clone = square.cloneNode(true);
	            content.appendChild(clone);

	    }
}

//Create a new squares or x's positions
function createConfig() {

    let sorx = [];// Square or X

    for (let i = 0; i < gameInfo.levelNumber**2; i++){

        let randomNumber = Math.random();// Generate a random number
        sorx[i] = (randomNumber > 0.5) ? 'square' : 'x';// Set square or x by the random number
        gameInfo.tested[i] = "false";// Set gameInfo.tested to "false"
    }

   	setGameInfo('sorx', sorx); // Set gameInfo.sorx to sorx and save it at local storage
   	setGameInfo('new', false); // Set gameInfo.new to false and save it at local storage
}

// Set rows and column numbers
function setNumbers (){

    let squareUp = document.querySelectorAll('[id="numbers-square-up"]');// All up numbers squares
    let squareLeft = document.querySelectorAll('[id="numbers-square-left"]');// All left numbers squares

	for (let i = 0; i < gameInfo.levelNumber; i++){

		let trueSquaresUp = 0; // True column squares count
		let trueSquaresLeft = 0; // True row squares count

		for (let a = 0; a < gameInfo.levelNumber; a++){

			// If true in column
			if (gameInfo.sorx[a*gameInfo.levelNumber+i] == "square") {
				
				trueSquaresUp++// Increase column squares count

				//If is the column last square
				if (a == gameInfo.levelNumber-1){
				
					createSpan(squareUp[i], trueSquaresUp); // Create and append span in the up number square
					trueSquaresUp = 0;// Reset true column squares count
				}

			}
			// If false in column
			else {
				
				// If true column squares count > 0
				if (trueSquaresUp > 0){

					createSpan(squareUp[i], trueSquaresUp);// Create and append span in the up number square
					trueSquaresUp = 0;// Reset true column squares count
				}
			}

			// If true in row
			if (gameInfo.sorx[a+gameInfo.levelNumber*i] == "square"){
				
				trueSquaresLeft++// Increase true row squares count

				//If is the row last square
				if (a == gameInfo.levelNumber-1){

					// Create span
					createSpan(squareLeft[i], trueSquaresLeft);// Create and append span in the left number square
					trueSquaresLeft = 0;// Reset true column squares count
				}

			}

			// If false in row
			else {
				
				// If true row squares count > 0
				if (trueSquaresLeft > 0){

					createSpan(squareLeft[i], trueSquaresLeft);// Create and append span in the left number square
					trueSquaresLeft = 0;// Reset true column squares count
				}

			}

		}
	}
}

// Create, append and set span text
function createSpan(parent, text){
	let spanElement = document.createElement('span');
	spanElement.textContent = text;
	parent.appendChild(spanElement);
}

// Create and set new initial x's positions
function getInitialX(){

	for (let i = 0; i < gameInfo.levelNumber; i++){
		while(true){
			let randomNumber = Math.floor(Math.random() * gameInfo.levelNumber**2-1)
			if (gameInfo.sorx[randomNumber] == 'x' && gameInfo.tested[randomNumber] != "true"){

				gameInfo.x[randomNumber] = 'true';// Save the x position at the gameInfo.x 
				break;
			}
		}
	}
	setInitialX();// Set the saved initial x's positions
}

// Set the saved initial x's positions
function setInitialX(){
	for (i = 0; i < gameInfo.levelNumber**2; i++){
	
    let square = document.querySelectorAll('div.square');// All squares
		
		if (gameInfo.x[i] == "true" && square[i].childElementCount == 0){

	        changeImage(square[i], "img/x.png");// Append x.png to square
	        gameInfo.tested[i] = "true";// Set gameInfo.tested to tested
		}	
	}
	saveLocalStorage(); // Save gameInfo at local storage
}

// Restore the life
function setLife(){

    for (let i = 1; i < gameInfo.lifes+1; i++){

        document.getElementById("life"+i).src = 'img/heart.png';// Put the heart.png at <img>
    }
}

// Set main squares index and tested
function setIndexTested(){
	let square = document.querySelectorAll('div.square');// All main squares
	
	for (let i = 0; i < gameInfo.levelNumber**2; i++){
		square[i].setAttribute('index', i);
        if (gameInfo.tested[i] != "true") gameInfo.tested[i] = "false"
		
	}
}

// Set colored numbers by saved gameInfo.numbersLeft and gameInfo.numbersUp
function setUpdatedNumbers(){

	if (gameInfo.numbersLeft != ""){
		for (let i = 0; i < gameInfo.numbersLeft.length; i+=2){
			let spanNumber = document.getElementById('numbers-left').children[gameInfo.numbersLeft[i]].children[gameInfo.numbersLeft[i+1]];
			changeStyle(spanNumber, 'numbers-selected');
		}
	}
	if (gameInfo.numbersUp != ""){
		for (let i = 0; i < gameInfo.numbersUp.length; i+=2){
			let spanNumber = document.getElementById('numbers-up').children[gameInfo.numbersUp[i]].children[gameInfo.numbersUp[i+1]];
			changeStyle(spanNumber, 'numbers-selected');
		}
	}
}

// Get saved gameInfo.tested and set styles
function getTested() {

    // If gameInfo.tested is saved
    if(gameInfo.tested != ""){

        let square = document.querySelectorAll('div.square');// All main squares

        // Repeat for all main squares
        for(let i = 0; i < gameInfo.levelNumber**2; i++){
                
            // If square and tested true
            if(gameInfo.tested[i] == "true" && gameInfo.sorx[i] == "square"){

                changeStyle(square[i], "blue-square")// Change square to blue style

            }
            // If x, tested true, and there's no image
            else if(gameInfo.tested[i] == "true" && gameInfo.sorx[i] == "x" && square[i].childElementCount == 0){

                changeImage(square[i], "img/x.png");// Append x.png to square

            }
        }
    }
}