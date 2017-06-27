/*
	game.js
	Tyler Roland
	Modified 6/25/17
	Tic Tac Toe functionality
*/


var player = {}, comp = {}, game = {};
var moves = 0;
var win = false;

var one = {}, two = {}, three = {}, four = {}, five = {}, six = {}, seven = {}, eight = {}, nine = {};
var squares = [one, two, three, four, five, six, seven, eight, nine];
var squareArray = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

player.easyWins = 0;
player.hardWins = 0;
player.gamesPlayed = 0;

//function to start the game after choosing letter and difficulty.
function startGame() {
	
	hideAll();
	$("#play2").show();
	$("#gameboard").show();
	$("#game").show();

	//if playing on hard, let computer move first
	if (game.diff == 'hard') compMove();
}

//function to start a new game
function newGame() {
	
	clearBoard();
	clearSettings();
	hideAll();

	$("#desc").show();
	$("#howtoplay").show();
	$("#letter").show();
	
	win = false;
}

//function to hide all game elements
function hideAll() {
	
	$("#howtoplay").hide();
	$("#letter").hide();
	$("#diff").hide();
	$("#game").hide();
	$("#scoreboard").hide();
	$("#result").hide();
	$("#play2").hide();
}

//function to clear board of any pieces (new game)
function clearBoard() {
	
	//fills board pieces with "empty" tag and a blank letter
	for (var i = 0; i < squares.length; i++) {
		squares[i].empty = true;
		squares[i].letter = '';
		$("#"+i).html("");
	}
	
	moves = 0;
}

//function to clear settings (new game)
function clearSettings() {
	
	player.letter = '';
	comp.letter = '';
	game.diff = '';
}

//function to set letter 
function setLetter(let) {
	
	player.letter = let;

	if (let == 'x') 		comp.letter = 'o';
	else if (let == 'o') 	comp.letter = 'x';
	
	$("#letter").hide();
	$("#diff").show();
}

//function to set difficulty 
function setDiff(diff) {
	
	game.diff = diff;
	$("#diff").hide();
	startGame();
}

//function to add a game piece to the board
function addImage(id) {

	if (win == false) {
		
		//only place piece if square is empty.
		if(squares[id].empty) {
			
			$("#"+id).html("<img src='img/"+player.letter+".png'>");
			
			//current square is no longer empty, holds player letter
			squares[id].empty = false;
			squares[id].letter = player.letter;

			moves++;

			//only check for a win if more than three moves 
			//have been made and no one has won yet
			if (moves >= 3 && !win)	checkWin();

			//if still no winner and there are moves left, make computer move.
			if (!win && moves <=8)	compMove();
		}

		//if square isn't empty, can't place a piece there
		else if (!squares[id].empty)
			alert("Cannot place here. Not empty.");
	}
}

//function for the computer's move based on difficulty.
function compMove() {
	
	//easy move difficulty
	if (game.diff == 'easy') {
		
		var moved = false;
		
		//until the computer has made a valid move
		while (!moved) {
			
			//finds a random number, places image at that spot (if empty.)
			var cMove = Math.floor(Math.random()*9);
			
			//if chosen square is empty
			if(squares[cMove].empty) {
				
				$("#"+cMove).html("<img src='img/"+comp.letter+".png'>");

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

	//hard move difficulty
	else if (game.diff == 'hard') {
		
		var moved = false;
		
		//until the computer has made a valid move
		while (!moved) {
			
			if (moves >= 3) {
				
				if (checkMove(comp)) {
					
					moved = true;
					checkWin();
					break;
				}
				else if (checkMove(player)) {
					
					moved = true;
					checkWin();
					break;
				}
			}

			//finds a random number, places image at that spot (if empty.)
			var cMove = Math.floor(Math.random()*9);
			
			//if chosen square is empty
			if(squares[cMove].empty) {
				
				$("#"+cMove).html("<img src='img/"+comp.letter+".png'>");

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

//function to check for a computer move. Checks for block or win, depending on whose letter is passed through (player == block, comp == win)
function checkMove(whose) {

	for (var i = 0; i < squareArray.length; i++) {
		
		var first = squareArray[i][0];
		var second = squareArray[i][1];
		var third = squareArray[i][2];

		//top right empty
		if ((squares[first].letter == whose.letter) && (squares[second].letter == whose.letter) && (squares[third].letter == '') && (squares[first].letter != '')) {
			
			placeCompMove(third);
			return true;
		}
		
		//top middle empty
		else if ((squares[first].letter == whose.letter) && (squares[third].letter == whose.letter) && (squares[second].letter == '') && (squares[first].letter != '')) {
			
			placeCompMove(second);
			return true;
		}
		
		//top left empty
		else if ((squares[second].letter == whose.letter) && (squares[third].letter == whose.letter) && (squares[first].letter == '') && (squares[second].letter != '')) {
			
			placeCompMove(first);
			return true;
		}
	}

	return false;
}

//function to place computer piece at location.
function placeCompMove(id) {
	
	$("#"+id).html("<img src='img/"+comp.letter+".png'>");

	squares[id].empty = false;
	squares[id].letter = comp.letter;	

	moves++;
}

//function to check if someone has won
function checkWin() {

	for (var i = 0; i < squareArray.length; i++) {
		
		var first = squareArray[i][0];
		var second = squareArray[i][1];
		var third = squareArray[i][2];

		//three in a row, someone has won
		if (squares[first].letter == squares[second].letter && squares[second].letter == squares[third].letter && squares[first].letter != '') {
			
			showWin(squares[first].letter);
			win = true;
			return true;
		}
	}

	//all spaces filled and no win == tie
	if(moves == 9) {
		
		showTie();
		player.gamesPlayed++;
		updateScoreboard();
	}
}

//function to show a tie at the end of the game
function showTie() {
	
	win = true; //game is over, not necessarily won

	$("#result").html("The game is a tie. Try it again!").show();
	ShowScoreboard();
	
	$('body, html').animate({
		scrollTop: $("#result").offset().top
	});
}

//function to show the results after someone has won
function showWin(let) {
	
	player.gamesPlayed++;
	
	//player is winning letter
	if (player.letter == let) {
		
		$("#result").html("YOU WON!<br>CONGRATULATIONS! :D");
		ShowScoreboard();

		if (game.diff == 'easy') 		player.easyWins++;
		else if (game.diff == 'hard') 	player.hardWins++;
	}

	//computer is winning letter
	else if(comp.letter == let) {
		
		$("#result").html("Sorry, the computer won.<br>Try it again!");
		ShowScoreboard();
	}

	$("#result").show();
	updateScoreboard();

	$('body, html').animate({
		scrollTop: $("#result").offset().top
	});
}

//function to update the scoreboard after every game finishes
function updateScoreboard() {
	$("#scoreList").html('Easy wins: ' + player.easyWins + '<br>Hard wins: ' + player.hardWins + ' <br>Games played: ' + player.gamesPlayed);
}

window.onload = function() {
	newGame();
	$("#date").html(new Date().getFullYear());
};

//function to handle expanding the gameboard to make the scoreboard next to the game table
function ShowScoreboard() {
	$("#scoreboard").show();
}