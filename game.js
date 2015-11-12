var player = {};
var comp = {};
var game = {};
var moves = 0;
var win = false;

var one = {};
var two = {}, three = {}, four = {};
var five = {}, six = {}, seven = {}, eight = {}, nine = {};

var squares = [one, two, three, four, five, six, seven, eight, nine];


player.easyWins = 0;
player.hardWins = 0;
player.gamesPlayed = 0;



//function to start the game after choosing letter and difficulty.
function startGame()
{
	$('#game').show();
	$('#start').hide();
	$('#newGame').show();
	$('#howTo').hide();

	if (game.diff === 'hard')
	{
		compMove();
	}
}

//function to start a new game
function newGame()
{
	clearBoard();
	clearSettings();
	$("#game").hide();
	$('#newGame').hide();
	$('#start').show();
	$('#letter').show();
	$('#howTo').show();
	$('#play').hide();
	win = false;
}




//function to clear board of any pieces (new game)
function clearBoard()
{
	//fills board pieces with "empty" tag and a blank letter
	for (var i = 0; i < squares.length; i++)
	{
		squares[i].empty = true;
		squares[i].letter = '';
	}
	$("#board td").html("");

	//resets moves to 0
	moves = 0;
}




//function to clear settings (new game)
function clearSettings()
{
	//resets player/computer letters and difficulty to ''
	player.letter = '';
	comp.letter = '';
	game.diff = '';
}


function setName()
{
	player.name = document.getElementById("name").value;
	$('#playerName').hide();
	$('#letter').show();
}


//function to set letter 
function setLetter(let)
{
	player.letter = let;

	//if player clicks 'x' button, sets letter to 'x'
	if (let === 'x')
	{
		comp.letter = 'o';
	}

	//sets letter to 'o'
	else if (let === 'o')
	{
		comp.letter = 'x';
	}
	$('#letter').hide();
	$('#diff').show();
}


//function to set difficulty 
function setDiff(diff)
{
	//assigns difficulty based on user click
	game.diff = diff;
	$('#diff').hide();
	$('#play').show();
}


//function to add a game piece to the board
function addImage(id)
{
	//creates an image element
	var img = document.createElement('img');

	//only place piece if square is empty.
	if(squares[id].empty)
	{
		//if player picked 'x', place an X
		if(player.letter === 'x')
		{
			//define image element and add to square
			img.src = "x.png";
			document.getElementById(id).appendChild(img);
			
			//set the square id to 'false' and letter to 'x'
			squares[id].empty = false;
			squares[id].letter = player.letter;	

			//increment move
			moves++;

			//only check for a win if more than three moves 
			//have been made and no one has won yet
			if (moves >= 3 && !win)
			{
				checkWin();
			}

			//if still no winner and there are moves left, make computer move.
			if (!win && moves <=8)
			{
				compMove(game.diff);
			}
		}

		//if player selected 'o', place an O
		else if (player.letter === 'o')
		{
			//set image element source and add to square
			img.src = "o.png";
			document.getElementById(id).appendChild(img);

			//sets square empty id to 'false' and letter to 'o'
			squares[id].empty = false;
			squares[id].letter = player.letter;	

			//increment move counter
			moves++;	

			//only check for win if more than three moves and no winner yet
			if (moves >= 3 && !win)
			{
				checkWin();
			}

			//if still no winner, make computer move
			if (!win && moves <=8)
			{
				compMove(game.diff);
			}
		}
		//tried to place a piece without selecting a letter
		else
		{
			alert("Please select a letter first!");
		}
	}
	//if square isn't empty, can't place a piece there
	else if (!squares[id].empty)
	{
		alert("Cannot place here. Not empty.");
	}

	//random handler ;)
	else
	{
		alert("Cannot place here, try again.");
	}
}



