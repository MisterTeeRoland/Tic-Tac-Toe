class Game {
	constructor() {
		this.game = {};
		this.moves = 0;
		this.win = false;
		this.diff = null;

		this.player = new Player();
		this.comp = new Player();

		this.container = document.getElementById("gamespace");
		this.howtoplay = new HowToPlay(this.container);
		this.gamecontrols = new GameControls(this.container);
		this.board = new Board(this.container);
		this.scoreboard = new Scoreboard(this.container);
				
		this.init();
	}

	init() {
		document.getElementById("date").innerHTML = new Date().getFullYear();
		this.createGameElements();
		this.createEventHandlers();
		this.changeSettings();
	}

	createGameElements() {
		this.createSettingsArea();
	}

	createEventHandlers() {

		//need settings clicks
		document.getElementById("letter").addEventListener("click", this.handleSettings.bind(this));
		document.getElementById("diff").addEventListener("click", this.handleSettings.bind(this));
		document.getElementById("start").addEventListener("click", this.handleSettings.bind(this));

		//need board clicks
		document.getElementById("board").addEventListener("click", this.handleBoard.bind(this));

		//need new game clicks
		document.getElementById("play").addEventListener("click", this.handleGame.bind(this));
	}

	createSettingsArea() {
		var node = document.createElement("div");
		node.setAttribute("id", "letter");
		node.innerHTML = `
			<div>Your Character</div>
			<button data-action='set_letter' data-character='x'>X</button>
			<button data-action='set_letter' data-character='o'>O</button>
		`;

		this.container.appendChild(node);

		node = document.createElement("div");
		node.setAttribute("id", "diff");
		node.innerHTML = `
			<div>Difficulty</div>
			<button data-action="set_difficulty" data-difficulty="easy">Easy</button>
			<button data-action="set_difficulty" data-difficulty="hard">Hard</button>
		`;

		this.container.appendChild(node);

		node = document.createElement("div");
		node.setAttribute("id", "start");
		node.setAttribute("data-action", "start_game");
		node.innerHTML = `
			<button data-action="start_game">Start Game</button>
		`;

		this.container.appendChild(node);
	}

	handleSettings(e) {
		switch (e.target.dataset.action) {
			case "set_letter":
				this.setLetter(e.target.dataset.character);
				document.querySelectorAll('[data-action="set_letter"').forEach((ele) => ele.classList.remove('active'));
				e.target.classList.add('active');
				break;
			case "set_difficulty":
				this.setDiff(e.target.dataset.difficulty);
				document.querySelectorAll('[data-action="set_difficulty"').forEach((ele) => ele.classList.remove('active'));
				e.target.classList.add('active');
				break;
			case "start_game":
				if (this.diff && this.player.letter) {
					this.startGame();
				}
				break;
		}
	}

	handleGame(e) {
		switch (e.target.dataset.action) {
			case "new_game":
				this.newGame();
				this.startGame();
				break;
			case "change_settings":
				this.changeSettings();
				break;
		}
	}

	handleBoard(e) {
		switch (e.target.dataset.action) {
			case "move":
				this.tryMove(e.target.dataset.square);
				break;
		}
	}

	newGame() {
		this.board.clear();
		this.moves = 0;
		this.win = false;
		this.hideAll();
		this.setDiff(this.diff);
	}

	hideAll() {
		this.howtoplay.hide();
		document.getElementById("letter").classList.add("hide");
		document.getElementById("diff").classList.add("hide");
		document.getElementById("start").classList.add("hide");
		document.getElementById("game").classList.add("hide");
		this.scoreboard.hide();
		document.getElementById("result").classList.add("hide");
		document.getElementById("play").classList.add("hide");
	}

	changeSettings() {
		this.win = false;
		this.moves = 0;
		this.board.clear();
		this.clearSettings();
		this.hideAll();

		document.querySelectorAll("[data-action='set_letter']").forEach((ele) => {ele.classList.remove("active")});
		document.querySelectorAll("[data-action='set_difficulty']").forEach((ele) => {ele.classList.remove("active")});

		document.getElementById("diff").classList.remove("hide");
		document.getElementById("start").classList.remove("hide");
		document.getElementById("howtoplay").classList.remove("hide");
		document.getElementById("letter").classList.remove("hide");
	}

	startGame() {

		document.querySelector("#board caption").innerHTML = `
			You: ${this.player.letter.toUpperCase()} | Computer: ${this.comp.letter.toUpperCase()} | Difficulty: ${(this.diff == 'easy' ? "Easy" : "Hard")}
		`;
	
		this.hideAll();
		document.getElementById("play").classList.remove("hide");
		document.getElementById("gameboard").classList.remove("hide");
		document.getElementById("game").classList.remove("hide");
	
		//if playing on hard, let computer move first
		if (this.diff == 'hard') this.compMove();
	}

	clearSettings() {
		this.player.letter = null;
		this.comp.letter = null;
		this.diff = null;
	}

	setLetter(letter) {
		this.player.letter = letter;
		if (letter == 'x') this.comp.letter = 'o';
		else this.comp.letter = 'x';
	}

	setDiff(diff) {
		this.diff = diff;
	}

	tryMove(id) {

		if (this.win == false) {
			
			//only place piece if square is empty.
			if(this.board.squares[id].empty) {
				this.board.addMove(id, this.player.letter);
				this.moves++;
	
				//only check for a win if more than three moves and no win
				if (this.moves >= 3 && !this.win)	this.checkWin();
	
				//if still no winner and there are moves left, make computer move.
				if (!this.win && this.moves <= 8)	this.compMove();
			}
		}
	}

	compMove() {
		this.comp.makeMove(this);
		this.moves++;
		if (this.moves >= 3 && !this.win) {
			this.checkWin();
		}
	}

	placeCompMove(id) {
		document.getElementById(id).innerHTML = `<img src='img/${this.comp.letter}.png' class='animated flipInX'>`;
		this.squares[id].empty = false;
		this.squares[id].letter = this.comp.letter;	
		this.moves++;
	}

	checkWin() {

		var winningLetter = this.board.checkWin();		
	
		if (winningLetter) {
			this.showWin(winningLetter);
		}

		//all spaces filled and no win == tie
		if (!winningLetter && this.moves == 9) {
			this.showTie();
			if (this.diff == 'easy') {
				this.player.easy.ties++;
				this.player.easy.played++;
			}
			else {
				this.player.hard.ties++;
				this.player.hard.played++;
			}
			this.scoreboard.updateScoreboard(this.player);
		}
	}

	showTie() {
		//nobody won, but game needs to stop playing
		this.win = true;
		this.scoreboard.showResult(`Tie!`);
		this.scoreboard.show();
	}

	showWin(letter) {
		this.win = true;
		
		//player is winning letter
		if (this.player.letter == letter) {
			this.scoreboard.showResult(`You Won!`);
			if (this.diff == 'easy') {
				this.player.easy.wins++;
				this.player.easy.played++;
			}
			else {
				this.player.hard.wins++;
				this.player.hard.played++;
			}
		}
	
		//computer is winning letter
		else if(this.comp.letter == letter) {
			this.scoreboard.showResult(`You Lost!`);
			this.scoreboard.show();
			if (this.diff == 'easy') {
				this.player.easy.losses++;
				this.player.easy.played++;
			}
			else {
				this.player.hard.losses++;
				this.player.hard.played++;
			}
		}

		this.scoreboard.show();
	
		document.getElementById("result").classList.remove("hide");
		this.scoreboard.updateScoreboard(this.player);
	}
}

