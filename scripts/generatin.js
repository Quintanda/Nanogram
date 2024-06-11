//Load All !!!!
function loadGame() {

    createSquare(); // Create Squares

    //If is not saved config
    if (gameInfo.new == true){
        createConfig(); // Create new config
        setConfig(); // Set config
        getInitialX(); // Get the initial X
    }
    //if is saved config
    else{
        setConfig(); // Set config
        getTested() // Get saved tested 
        setInitialX() // Set the initial x
    }
    setIndexTested(); // Set squares index and tested
    setNumbers(); // Set numbers
    setStyle(); //Set style style
    setLife(); // Set life hearts
    setUpdatedNumbers() // Update Numbers
    //Some functions need it
    difficult = gameInfo.levelNumber; 
}

//Set Correct/False
function setTested(index) {

        let square = document.querySelectorAll("div.square");

        //If SQUARE and SQUARE 
        if (gameInfo.sorx[index] == "square" && selectedBtn == "square" && gameInfo.tested[index] != "true") {

            //Change Style
            changeStyle(square[index], 'right-square')

            //Set Tested = True
            square[index].setAttribute("tested", "true");

            gameInfo.tested[index] = "true";
            saveLocalStorage();

            playAudio('block'); // Play audio block
        }


        //If X and X
        else if(gameInfo.sorx[index] == "x" && selectedBtn == "x" && gameInfo.tested[index] != "true"){

            //Change Img
            changeImage(square[index], "img/x.png")

            //Set Tested = True
            square[index].setAttribute("tested", "true");

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



