// Call all the functions to load the game
function loadGame() {

    createSquare(); // Clone the squares

    //If there's not saved config
    if (gameInfo.new == true){
        createConfig(); // Create new squares and x's positions
        getInitialX(); // Create and set new initial x's positions
    }
    //if is saved config
    else{
        getTested() // Get the saved tested 
        setInitialX() // Set the saved initial x's positions
    }

    setIndexTested(); // Set squares index and squares tested to false if is undefined
    setNumbers(); // Set rows and column numbers
    setStyle(); // Set the level style
    setLife(); // Set life hearts
    setUpdatedNumbers() // Update the numbers style

}

// Set the square[index] to tested and change style
function setTested(index) {

        let square = document.querySelectorAll("div.square");

        //If square clicked and square selected
        if (gameInfo.sorx[index] == "square" && selectedBtn == "square" && gameInfo.tested[index] != "true") {
            
            changeStyle(square[index], 'right-square');// Change style to blue

            gameInfo.tested[index] = "true";// Save tested in gameInfo
            saveLocalStorage();// Save gameInfo at local storage

            playAudio('block');// Play audio
        }


        //If x clicked and x selected
        else if(gameInfo.sorx[index] == "x" && selectedBtn == "x" && gameInfo.tested[index] != "true"){
            
            changeImage(square[index], "img/x.png");// Put the x.png in the square

            gameInfo.tested[index] = "true";// Save tested in gameInfo
            saveLocalStorage();// Save gameInfo at local storage

            playAudio('block');// Play audio
        }

        //If square clicked and x selected
        else if (gameInfo.sorx[index] == "square" && selectedBtn == "x" && gameInfo.tested[index] != "true") {

            changeStyle(square[index], 'wrong-square');// Change style to red

            gameInfo.tested[index] = "true";// Save tested in gameInfo
            saveLocalStorage();// Save gameInfo at local storage
            
            playAudio('wrong');// Play audio block

            return reduceLife();// Reduce the life with reduceLife() function
        } 

        //If x clicked and square selected
        else if (gameInfo.sorx[index] == "x" && selectedBtn == "square" && gameInfo.tested[index] != "true") {  

            
            changeImage(square[index], "img/xError.png");// Put the xError.png in the square

            gameInfo.tested[index] = "true";// Save tested in gameInfo
            saveLocalStorage();// Save gameInfo at local storage

            playAudio('wrong');// Play audio block

            return reduceLife();// Reduce the life with reduceLife() function
        }
}

// Reduce the life
function reduceLife(){
    changeImage(document.getElementById("life"+gameInfo.lifes), "img/no-heart.png");// Change heart image to no-heart.png
    setGameInfo('lifes', gameInfo.lifes - 1);// Reduce gameInfo.lifes and save it at local storage
}

// Restore the life
function setLife(){

    for (let i = 1; i < gameInfo.lifes+1; i++){

        document.getElementById("life"+i).src = 'img/heart.png';// Put the heart.png at <img>
    }
}



