//Clone Squares !!!!
function createSquare(){

		//Select existing up, left and main squares
		let numbersUp = document.getElementById('numbers-up');
		let numbersLeft = document.getElementById('numbers-left');
		let squaresUp = document.getElementById('numbers-square-up');
		let squaresLeft = document.getElementById('numbers-square-left');
		let square = document.getElementById('square')

		for (var i = 0; i < gameInfo.levelNumber-1; i++){

				// Clone the left squares
	            var clone = squaresLeft.cloneNode(true);
	            numbersLeft.appendChild(clone);
	            
	            //Clone the up squares
	            clone = squaresUp.cloneNode(true);
	            numbersUp.appendChild(clone);

	    }

	    for (var i = 0; i < gameInfo.levelNumber**2-1; i++){
	    		//Clone Squares
	            clone = square.cloneNode(true);
	            content.appendChild(clone);

	    }
}

//Set Style !!!!
function setStyle(){

	//Select All Up/Left/Squares
	let squareUp = document.querySelectorAll('[id="numbers-square-up"]');
	let squareLeft = document.querySelectorAll('[id="numbers-square-left"]');
	let square = document.querySelectorAll('div.square');

	squareUp.forEach(function(element) {
		//Set Up Squares Style
    	element.classList.add("numbers-square-up-"+gameInfo.level);
	});

	squareLeft.forEach(function(element) {
		//Set Left Squares Style
    	element.classList.add("numbers-square-left-"+gameInfo.level);
	});

	square.forEach(function(element) {
		//Set Squares Style
    	element.classList.add("square-"+gameInfo.level);
	});
	

	setBorder();
}

// Set Border !!!!
function setBorder(){

	let w = gameInfo.levelNumber;

	//Select All Squares
    let square = document.querySelectorAll('div.square');

    //Outside Border
    for (var i = 0; i < w; i++){
        square[i].style.borderTop = "2px solid #182C3C";
        square[i*w+w-1].style.borderRight = "2px solid #182C3C";
        square[w*w-i-1].style.borderBottom = "2px solid #182C3C";
        square[i*w].style.borderLeft = "2px solid #182C3C";
    }

    //Inside Border
    for (var i = 5; i < w*w; i+=5){
    	//Y axis
    	square[i].style.borderLeft = "2px solid #182C3C";
    }
    for (var i = 1; i != w/5; i++){
    	//X axis
    	for (var a = 0; a < w; a++){
    		square[i*5*w+a].style.borderTop = "2px solid #182C3C";
    	}
    }
    //Radius Border
    square[0].style.borderTopLeftRadius = "5px"
    square[w-1].style.borderTopRightRadius = "5px"
    square[w*w-w].style.borderBottomLeftRadius = "5px"
    square[w*w-1].style.borderBottomRightRadius = "5px"
}
//--------------------------------------------------------------

//Configure Level !!!!
function createConfig() {

	// Where will be saved the config
    let sorx = [];

    for (let i = 0; i < gameInfo.levelNumber**2; i++){

        // Generate a random number
        let randomNumber = Math.random();

        // Set random square and x
        sorx[i] = (randomNumber > 0.5) ? 'square' : 'x';

        //Set all squares to tested false
        gameInfo.tested[i] = "false";
    }
    //Save Config Level
   	setGameInfo('sorx', sorx)
   	setGameInfo('new', false)
}

//Set config !!!!
function setConfig() {

	//Select All Squares
    let square = document.querySelectorAll('div.square');

    for (let i = 0; i < gameInfo.sorx.length; i++){

    	//Set Current Square Equal Saved Square
    	square[i].setAttribute("sorx", gameInfo.sorx[i]);
    	//square[i].textContent = gameInfo.sorx[i];//TEST TEST TEST TEST
    }
}

//Get saved tested !!!!
function getTested() {

    // If tested is saved
	if(gameInfo.tested != ""){

		// Select all squares
    	let square = document.querySelectorAll('div.square');

		for(let i = 0; i < gameInfo.levelNumber**2; i++){
				
			// If is square
			if(gameInfo.tested[i] == "true" && gameInfo.sorx[i] == "square"){

				//Change Style
	            square[i].style.backgroundColor = "#182C3C";
	            square[i].style.border = "none";

	            //Set Tested = True
	            square[i].setAttribute("tested", "true");
			}
			// If is X
			else if(gameInfo.tested[i] == "true" && gameInfo.sorx[i] == "x" && square[i].childElementCount == 0){
				//Set X src
	            let xIcon = document.createElement("img");
	            xIcon.src="img/x.png"

	            //Change Style
	            square[i].appendChild(xIcon);

	            //Set Tested = True
	            square[i].setAttribute("tested", "true");

			}
		}
	}
}

