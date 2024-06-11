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

//Set Style
function setStyle(){

	let squareUp = document.querySelectorAll('[id="numbers-square-up"]');// All up numbers squares within container
	let squareLeft = document.querySelectorAll('[id="numbers-square-left"]');// All left numbers squares within container
	let square = document.querySelectorAll('div.square');// All main squares

	squareUp.forEach(function(element) {
    	element.classList.add("numbers-square-up-"+gameInfo.level);//Set numbers up squares style by the level
	});

	squareLeft.forEach(function(element) {
    	element.classList.add("numbers-square-left-"+gameInfo.level);//Set numbers left squares style by the level
	});

	square.forEach(function(element) {
    	element.classList.add("square-"+gameInfo.level);//Set main squares style by the level
	});

	setBorder();// Set the outside and x/y axis border
}

// Set outside and x/y axis border 
function setBorder(){

	let n = gameInfo.levelNumber;// Current level number

    let square = document.querySelectorAll('div.square');// All main squares

    //Outside Border
    for (var i = 0; i < n; i++){
        square[i].style.borderTop = "2px solid #182C3C";
        square[i*n+n-1].style.borderRight = "2px solid #182C3C";
        square[n*n-i-1].style.borderBottom = "2px solid #182C3C";
        square[i*n].style.borderLeft = "2px solid #182C3C";
    }

    //Inside Border
    for (var i = 5; i < n*n; i+=5){
    	//Y axis
    	square[i].style.borderLeft = "2px solid #182C3C";
    }
    for (var i = 1; i != n/5; i++){
    	//X axis
    	for (var a = 0; a < n; a++){
    		square[i*5*n+a].style.borderTop = "2px solid #182C3C";
    	}
    }

    //Radius Border
    square[0].style.borderTopLeftRadius = "5px";
    square[n-1].style.borderTopRightRadius = "5px";
    square[n*n-n].style.borderBottomLeftRadius = "5px";
    square[n*n-1].style.borderBottomRightRadius = "5px";
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

// Get saved gameInfo.tested
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

// Show and hide lost game alert
function lostGame(inout) {

	// If gameInfo.life is 0
	if (inout == "in"){

		// Add alert animation class to lost game alert
		changeStyle(document.getElementById('alert'), "alert-anim");
		changeStyle(document.getElementById('header'), "body-lost-game");
		changeStyle(document.getElementById('main'), "body-lost-game");
    }

    // If clicked on any lost game alert button
    else if(inout == "out"){

    	// Remove alert animation class from lost game alert
    	changeStyle(document.getElementById('alert'), "alert-anim", true);
		changeStyle(document.getElementById('header'), "body-lost-game", true);
		changeStyle(document.getElementById('main'), "body-lost-game", true);
    }
}

//Win Game !!!!
function winGame(inout) {

	// If gameInfo.tested is all true
	if (inout == "in"){

		// Add alert animation class to win game alert
		changeStyle(document.getElementById('win'), "alert-anim");
		changeStyle(document.getElementById('header'), "body-lost-game");
		changeStyle(document.getElementById('main'), "body-lost-game");
    }

    // If inout == out
    else if(inout == "out"){

    	// Remove alert animation class from lost game alert
    	changeStyle(document.getElementById('win'), "alert-anim", true);
		changeStyle(document.getElementById('header'), "body-lost-game", true);
		changeStyle(document.getElementById('main'), "body-lost-game", true);
    }
}

// Set numbers color by clicked square
function updateNumbers(thisSquare){

	square = document.querySelectorAll('div.square')// All main squares
	let thisSquareIndex = parseInt(thisSquare.getAttribute('index'));// Index of thisSquare
	let indexRow = Math.floor(thisSquareIndex / gameInfo.levelNumber)// Respective row
	let indexColunm = thisSquareIndex % gameInfo.levelNumber// Respective column
	
	// Count how much squares is tested in the row sequence
	function rowSequence(index){	
		let countLeft = 0;
		let countRight = 0;
		let xIndexLeft;
		let xIndexRight;

		for (let i = index -1; i >= indexRow*gameInfo.levelNumber; i--){
			
			if(gameInfo.sorx[i] == "square"){
				
				if (gameInfo.tested[i] == "true"){
					countLeft++
				}
				else{
					break;
				}
			} 
			else{
				xIndexLeft = i;
				break;
			} 
		}

		for (let i = index +1; i < indexRow*gameInfo.levelNumber + gameInfo.levelNumber; i++){
			
			if(gameInfo.sorx[i] == "square"){

				if (gameInfo.tested[i] == "true"){
					countRight++
				}
				else{
					break;
				}
			}
			else{
				xIndexRight = i;
				break;
			} 
		}

		return [countLeft, countRight, xIndexLeft, xIndexRight];
	}

	// Count how much squares is tested in the colunm sequence
	function colunmSequence(index){
		let countUp = 0;
		let countDown = 0;
		let xIndexUp;
		let xIndexDown;

		for (let i = index - gameInfo.levelNumber; i >=0; i-=gameInfo.levelNumber){

			if(gameInfo.sorx[i] == "square"){

				if (gameInfo.tested[i] == "true"){
					countUp++
				}
				else{
					break;
				}
			}
			else{
				xIndexUp = i;
				break;
			}
		}

		for (let i = index + gameInfo.levelNumber; i <= indexColunm+gameInfo.levelNumber**2-gameInfo.levelNumber; i+=gameInfo.levelNumber){
			
			if(gameInfo.sorx[i] == "square"){

				if (gameInfo.tested[i] == "true"){
					countDown++
				}
				else{
					break;
				}	
			}
			else{
				xIndexDown = i;
				break;
			}
		}

		return [countUp, countDown, xIndexUp, xIndexDown];
	} 
	
	// Get the position of the respective thisSquare sequence 
	function sequencePosition(index){

		let positionRow = -1;
		let positionColunm = -1;
		let a;
		for (let i = indexRow*gameInfo.levelNumber; i <= index; i++){

			if (gameInfo.sorx[i] == "square"){
				a = true;
			}
			else if(a){
				positionRow++; a = false;
			}
		} if (a) positionRow++

		a = false;
		for (let i = indexColunm; i <= index; i+=gameInfo.levelNumber){

			if (gameInfo.sorx[i] == "square"){
				a = true;
			}
			else if(a){
				positionColunm++; a = false;
			}
		} if (a) positionColunm++

		return [positionRow, positionColunm];
	}

	// Color the respective number of the column and row
	function colorNumber(sorx){

		let sequenceRow = rowSequence(thisSquareIndex);
		let sequenceColunm = colunmSequence(thisSquareIndex);
		let positionSequence = sequencePosition(thisSquareIndex);

		// For the square
		if (sorx == 'square'){

			// For the row
			let spanNumber = document.getElementById('numbers-left').children[indexRow].children[positionSequence[0]];

			if (sequenceRow[0] + sequenceRow[1] + 1 == parseInt(spanNumber.textContent)){

				if (gameInfo.tested[sequenceRow[2]] == "true" && gameInfo.tested[sequenceRow[3]] == "true"){
					
					changeStyle(spanNumber, 'numbers-selected');
					
					// Save span
					gameInfo.numbersLeft.push(indexRow, positionSequence[0]);
					saveLocalStorage();
				}
				else if (gameInfo.tested[sequenceRow[2]] == undefined || gameInfo.tested[sequenceRow[3]] == undefined){
					
					changeStyle(spanNumber, 'numbers-selected');

					// Save span
					gameInfo.numbersLeft.push(indexRow, positionSequence[0]);
					saveLocalStorage();

				}

			}

			// For the colunm
			spanNumber = document.getElementById('numbers-up').children[indexColunm].children[positionSequence[1]];

			if (sequenceColunm[0] + sequenceColunm[1] + 1 == parseInt(spanNumber.textContent)){

				if(gameInfo.tested[sequenceColunm[2]] == "true" && gameInfo.tested[sequenceColunm[3]] == "true"){
					
					changeStyle(spanNumber, 'numbers-selected');

					// Save span
					gameInfo.numbersUp.push(indexColunm, positionSequence[1]);
					saveLocalStorage();
				}
				else if (gameInfo.tested[sequenceColunm[2]] == undefined || gameInfo.tested[sequenceColunm[3]] == undefined){

					changeStyle(spanNumber, 'numbers-selected');

					// Save span
					gameInfo.numbersUp.push(indexColunm, positionSequence[1]);
					saveLocalStorage();
				}

			}
		}
		// For the X
		else if (sorx == 'x'){

				// To left
				if (sequenceRow[0] != 0){

					spanNumber = document.getElementById('numbers-left').children[indexRow].children[positionSequence[0]];

					if (sequenceRow[0] == parseInt(spanNumber.textContent) && gameInfo.tested[rowSequence(thisSquareIndex-1)[2]] == "true"){
						
						changeStyle(spanNumber, 'numbers-selected');

						// Save span
						gameInfo.numbersLeft.push(indexRow, positionSequence[0]);
						saveLocalStorage();
					}
				}

				// To right
				if (sequenceRow[1] != 0){

					spanNumber = document.getElementById('numbers-left').children[indexRow].children[positionSequence[0]+1];
					
					if (sequenceRow[1] == parseInt(spanNumber.textContent) && gameInfo.tested[rowSequence(thisSquareIndex+1)[3]] == "true"){
						
						changeStyle(spanNumber, 'numbers-selected');

						// Save span
						gameInfo.numbersLeft.push(indexRow, positionSequence[0]+1);
						saveLocalStorage();
					}
				}

				// To up
				if (sequenceColunm[0] != 0){

					spanNumber = document.getElementById('numbers-up').children[indexColunm].children[positionSequence[1]];

					if (sequenceColunm[0] == parseInt(spanNumber.textContent) && gameInfo.tested[colunmSequence(thisSquareIndex-gameInfo.levelNumber)[2]] == "true"){
						
						changeStyle(spanNumber, 'numbers-selected');

						// Save span
						gameInfo.numbersUp.push(indexColunm, positionSequence[1]);
						saveLocalStorage();
					}
				}

				// To down
				if (sequenceColunm[1] != 0){

					spanNumber = document.getElementById('numbers-up').children[indexColunm].children[positionSequence[1]+1];
					
					if (sequenceColunm[1] == parseInt(spanNumber.textContent) && gameInfo.tested[colunmSequence(thisSquareIndex+gameInfo.levelNumber)[3]] == "true"){
						
						changeStyle(spanNumber, 'numbers-selected');

						// Save span
						gameInfo.numbersUp.push(indexColunm, positionSequence[1]+1);
						saveLocalStorage();
					}
				}
		}
	} colorNumber(gameInfo.sorx[thisSquareIndex])// Color the respective number of the column and row
}

// Set colored numbers by gameInfo.numbersLeft and gameInfo.numbersUp
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

// Auto complete the x's when the all the row and column squares is filled
function autoComplete(thisSquare){

	let square = document.querySelectorAll('div.square')// All main squares
	let thisSquareIndex = parseInt(thisSquare.getAttribute('index'));// thisSquare index
	let indexRow = Math.floor(thisSquareIndex / gameInfo.levelNumber)// thisSquare row
	let indexColunm = thisSquareIndex % gameInfo.levelNumber// thisSquare column

	// Row
	let a = true;
	for (let i = indexRow*gameInfo.levelNumber; i < indexRow*gameInfo.levelNumber+gameInfo.levelNumber; i++){

		if (gameInfo.sorx[i] == "square" && gameInfo.tested[i] == "false"){

			a = false;
		}
	}
	if (a){
		for (let i = indexRow*gameInfo.levelNumber; i < indexRow*gameInfo.levelNumber+gameInfo.levelNumber; i++){
			if (gameInfo.sorx[i] == "x" && gameInfo.tested[i] == "false"){
				gameInfo.tested[i] = "true";
				updateNumbers(square[i]);
			}
		}	
	}

	// Column
	a = true;
	for (let i = indexColunm; i < gameInfo.levelNumber**2; i += gameInfo.levelNumber){

		if (gameInfo.sorx[i] == "square" && gameInfo.tested[i] == "false"){
			
			a = false;
		}
	}
	if (a){
		for (let i = indexColunm; i < gameInfo.levelNumber**2; i += gameInfo.levelNumber){

			if (gameInfo.sorx[i] == "x" && gameInfo.tested[i] == "false"){

				gameInfo.tested[i] = "true";
				updateNumbers(square[i]);
			}
		}	
	}
	
	getTested(); // Set x's images
	setUpdatedNumbers(); // Color the up and left numbers
	saveLocalStorage(); // Save gameInfo at local storage
}