class Player {
	constructor() {
		this.letter = null;
		this.easy = {
			wins: 0,
			ties: 0,
			losses: 0,
			played: 0
		};
		this.hard = {
			wins: 0,
			ties: 0,
			losses: 0,
			played: 0,
		}
	}

	makeMove(game) {

		var id = null;

		//easy move difficulty
		if (game.diff == 'easy') {
			
			var moved = false;
			
			//until the computer has made a valid move
			while (!moved) {
			
				//finds a random number, places image at that spot (if empty.)
				var cMove = Math.floor(Math.random()*9);
				if (game.board.squares[cMove].empty) {
					id = cMove;
					moved = true;
				}
			}
		}
	
		//hard move difficulty
		else {
			
			var moved = false;
			
			//until the computer has made a valid move
			while (!moved) {
				
				//if more than 3 game moves, make a "smart" move
				if (game.moves >= 3) {
					id = game.board.checkMove(game.comp.letter);
					if (id == 0) {
						id = game.board.checkMove(game.player.letter);
					}
					if (id > 0) {
						moved = true;
						break;
					}
				}

				//otherwise, make a random move
				var cMove = Math.floor(Math.random()*9);
				if (game.board.squares[cMove].empty) {
					id = cMove;
					moved = true;
				}
			}
		}

		//make the move
		game.board.addMove(id, game.comp.letter);
		game.board.squares[id].empty = false;
		game.board.squares[id].letter = game.comp.letter;	
	}
}

class HowToPlay {
	constructor(container) {
		this.container = container;
		this.element = this.createElement();
		this.init();
	}
	
	init() {
		this.container.appendChild(this.element);
	}

	createElement() {
		var node = document.createElement("div");
		node.setAttribute("id", "howtoplay");
		node.innerHTML = `
			<h2>How To Play</h2>
			<div>Select X or O.</div>
			<div>Select difficulty.</div>
			<div>Select squares.</div>
			<div>Win.</div>
		`;
		return node;
	}

	show() {
		this.element.classList.remove("hide");
	}

	hide() {
		this.element.classList.add("hide");
	}
}

