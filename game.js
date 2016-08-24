var player = {};
var comp = {};
var game = {};
var moves = 0;
var win = false;

var one = {};
var two = {}, three = {}, four = {};
var five = {}, six = {}, seven = {}, eight = {}, nine = {};

var squares = [one, two, three, four, five, six, seven, eight, nine];

player.name = '';
player.easyWins = 0;
player.hardWins = 0;
player.gamesPlayed = 0;



//function to start the game after choosing letter and difficulty.
function startGame()
{
	document.getElementById("play").style.display = 'none';
	document.getElementById("play2").style.display = 'block';
	document.getElementById("howtoplay").style.display = 'none';
	document.getElementById("game").style.display = 'block';

	if (game.diff === 'hard')
		compMove();
}

//function to start a new game
function newGame()
{
	clearBoard();
	clearSettings();
	hideAll();

	document.getElementById('howtoplay').style.display = 'block';

	if (player.name == '')
		document.getElementById("yourname").style.display = 'block';
	else
		document.getElementById("letter").style.display = 'block';
	
	win = false;
}

function hideAll()
{
	document.getElementById('yourname').style.display = 'none';
	document.getElementById('howtoplay').style.display = 'none';
	document.getElementById('letter').style.display = 'none';
	document.getElementById('diff').style.display = 'none';
	document.getElementById('play').style.display = 'none';
	document.getElementById('game').style.display = 'none';
	document.getElementById('scoreboard').style.display = 'none';
	document.getElementById('result').style.display = 'none';
	document.getElementById('play').style.display = 'none';
	document.getElementById('play2').style.display = 'none';
}

//function to clear board of any pieces (new game)
function clearBoard()
{
	//fills board pieces with "empty" tag and a blank letter
	for (var i = 0; i < squares.length; i++)
	{
		squares[i].empty = true;
		squares[i].letter = '';
		document.getElementById(i).innerHTML = "";
	}
	moves = 0;
}

//function to clear settings (new game)
function clearSettings()
{
	player.letter = '';
	comp.letter = '';
	game.diff = '';
}

function setName()
{
	player.name = document.getElementById("name").value;
	document.getElementById("yourname").style.display = 'none';
	document.getElementById("letter").style.display = 'block';
}

//function to set letter 
function setLetter(let)
{
	player.letter = let;

	if (let === 'x')
		comp.letter = 'o';
	else if (let === 'o')
		comp.letter = 'x';
	
	document.getElementById('letter').style.display = 'none';
	document.getElementById('diff').style.display = 'block';
}

//function to set difficulty 
function setDiff(diff)
{
	game.diff = diff;

	document.getElementById('diff').style.display = 'none';
	document.getElementById('play').style.display = 'block';
}

//function to add a game piece to the board
function addImage(id)
{
	//creates an image element
	var img = document.createElement('img');

	//only place piece if square is empty.
	if(squares[id].empty)
	{
		img.src = player.letter+".png";
		document.getElementById(id).appendChild(img);
		
		//current square is no longer empty, holds player letter
		squares[id].empty = false;
		squares[id].letter = player.letter;

		moves++;

		//only check for a win if more than three moves 
		//have been made and no one has won yet
		if (moves >= 3 && !win)
			checkWin();

		//if still no winner and there are moves left, make computer move.
		if (!win && moves <=8)
			compMove(game.diff);
	}
	//if square isn't empty, can't place a piece there
	else if (!squares[id].empty)
		alert("Cannot place here. Not empty.");

	//random handler ;)
	else
		alert("Cannot place here, try again.");
}

