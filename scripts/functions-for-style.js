// Change an element style or remove it
function changeStyle(element, style, remove){
	if (remove){
		element.classList.remove(style);
	}
	else {
		element.classList.add(style);
	}
}

// Create an image with src or set an <img> src
function changeImage(element, source){
    

    if (element.tagName == "IMG"){
    	element.src = source;
    }
    else {
    	let img = document.createElement("img");
		img.src = source;
    	element.appendChild(img);
    }  
}

// Set initial style
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

// Show and hide win game alert
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