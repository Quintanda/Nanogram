let selectedBtn = "square";// Auxiliar
var gameInfo = getLocalStorage();// All local storage saved



// When document is started
document.addEventListener("DOMContentLoaded", (event) => {

    loadGame();// Load all functions to load game   
    document.getElementById('main').classList.remove('initialize');// Wait all the load to show the main content

});


// When Square is clicked
function squareEvent(squareElement) { 
    
    setTested(squareElement.getAttribute('index'));// Set clicked square to tested and change style

    let allTrue = gameInfo.tested.every(value => value === "true");// Return true if is all squares tested
    if (gameInfo.lifes == 0) { lostGame('in');}// If lifes is 0
    else if(allTrue){ winGame('in')}// If all squares is tested
    
    updateNumbers(squareElement);// Try to update numbers style
    autoComplete(squareElement);// Try to auto complete x's
    saveLocalStorage();// Save gameInfo at local storage
}

// When switch button is clicked
function switchButton(button) {
    
    playAudio('block'); // Play audio

    
    selectedBtn = button; //Update auxiliar variable

    // If square is clicked
    if (button == "square"){

        // Change the square style to selected
        changeStyle(document.getElementById('button-square'), "selected");
        document.getElementById('button-square').children[0].src = 'img/square.png';

        // Change the x style to not selected
        changeStyle(document.getElementById("button-x"), "selected", true)
        document.getElementById('button-x').children[0].src = 'img/no-x.png';

    }

    // If X is clicked
    else{

        // Change the X style to selected
        changeStyle(document.getElementById('button-x'), "selected");
        document.getElementById('button-x').children[0].src = 'img/x.png';

        // Change the X style to not selected
        changeStyle(document.getElementById("button-square"), "selected", true);
        document.getElementById('button-square').children[0].src = 'img/no-square.png';

    }
}

// When restart button is clicked
async function tryAgain() {

    playAudio('block')// play audio
    restoreGameInfo(false, false, true, false, true, false, true, true); // Restore lifes, tested, numbersUp, numbersLeft
    
    // Wait 150ms
    await wait(150);
    location.reload();
}

// When skip button is clicked
async function skipLevel() {

    playAudio('block')// play audio
    restoreGameInfo(true, false, true, true, true, true, true, true);// Restore newGame, lifes, sorx, tested, x, numbersLeft, numbersUp
    
    // Wait 150 ms
    await wait(150);
    location.reload();
}

// When normal/hard button is clicked
async function setLevel(level, levelNumber) {

    playAudio('block')// play audio
    setGameInfo('level', level);// Change gameInfo.level
    setGameInfo('levelNumber', levelNumber);// Change gameInfo.levelNumber
    restoreGameInfo(true, false, true, true, true, true, true, true)// Restore newGame, lifes, sorx, tested, x, numbersLeft, numbersUp
    
    // Wait 150 ms
    await wait(150);
    location.reload();
}


// Used to play the sounds
function playAudio(name){
    let audio = document.getElementById(name);
    audio.currentTime = 0;
    audio.play();
}

// Used to wait
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}