//function for the computer's move based on difficulty.
function compMove(difficulty)
{
	//alert("computer turn" + difficulty);
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

				//if computer letter is 'x', places an X
				if(comp.letter === 'x')
				{
					//sets image element source and places to square
					img.src = "x.png";
					document.getElementById(cMove).appendChild(img);
					
					//sets square empty id to 'false' and letter to 'x'
					squares[cMove].empty = false;
					squares[cMove].letter = comp.letter;	

					//increments move counter
					moves++;

					//only check for win if more than three moves and no winner yet
					if (moves >= 3 && !win)
					{
						checkWin();
					}
				}

				//if computer letter is 'o', places an O
				else if (comp.letter === 'o')
				{
					//sets image element source and places piece to board
					img.src = "o.png";
					document.getElementById(cMove).appendChild(img);
					
					//sets square empty id to 'false' and letter to 'o'
					squares[cMove].empty = false;
					squares[cMove].letter = comp.letter;	

					//increments move counter
					moves++;

					//only check for win if more than three moves and no winner yet
					if (moves >= 3 && !win)
					{
						checkWin();
					}
				}
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

				//if computer letter is 'x', places an X
				if(comp.letter === 'x')
				{
					//sets image element source and places to square
					img.src = "x.png";
					document.getElementById(cMove).appendChild(img);
					
					//sets square empty id to 'false' and letter to 'x'
					squares[cMove].empty = false;
					squares[cMove].letter = comp.letter;	

					//increments move counter
					moves++;

					//only check for win if more than three moves and no winner yet
					if (moves >= 3 && !win)
					{
						checkWin();
					}
				}

				//if computer letter is 'o', places an O
				else if (comp.letter === 'o')
				{
					//sets image element source and places piece to board
					img.src = "o.png";
					document.getElementById(cMove).appendChild(img);
					
					//sets square empty id to 'false' and letter to 'o'
					squares[cMove].empty = false;
					squares[cMove].letter = comp.letter;	

					//increments move counter
					moves++;

					//only check for win if more than three moves and no winner yet
					if (moves >= 3 && !win)
					{
						checkWin();
					}
				}
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
	{
		return false;
	}
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
	{
		return false;
	}
}



function placeCompMove(id)
{
	
	var img = document.createElement('img');
	
	if (comp.letter === 'x')
	{
		img.src = "x.png";
		document.getElementById(id).appendChild(img);
		
		//sets square empty id to 'false' and letter to 'x'
		squares[id].empty = false;
		squares[id].letter = comp.letter;	

		//increments move counter
		moves++;
	}
	else if (comp.letter === 'o')
	{
		img.src = "o.png";
		document.getElementById(id).appendChild(img);
		
		//sets square empty id to 'false' and letter to 'x'
		squares[id].empty = false;
		squares[id].letter = comp.letter;	

		//increments move counter
		moves++;
	}
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
			//game is finished, increment games played
			alert("The game is a tie. Try it again!");
			player.gamesPlayed++;
			updateScoreboard();
		}
	}
	
}



//function to show the results after someone has won
function showWin(let)
{
	//game is finished, increment games played
	player.gamesPlayed++;
	
	//player is winning letter
	if (player.letter === let)
	{
		alert("YOU WON! CONGRATULATIONS! :D");
		if (game.diff === 'easy')
		{
			player.easyWins++;
		}
		else if (game.diff === 'hard')
		{
			player.hardWins++;
		}
	}

	//computer is winning letter
	else if(comp.letter === let)
	{
		alert("Sorry, the computer won. Try it again!");
	}

	updateScoreboard();
}


//function to update the scoreboard after every game finishes
function updateScoreboard()
{
	//if this is a new player, create new list item
	if (player.gamesPlayed === 1)
	{
		$('#scoreList').append('<li><strong style="font-size: 150%">' + player.name + '</strong><br>Easy wins: ' + player.easyWins + '<br>Hard wins: ' + player.hardWins + '<br>Games played: ' + player.gamesPlayed + '</li>');
	}

	//otherwise, replace current list item with "updated" list item
	else
	{
		$('#scoreList li').replaceWith('<li><strong style="font-size: 150%">' + player.name + '</strong><br>Easy wins: ' + player.easyWins + '<br>Hard wins: ' + player.hardWins + ' <br>Games played: ' + player.gamesPlayed + '</li>');
	}
}



window.onload = function()
{
	clearBoard();
	$('#game').hide(); //hides game board
	$('#diff').hide(); //hides difficulty buttons
	$('#play').hide(); //hides play game buttons
	$('#newGame').hide();
	$('#letter').hide();
};