//function for the computer's move based on difficulty.
function compMove(difficulty)
{
	//easy move difficulty
	if (game.diff === 'easy')
	{
		var moved = false;
		
		//until the computer has made a valid move
		while (!moved)
		{
			//finds a random number, places image at that spot (if empty.)
			var cMove = Math.floor(Math.random()*9);
			
			//if chosen square is empty
			if(squares[cMove].empty)
			{
				//creates an image element
				var img = document.createElement('img');
				img.src = comp.letter+".png";
				document.getElementById(cMove).appendChild(img);

				squares[cMove].empty = false;
				squares[cMove].letter = comp.letter;

				moves++;

				if (moves >= 3 && !win)
					checkWin();

				//computer has made a valid move
				moved = true;
			}
		}
	}

	//hard move difficulty  (NOT DONE YET)
	else if (game.diff === 'hard')
	{
		var moved = false;
		
		//until the computer has made a valid move
		while (!moved)
		{
			if (moves >= 3)
			{
				if (checkWinMove())
				{
					moved = true;
					checkWin();
					break;
				}

				else if (checkBlockMove())
				{
					moved = true;
					checkWin();
					break;
				}
			}

			//finds a random number, places image at that spot (if empty.)
			var cMove = Math.floor(Math.random()*9);
			
			//if chosen square is empty
			if(squares[cMove].empty)
			{
				//creates an image element
				var img = document.createElement('img');
				img.src = comp.letter+".png";
				document.getElementById(cMove).appendChild(img);

				squares[cMove].empty = false;
				squares[cMove].letter = comp.letter;

				moves++;

				if (moves >= 3 && !win)
					checkWin();

				//computer has made a valid move
				moved = true;
			}
		}
	}
}

function checkWinMove()
{
	//check top row

	//top right empty
	if ((squares[0].letter === comp.letter) && (squares[1].letter === comp.letter) && (square[2].letter === '') && (squares[0].letter != '')) 
	{
		placeCompMove(2);
		return true;
	}
	//top middle empty
	else if ((squares[0].letter === comp.letter) && (squares[2].letter === comp.letter) && (squares[1].letter === '') && (squares[0].letter != '')) 
	{
		placeCompMove(1);
		return true;
	}
	//top left empty
	else if ((squares[1].letter === comp.letter) && (squares[2].letter === comp.letter) && (squares[0].letter === '') && (squares[1].letter != ''))
	{
		placeCompMove(0);
		return true;
	}

	//check middle row

	//middle right empty
	else if (squares[3].letter === comp.letter && squares[4].letter === comp.letter && squares[5].letter === '' && squares[3].letter != '')
	{
		placeCompMove(5);
		return true;
	}
	//middle middle empty
	else if (squares[3].letter === comp.letter && squares[5].letter === comp.letter && squares[4].letter === '' && squares[3].letter != '')
	{
		placeCompMove(4);
		return true;
	}
	//middle left empty
	else if (squares[4].letter === comp.letter && squares[5].letter === comp.letter && squares[3].letter === '' && squares[4].letter != '')
	{
		placeCompMove(3);
		return true;
	}

	//check bottom row

	//bottom right empty
	else if (squares[6].letter === comp.letter && squares[7].letter === comp.letter && squares[8].letter === '' && squares[6].letter != '')
	{
		placeCompMove(8);
		return true;
	}
	//bottom middle empty
	else if (squares[6].letter === comp.letter && squares[8].letter === comp.letter && squares[7].letter === '' && squares[6].letter != '')
	{
		placeCompMove(7);
		return true;
	}
	//bottom left empty
	else if (squares[7].letter === comp.letter && squares[8].letter === comp.letter && squares[6].letter === '' && squares[7].letter != '')
	{
		placeCompMove(6);
		return true;
	}

	//check left column

	//left top empty
	else if (squares[3].letter === comp.letter && squares[6].letter === comp.letter && squares[0].letter === '' && squares[3].letter != '')
	{
		placeCompMove(0);
		return true;
	}
	//left middle empty
	else if (squares[0].letter === comp.letter && squares[6].letter === comp.letter && squares[3].letter === '' && squares[0].letter != '')
	{
		placeCompMove(3);
		return true;
	}
	//left bottom empty
	else if (squares[0].letter === comp.letter && squares[3].letter === comp.letter && squares[6].letter === '' && squares[0].letter != '')
	{
		placeCompMove(6);
		return true;
	}

	//check middle column

	//middle top empty
	else if (squares[4].letter === comp.letter && squares[7].letter === comp.letter && squares[1].letter === '' && squares[4].letter != '')
	{
		placeCompMove(1);
		return true;
	}
	//middle middle empty
	else if (squares[1].letter === comp.letter && squares[7].letter === comp.letter && squares[4].letter === '' && squares[1].letter != '')
	{
		placeCompMove(4);
		return true;
	}
	//middle bottom empty
	else if (squares[1].letter === comp.letter && squares[4].letter === comp.letter && squares[7].letter === '' && squares[1].letter != '')
	{
		placeCompMove(7);
		return true;
	}


	//check right column

	//right top empty
	else if (squares[5].letter === comp.letter && squares[8].letter === comp.letter && squares[2].letter === '' && squares[5].letter != '')
	{
		placeCompMove(2);
		return true;
	}
	//right middle empty
	else if (squares[2].letter === comp.letter && squares[8].letter === comp.letter && squares[5].letter === '' && squares[2].letter != '')
	{
		placeCompMove(5);
		return true;
	}
	//right bottom empty
	else if (squares[2].letter === comp.letter && squares[5].letter === comp.letter && squares[8].letter === '' && squares[2].letter != '')
	{
		placeCompMove(8);
		return true;
	}

	//check down-right diagonal

	//top left empty
	else if (squares[4].letter === comp.letter && squares[8].letter === comp.letter && squares[0].letter === '' && squares[4].letter != '')
	{
		placeCompMove(0);
		return true;
	}
	//middle middle empty
	else if (squares[0].letter === comp.letter && squares[8].letter === comp.letter && squares[4].letter === '' && squares[0].letter != '')
	{
		placeCompMove(4);
		return true;
	}
	//bottom right empty
	else if (squares[0].letter === comp.letter && squares[4].letter === comp.letter && squares[8].letter === '' && squares[0].letter != '')
	{
		placeCompMove(8);
		return true;
	}

	//check up-right diagonal

	//top right empty
	else if (squares[4].letter === comp.letter && squares[6].letter === comp.letter && squares[2].letter === '' && squares[6].letter != '')
	{
		placeCompMove(2);
		return true;
	}
	//middle middle empty
	else if (squares[2].letter === comp.letter && squares[6].letter === comp.letter && squares[4].letter === '' && squares[2].letter != '')
	{
		placeCompMove(4);
		return true;
	}
	//bottom left empty
	else if (squares[2].letter === comp.letter && squares[4].letter === comp.letter && squares[6].letter === '' && squares[2].letter != '')
	{
		placeCompMove(6);
		return true;
	}

	//no winning moves
	else
		return false;
}


