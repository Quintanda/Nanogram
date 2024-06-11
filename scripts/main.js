//Squares
const content = document.getElementById('content');

//Auxiliar
let selectedBtn = "square";

var difficult = 0;

//Take Saved Config
var savedTested = JSON.parse(localStorage.getItem('tested'));


var gameInfo = getLocalStorage();



// Document starts !!!!
document.addEventListener("DOMContentLoaded", (event) => {


    // Load game
    loadGame()

    
    
    // Wait all the load to show the main content
    document.getElementById('main').classList.remove('initialize');

});


//Square click event
function squareEvent(squareElement) { 
    // Run set tested
    setTested(squareElement.getAttribute('index'))

    let allTrue = gameInfo.tested.every(value => value === "true");
    // If lifes is 0
    if (gameInfo.lifes == 0) { lostGame('in');}
    // If all squares is tested 
    else if(allTrue){ winGame('in')} 
    

    //Test Update Numbers
    updateNumbers(squareElement);
    autoComplete(squareElement);
    saveLocalStorage();
}

//Switch button !!!!
function switchButton(button) {
    
    playAudio('block');

    //Update variable
    selectedBtn = button;

    //If square clicked
    if (button == "square"){

        //Add square selection
        changeStyle(document.getElementById('button-square'), "selected");
        document.getElementById('button-square').children[0].src = 'img/square.png';

        //Remove X selection
        changeStyle(document.getElementById("button-x"), "selected", true)
        document.getElementById('button-x').children[0].src = 'img/no-x.png';

    }

    //If X clicked
    else{

        //Add x selection
        changeStyle(document.getElementById('button-x'), "selected");
        document.getElementById('button-x').children[0].src = 'img/x.png';

        //Remove square selection
        changeStyle(document.getElementById("button-square"), "selected", true);
        document.getElementById('button-square').children[0].src = 'img/no-square.png';

    }
}

async function tryAgain() {
    playAudio('block')
    restoreGameInfo(false, false, true, false, true, false, true, true);
    
    // Wait 150 ms
    await wait(150);
    location.reload();
}

async function skipLevel() {
    playAudio('block')
    restoreGameInfo(true, false, true, true, true, true, true, true);
    
    // Wait 150 ms
    await wait(150);
    location.reload();
}

//Set the level !!!!
async function setLevel(level, levelNumber) {
    playAudio('block')
    setGameInfo('level', level);
    setGameInfo('levelNumber', levelNumber);
    restoreGameInfo(true, false, true, true, true, true, true, true)
    
    // Wait 150 ms
    await wait(150);
    location.reload();
}



function playAudio(name){
    let audio = document.getElementById(name);
    audio.currentTime = 0;
    audio.play();

}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}