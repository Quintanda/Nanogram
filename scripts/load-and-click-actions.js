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

// Reduce the life
function reduceLife(){
    changeImage(document.getElementById("life"+gameInfo.lifes), "img/no-heart.png");// Change heart image to no-heart.png
    setGameInfo('lifes', gameInfo.lifes - 1);// Reduce gameInfo.lifes and save it at local storage
}