//function to see if the computer can block the player from winning
function checkBlockMove()
{
	//check top row

	//top right empty
	if ((squares[0].letter === player.letter) && (squares[1].letter === player.letter) && (square[2].letter === '') && (squares[0].letter != '')) 
	{
		placeCompMove(2);
		return true;
	}
	//top middle empty
	else if ((squares[0].letter === player.letter) && (squares[2].letter === player.letter) && (squares[1].letter === '') && (squares[0].letter != '')) 
	{
		placeCompMove(1);
		return true;
	}
	//top left empty
	else if ((squares[1].letter === player.letter) && (squares[2].letter === player.letter) && (squares[0].letter === '') && (squares[1].letter != ''))
	{
		placeCompMove(0);
		return true;
	}

	//check middle row

	//middle right empty
	else if (squares[3].letter === player.letter && squares[4].letter === player.letter && squares[5].letter === '' && squares[3].letter != '')
	{
		placeCompMove(5);
		return true;
	}
	//middle middle empty
	else if (squares[3].letter === player.letter && squares[5].letter === player.letter && squares[4].letter === '' && squares[3].letter != '')
	{
		placeCompMove(4);
		return true;
	}
	//middle left empty
	else if (squares[4].letter === player.letter && squares[5].letter === player.letter && squares[3].letter === '' && squares[4].letter != '')
	{
		placeCompMove(3);
		return true;
	}

	//check bottom row

	//bottom right empty
	else if (squares[6].letter === player.letter && squares[7].letter === player.letter && squares[8].letter === '' && squares[6].letter != '')
	{
		placeCompMove(8);
		return true;
	}
	//bottom middle empty
	else if (squares[6].letter === player.letter && squares[8].letter === player.letter && squares[7].letter === '' && squares[6].letter != '')
	{
		placeCompMove(7);
		return true;
	}
	//bottom left empty
	else if (squares[7].letter === player.letter && squares[8].letter === player.letter && squares[6].letter === '' && squares[7].letter != '')
	{
		placeCompMove(6);
		return true;
	}

	//check left column

	//left top empty
	else if (squares[3].letter === player.letter && squares[6].letter === player.letter && squares[0].letter === '' && squares[3].letter != '')
	{
		placeCompMove(0);
		return true;
	}
	//left middle empty
	else if (squares[0].letter === player.letter && squares[6].letter === player.letter && squares[3].letter === '' && squares[0].letter != '')
	{
		placeCompMove(3);
		return true;
	}
	//left bottom empty
	else if (squares[0].letter === player.letter && squares[3].letter === player.letter && squares[6].letter === '' && squares[0].letter != '')
	{
		placeCompMove(6);
		return true;
	}

	//check middle column

	//middle top empty
	else if (squares[4].letter === player.letter && squares[7].letter === player.letter && squares[1].letter === '' && squares[4].letter != '')
	{
		placeCompMove(1);
		return true;
	}
	//middle middle empty
	else if (squares[1].letter === player.letter && squares[7].letter === player.letter && squares[4].letter === '' && squares[1].letter != '')
	{
		placeCompMove(4);
		return true;
	}
	//middle bottom empty
	else if (squares[1].letter === player.letter && squares[4].letter === player.letter && squares[7].letter === '' && squares[1].letter != '')
	{
		placeCompMove(7);
		return true;
	}

	//check right column

	//right top empty
	else if (squares[5].letter === player.letter && squares[8].letter === player.letter && squares[2].letter === '' && squares[5].letter != '')
	{
		placeCompMove(2);
		return true;
	}
	//right middle empty
	else if (squares[2].letter === player.letter && squares[8].letter === player.letter && squares[5].letter === '' && squares[2].letter != '')
	{
		placeCompMove(5);
		return true;
	}
	//right bottom empty
	else if (squares[2].letter === player.letter && squares[5].letter === player.letter && squares[8].letter === '' && squares[2].letter != '')
	{
		placeCompMove(8);
		return true;
	}

	//check down-right diagonal

	//top left empty
	else if (squares[4].letter === player.letter && squares[8].letter === player.letter && squares[0].letter === '' && squares[4].letter != '')
	{
		placeCompMove(0);
		return true;
	}
	//middle middle empty
	else if (squares[0].letter === player.letter && squares[8].letter === player.letter && squares[4].letter === '' && squares[0].letter != '')
	{
		placeCompMove(4);
		return true;
	}
	//bottom right empty
	else if (squares[0].letter === player.letter && squares[4].letter === player.letter && squares[8].letter === '' && squares[0].letter != '')
	{
		placeCompMove(8);
		return true;
	}

	//check up-right diagonal

	//top right empty
	else if (squares[4].letter === player.letter && squares[6].letter === player.letter && squares[2].letter === '' && squares[6].letter != '')
	{
		placeCompMove(2);
		return true;
	}
	//middle middle empty
	else if (squares[2].letter === player.letter && squares[6].letter === player.letter && squares[4].letter === '' && squares[2].letter != '')
	{
		placeCompMove(4);
		return true;
	}
	//bottom left empty
	else if (squares[2].letter === player.letter && squares[4].letter === player.letter && squares[6].letter === '' && squares[2].letter != '')
	{
		placeCompMove(6);
		return true;
	}

	//no winning moves
	else
		return false;
}