//Set Numbers !!!!
function setNumbers (){

	//Select All Up/Left
    let squareUp = document.querySelectorAll('[id="numbers-square-up"]');
    let squareLeft = document.querySelectorAll('[id="numbers-square-left"]');

	for (let i = 0; i < gameInfo.levelNumber; i++){

		let trueSquaresUp = 0; // True Y axis squares
		let trueSquaresLeft = 0; // True X axis squares

		for (let a = 0; a < gameInfo.levelNumber; a++){

			// If true in Y axis
			if (gameInfo.sorx[a*gameInfo.levelNumber+i] == "square") {
				
				// Increase Y axis squares
				trueSquaresUp++

				//If is the last square in Y axis
				if (a == gameInfo.levelNumber-1){
				
					// Create span
					createSpan(squareUp[i], trueSquaresUp);

					trueSquaresUp = 0;
				}

			}
			// If false in Y axis
			else {
				
				// If True Y axis squares > 0
				if (trueSquaresUp > 0){

					// Create span
					createSpan(squareUp[i], trueSquaresUp);

					trueSquaresUp = 0;
				}
			}

			// If true in X axis
			if (gameInfo.sorx[a+gameInfo.levelNumber*i] == "square"){
				
				// Increase X axis squares
				trueSquaresLeft++

				//If is the last square in X axis
				if (a == gameInfo.levelNumber-1){


					// Create span
					createSpan(squareLeft[i], trueSquaresLeft);

					trueSquaresLeft = 0;
				}

			}

			// If false in X axis
			else {
				
				// If True X axis squares > 0
				if (trueSquaresLeft > 0){

					//Create span
					createSpan(squareLeft[i], trueSquaresLeft);

					trueSquaresLeft = 0;
				}

			}

		}
	}
}

//Lost Game !!!!
function lostGame(inout) {

	// If inout = in
	if (inout == "in"){

		//Add Lost Class
		changeStyle(document.getElementById('alert'), "alert-anim");
		changeStyle(document.getElementById('header'), "body-lost-game");
		changeStyle(document.getElementById('main'), "body-lost-game");
    }

    // If inout == out
    else if(inout == "out"){

    	//Remove Lost Class
    	changeStyle(document.getElementById('alert'), "alert-anim", true);
		changeStyle(document.getElementById('header'), "body-lost-game", true);
		changeStyle(document.getElementById('main'), "body-lost-game", true);
    }
}

//Win Game !!!!
function winGame(inout) {

	// If inout = in
	if (inout == "in"){

		//Add Lost Class
		changeStyle(document.getElementById('win'), "alert-anim");
		changeStyle(document.getElementById('header'), "body-lost-game");
		changeStyle(document.getElementById('main'), "body-lost-game");
    }

    // If inout == out
    else if(inout == "out"){

    	//Remove Lost Class
    	changeStyle(document.getElementById('win'), "alert-anim", true);
		changeStyle(document.getElementById('header'), "body-lost-game", true);
		changeStyle(document.getElementById('main'), "body-lost-game", true);
    }
}

// Update numbers color !!!!
function updateNumbers(thisSquare){

	square = document.querySelectorAll('div.square')
	let thisSquareIndex = parseInt(thisSquare.getAttribute('index'));
	let indexRow = Math.floor(thisSquareIndex / gameInfo.levelNumber)
	let indexColunm = thisSquareIndex % gameInfo.levelNumber
	
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
	}

	
	colorNumber(gameInfo.sorx[thisSquareIndex])
}

// Set saved updated numbers
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

function getInitialX(){

	for (let i = 0; i < gameInfo.levelNumber; i++){
		while(true){
			let randomNumber = Math.floor(Math.random() * gameInfo.levelNumber**2-1)
			if (gameInfo.sorx[randomNumber] == 'x' && gameInfo.tested[randomNumber] != "true"){

				gameInfo.x[randomNumber] = 'true';
				break;
			}
		}
	}
	setInitialX();
}

function setInitialX(){
	for (i = 0; i < gameInfo.levelNumber**2; i++){
	
	// Select all squares
    let square = document.querySelectorAll('div.square');
		
		if (gameInfo.x[i] == "true" && square[i].childElementCount == 0){


			//Set X src
	        let xIcon = document.createElement("img");
	        xIcon.src="img/x.png"

	        //Change Style
	        square[i].appendChild(xIcon);

	        //Set Tested = True
	        square[i].setAttribute("tested", "true");
	        gameInfo.tested[i] = "true";
		}	
	}
	saveLocalStorage();
}

function autoComplete(thisSquare){

	let square = document.querySelectorAll('div.square')
	let thisSquareIndex = parseInt(thisSquare.getAttribute('index'));
	let indexRow = Math.floor(thisSquareIndex / gameInfo.levelNumber)
	let indexColunm = thisSquareIndex % gameInfo.levelNumber
	let audioPlays;

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
	// Row
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
	
	getTested();
	setUpdatedNumbers();
	saveLocalStorage();
}