class Board {
	constructor(container) {
		var one = {}, two = {}, three = {}, four = {}, five = {}, six = {}, seven = {}, eight = {}, nine = {};
		this.squares = [one, two, three, four, five, six, seven, eight, nine];
		this.squareArray = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

		this.container = container;
		this.element = this.createElement();
		this.init();
	}

	init() {
		this.container.appendChild(this.element);
	}

	createElement() {
		var node = document.createElement("div");
		node.setAttribute("id", "gameboard");
		node.classList.add("hide");

		node.innerHTML = `
			<div id="game" class='hide'>
				<table id="board">
					<caption></caption>
					<tr>
						<td id="0" data-action="move" data-square="0"></td>
						<td id="1" data-action="move" data-square="1"></td>
						<td id="2" data-action="move" data-square="2"></td>
					</tr>
					<tr>
						<td id="3" data-action="move" data-square="3"></td>
						<td id="4" data-action="move" data-square="4"></td>
						<td id="5" data-action="move" data-square="5"></td>
					</tr>
					<tr>
						<td id="6" data-action="move" data-square="6"></td>
						<td id="7" data-action="move" data-square="7"></td>
						<td id="8" data-action="move" data-square="8"></td>
					</tr>
				</table>
			</div>
		`;

		return node;
	}

	checkMove(letter) {

		for (var i = 0; i < this.squareArray.length; i++) {
			
			var first = this.squareArray[i][0];
			var second = this.squareArray[i][1];
			var third = this.squareArray[i][2];

			//top right empty
			if ((this.squares[first].letter == letter) && (this.squares[second].letter == letter) && (this.squares[third].letter == null) && (this.squares[first].letter != null)) {
				return third;
			}
			
			//top middle empty
			else if ((this.squares[first].letter == letter) && (this.squares[third].letter == letter) && (this.squares[second].letter == null) && (this.squares[first].letter != null)) {
				return second;
			}
			
			//top left empty
			else if ((this.squares[second].letter == letter) && (this.squares[third].letter == letter) && (this.squares[first].letter == null) && (this.squares[second].letter != null)) {
				return first;
			}
		}
	
		return 0;
	}

	checkWin() {
		for (var i = 0; i < this.squareArray.length; i++) {
			
			var first = this.squareArray[i][0];
			var second = this.squareArray[i][1];
			var third = this.squareArray[i][2];
	
			//three in a row, someone has won
			if (this.squares[first].letter == this.squares[second].letter && this.squares[second].letter == this.squares[third].letter && this.squares[first].letter != '') {
				return this.squares[first].letter;
			}
		}
		return null;
	}

	addMove(id, letter) {
		document.getElementById(id).innerHTML = `<img src='img/${letter}.png' class='animated flipInX'>`;
		this.squares[id].empty = false;
		this.squares[id].letter = letter;
	}

	clear() {
		//fills board pieces with "empty" tag and a blank letter
		for (var i = 0; i < this.squares.length; i++) {
			this.squares[i].empty = true;
			this.squares[i].letter = null;
			document.getElementById(i).innerHTML = "";
		}
	}

	show() {
		this.element.classList.remove("hide");
	}

	hide() {
		this.element.classList.add("hide");
	}
}

class Scoreboard {
	constructor(container) {
		this.container = document.getElementById("game");
		this.element = this.createElement();
		this.init();
		this.scoreboard = document.getElementById("scoreboard");
		this.scorelist = document.getElementById("scoreList");
	}

	init() {
		this.container.appendChild(this.element);
	}

	createElement() {
		var node = document.createElement("div");
		node.setAttribute("id", "scoreboard");
		node.innerHTML = `
			<h2 id='result'></h2>
			<div>SCOREBOARD</div>
			<div id='scoreList'></div>
		`;
		return node;
	}

	updateScoreboard(player) {
		var winPercent = Math.round(((player.easy.wins + player.hard.wins) / (player.easy.played + player.hard.played)) * 100);
		this.scorelist.innerHTML = `
			Easy wins: ${player.easy.wins}<br> 
			Hard wins: ${player.hard.wins}<br><hr>
			Games played: ${(player.easy.played + player.hard.played)} (${winPercent}%)
		`;
	}

	showResult(string) {
		document.getElementById("result").innerHTML = string;
		document.getElementById("result").classList.remove("hide");
	}

	show() {
		this.scoreboard.classList.remove("hide");
	}

	hide() {
		this.scoreboard.classList.add("hide");
	}
}

class GameControls {
	constructor(container) {
		this.container = container;
		this.element = this.createElement();
		this.init();
	}

	init() {
		this.container.appendChild(this.element);
	}

	createElement() {
		var node = document.createElement("div");
		node.setAttribute("id", "play");
		node.innerHTML = `
			<button data-action="new_game">New Game</button> 
			<button data-action="change_settings">Change Settings</button>
		`;
		return node;
	}
}

new Game();