function placeCompMove(id)
{
	var img = document.createElement('img');
	img.src = comp.letter+".png";
	document.getElementById(id).appendChild(img);

	squares[id].empty = false;
	squares[id].letter = comp.letter;	

	moves++;
}

//function to check if someone has won
function checkWin()
{
	//if checkWin is returns true, check who each letter belongs to.

	//check top row
	if (squares[0].letter === squares[1].letter && squares[1].letter === squares[2].letter && squares[0].letter != '')
	{
		showWin(squares[0].letter);
		win = true;
		return true;
	}

	//check middle row
	else if (squares[3].letter === squares[4].letter && squares[4].letter === squares[5].letter && squares[3].letter != '')
	{
		showWin(squares[3].letter);
		win = true;
		return true;
	}

	//check bottom row
	else if ((squares[6].letter === squares[7].letter) && (squares[7].letter === squares[8].letter) && squares[6].letter != '')
	{
		showWin(squares[6].letter);
		win = true;
		return true;
	}

	//check left column
	else if (squares[0].letter === squares[3].letter && squares[3].letter === squares[6].letter && squares[0].letter != '')
	{
		showWin(squares[0].letter);
		win = true;
		return true;
	}

	//check middle column
	else if (squares[1].letter === squares[4].letter && squares[4].letter === squares[7].letter && squares[1].letter != '')
	{
		showWin(squares[1].letter);
		win = true;
		return true;
	}

	//check right column
	else if (squares[2].letter === squares[5].letter && squares[5].letter === squares[8].letter && squares[2].letter != '')
	{
		showWin(squares[2].letter);
		win = true;
		return true;
	}

	//check down-right diagonal
	else if (squares[0].letter === squares[4].letter && squares[4].letter === squares[8].letter && squares[0].letter != '')
	{
		showWin(squares[0].letter);
		win = true;
		return true;
	}

	//check up-right diagonal
	else if (squares[2].letter === squares[4].letter && squares[4].letter === squares[6].letter && squares[2].letter != 0)
	{
		showWin(squares[2].letter);
		win = true;
		return true;
	}

	else //not a winning move
	{
		if(moves === 9)  // all spaces filled and no win = tie
		{
			showTie();
			
			player.gamesPlayed++;
			updateScoreboard();
		}
	}
}

