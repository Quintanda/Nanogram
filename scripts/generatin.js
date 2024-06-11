// Call all the functions to load the game
function loadGame() {

    createSquare(); // Clone the squares

    //If there's not saved config
    if (gameInfo.new == true){
        createConfig(); // Create new squares and x's positions
        setConfig(); // Set the squares and x's positions
        getInitialX(); // Create new initial x's positions
    }
    //if is saved config
    else{
        setConfig(); // Set the saved squares and x's positions
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
            
            changeStyle(square[index], 'right-square')// Change style to blue

            square[index].setAttribute("tested", "true");// Set tested to true
            gameInfo.tested[index] = "true"; // Save tested in gameInfo
            saveLocalStorage();// Save gameInfo at local storage

            playAudio('block'); // Play audio
        }


        //If x clicked and x selected
        else if(gameInfo.sorx[index] == "x" && selectedBtn == "x" && gameInfo.tested[index] != "true"){

            
            changeImage(square[index], "img/x.png")// Put the x.png in the square

            square[index].setAttribute("tested", "true");// Set Tested = True

            gameInfo.tested[index] = "true";
            saveLocalStorage();

            playAudio('block'); // Play audio block
        }

        //If SQUARE and X
        else if (gameInfo.sorx[index] == "square" && selectedBtn == "x" && gameInfo.tested[index] != "true") {

            //Change Style
            changeStyle(square[index], 'wrong-square');console.log('here')

            //Set Tested = True
            square[index].setAttribute("tested", "true");

            gameInfo.tested[index] = "true";
            saveLocalStorage();
            
            playAudio('wrong'); // Play audio block

            //Return True (Reduce Life)
            return reduceLife();
        } 

        //If X and Square
        else if (gameInfo.sorx[index] == "x" && selectedBtn == "square" && gameInfo.tested[index] != "true") {  

            //Change Img
            changeImage(square[index], "img/xError.png")

            //Set Tested = True
            square[index].setAttribute("tested", "true");

            gameInfo.tested[index] = "true";
            saveLocalStorage();

            playAudio('wrong'); // Play audio block

            //Return True (Reduce Life)
            return reduceLife();
        }
}

//Reduce Life CALLED BY setTested() !!!!
function reduceLife(){


    changeImage(document.getElementById("life"+gameInfo.lifes), "img/no-heart.png")
    setGameInfo('lifes', gameInfo.lifes - 1);

}

//Restore Life !!!!
function setLife(){

    for (let i = 1; i < gameInfo.lifes+1; i++){

        document.getElementById("life"+i).src = 'img/heart.png'       
    }
}



