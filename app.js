/*****************************
****** Game Rules
*****************************/
/*
- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game.
*/

/*****************************
******Game Variables
*****************************/
var scores = [0,0];
var activePlayer = 0;
var dicePerviousNumber;



/*****************************
******  Game Methods
*****************************/

// Game Main Method
function game()
{
    gameRound();
   
}

// Method to Check Active Player and Add his Score
function gameRound()
{
     var diceNumber = diceRoll();
    
    // Check if Dice gets 1 or not
    if (diceNumber != 1)
        {
            scores[activePlayer] += diceNumber;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            diceImage(diceNumber);
        }
    // If Dice Number equals 1 
    else
        {
            diceImage(diceNumber);
            scores[activePlayer] = parseInt(document.getElementById('current-' + activePlayer).textContent,10);
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            hold();
        }
    
    
    
    if (dicePerviousNumber === 6 && diceNumber === 6)
        {
            resetPlayerScore(activePlayer);
            hold();
        }
    
    // Save Dice Pervious Number
    dicePerviousNumber = diceNumber;
}

// Method to Roll Dice
function diceRoll()
{
    // Dice Random Number From 1 - 6
    var dice = Math.floor(Math.random()*6) +1;
    return dice;
}

// Method to Hold Score and switchs players
function hold()
{
        var winScore = parseInt(document.querySelector('.finalScore').value,10);
        winScore = ((winScore === 0) ? (winScore = 100) : (winScore = winScore));    
    
    if (scores[activePlayer] >= winScore)
         {
              winGame(winScore);
         }
    else
        {
            // Save Player Score to ScoreArray
            document.getElementById('current-' + activePlayer).textContent = scores[activePlayer];

            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');

            //Inline If to Switch Player
            activePlayer = ((activePlayer===0) ? (activePlayer=1) : (activePlayer=0));

            document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
            
            dicePerviousNumber = 0;
        }
        
    
}

// Method to Start New Game 
function newGame()
{
    scores[0] = 0 ;
    scores[1] = 0;
    activePlayer = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.btn-roll').disabled = false;
    document.querySelector('.btn-hold').disabled = false;
    document.querySelector('.player-'+0+'-panel').classList.remove('winner');
    document.querySelector('.player-'+1+'-panel').classList.remove('winner');
    document.querySelector('.player-'+0+'-panel').classList.add('active');
    document.querySelector('.player-'+1+'-panel').classList.remove('active');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
}

// Method to Win Game
function winGame(score)
{
    
    if (scores[activePlayer] >= score)
        {
            document.querySelector('#name-'+activePlayer).textContent = 'Winner !';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.btn-roll').disabled = true;
            document.querySelector('.btn-hold').disabled = true;
        }
}

// Function to Change Dice Image on Dice Roll
function diceImage(diceNumber)
{
     var dice = document.querySelector('.dice');
     dice.style.display = 'block';
     dice.src = 'dice-'+ diceNumber +'.png';
}
     

// Method to Reset Player Score
function resetPlayerScore(PlayerNumber)
{
    scores[PlayerNumber] = 0;
    document.getElementById('score-' + PlayerNumber).textContent = scores[PlayerNumber];
    document.getElementById('current-' + PlayerNumber).textContent = scores[PlayerNumber];
    
}




/*****************************
******  Pop Up Windows 
******  Game Rule Window
*****************************/
function popitup(url,windowName) 
{
       newwindow=window.open(url,windowName,'height=500,width=1000');
       if (window.focus) {newwindow.focus()}
       return false;
 }