function showTie() {
	document.getElementById("result").innerHTML = "The game is a tie. Try it again!";
	document.getElementById("result").style.display = 'block';
	document.getElementById('scoreboard').style.display = 'block';
	document.getElementById('game').style.display = 'none';
}

//function to show the results after someone has won
function showWin(let)
{
	player.gamesPlayed++;
	
	//player is winning letter
	if (player.letter === let)
	{
		document.getElementById("result").innerHTML = "YOU WON!<br>CONGRATULATIONS! :D";

		document.getElementById('game').style.display = 'none';
		document.getElementById('scoreboard').style.display = 'block';

		if (game.diff === 'easy')
			player.easyWins++;
		else if (game.diff === 'hard')
			player.hardWins++;
	}

	//computer is winning letter
	else if(comp.letter === let)
	{
		document.getElementById('result').innerHTML = "Sorry, the computer won. Try it again!";

		document.getElementById('game').style.display = 'none';
		document.getElementById('scoreboard').style.display = 'block';
	}

	document.getElementById('result').style.display = 'block';

	updateScoreboard();
}

//function to update the scoreboard after every game finishes
function updateScoreboard()
{
	//if this is a new player, create new list item. otherwise, replace current list item with "updated" list item
	if (player.gamesPlayed === 1)
		document.getElementById("scoreList").innerHTML += '<li><strong style="font-size: 150%">' + player.name + '</strong><br>Easy wins: ' + player.easyWins + '<br>Hard wins: ' + player.hardWins + '<br>Games played: ' + player.gamesPlayed + '</li>';
	else
		document.getElementById("scoreList").innerHTML = '<li><strong style="font-size: 150%">' + player.name + '</strong><br>Easy wins: ' + player.easyWins + '<br>Hard wins: ' + player.hardWins + ' <br>Games played: ' + player.gamesPlayed + '</li>';
}

window.onload = function() {
	newGame();
	document.getElementById('date').innerHTML = new Date().getFullYear();
};