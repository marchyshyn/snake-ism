
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');
	var width = $('#canvas').width();
	var height = $('#canvas').height();
	var $score = $('.score');
	var $level = $('.level');
	var snakeSkin = new Image();
	snakeSkin.src = 'img/snake-skin2.png';
	var snakePattern = ctx.createPattern(snakeSkin, 'repeat');
	var apple = new Image();
	apple.src = 'img/apple.png';
	var applePattern = ctx.createPattern(apple, 'repeat');
	var grass = new Image();
	grass.src = 'img/grass2.png';
	var grassPattern = ctx.createPattern(grass, 'repeat');
	var cellSize = 10,
	direction,
	foodX,
	foodY,
	bonusX,
	bonusY,
	score,
	length = 5,
	upLevel = 10,
	speed = 120,
	level = 1,
	snakeArray;

	function init() {
		direction = 'right';
		score = 0;
		createSnake();
		createFood();
		loop = setInterval(paintSnake, speed);
	}

	function restart() {
		clearInterval(loop);
		$score.html('0');
		$level.html('1');
		direction = 'right';
		snakeArray = [];
		length = 5;
		upLevel = 10;
		speed = 120;
		createSnake();
		createFood();
		loop = setInterval(paintSnake, speed);
	}

	function setLoop(speed) {
		clearInterval(loop);
		loop = setInterval(paintSnake, speed);
	}

	function boom() {
		clearInterval(loop);
	}

	function levelUp() {
		var sc = parseInt($score.text());
		if(sc > upLevel){
			speed-=10;
			setLoop(speed);
			upLevel+=10;
			level++;
			$level.html(level);
		}
	}

	function eat() {
		plus = 1;
		score++;
		$score.html(score);
		reloadSnake();
		createFood();
		levelUp();
	}

	function reloadSnake() {
		var lastDot = snakeArray.pop();
		for (var i = plus; i>=0 ; i--) {
			snakeArray.push({x:lastDot.x, y:lastDot.y});
		};
	}

	function createSnake() {
		snakeArray = [];
		for (var i = length; i>=0 ; i--) {
			snakeArray.push({x:i, y:0});
		};
	}

	function createFood() {
		foodX = Math.floor((Math.random() * (width - cellSize) + cellSize) / 10);
		foodY = Math.floor((Math.random() * (width - cellSize) + cellSize) / 10);
	}

	// function bonus() {
	// 	bonusX = Math.floor((Math.random() * (width - cellSize) + cellSize) / 10);
	// 	bonusY = Math.floor((Math.random() * (width - cellSize) + cellSize) / 10);
	// }

	function paintFood() {
		ctx.fillStyle = applePattern;
		ctx.fillRect(foodX*cellSize, foodY*cellSize, cellSize, cellSize);
	}

	// function paintBonus() {
	// 	ctx.fillStyle = '#333';
	// 	ctx.fillRect(bonusX*cellSize, bonusY*cellSize, cellSize, cellSize);
	// }

	function paintSnake(){
		ctx.fillStyle = grassPattern;
		ctx.fillRect(0, 0, width, height);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(0, 0, width, height);
		var nx = snakeArray[0].x;
		var ny = snakeArray[0].y;
		if(direction == 'right'){
			nx++;
		}
		else if(direction == 'left'){
			nx--;
		}
		else if(direction == 'up') {
			ny--;
		}
		else if(direction == 'down'){
			ny++;
		}
		var tail = snakeArray.pop();
		tail.x = nx;
		tail.y = ny;
		if(tail.x == foodX && tail.y ==foodY){	
			eat();
		}
		snakeArray.unshift(tail);
		for (var i = 1; i < snakeArray.length; i++) {
			if (snakeArray[i].x == tail.x && snakeArray[i].y == tail.y) {
				clearInterval(loop);
			};
		};
		if(tail.x == width / cellSize || tail.y == height / cellSize || tail.y < 0 || tail.x < 0) {
			boom();
		}
		// if(tail.x == bonusX && tail.y == bonusY){
		// 	ctx.strokeStyle = 'white';
		// 	ctx.fillRect(bonusX*cellSize, bonusY*cellSize, cellSize, cellSize);
		// 	speed = 200;
		// 	setLoop(speed);
		// }
		for(var i = 0; i < snakeArray.length; i++){
			var c = snakeArray[i];
			paintCanvas(c.x, c.y);
		}
		paintFood();
	}

	function paintCanvas(x, y) {
		ctx.fillStyle = snakePattern;
		ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
		// ctx.strokeStyle = 'white';
		// ctx.strokeRect(x*cellSize, y*cellSize, cellSize, cellSize);
	}

	$(document).keydown(function(e){
		var key = e.which;
		if(key == '37' && direction != 'right') direction = 'left';
		if(key == '38' && direction != 'down') direction = 'up';
		if(key == '39' && direction != 'left') direction = 'right';
		if(key == '40' && direction != 'up') direction = 'down';
	})

$(window).load(function() {
	init();
})