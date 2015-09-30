window.onload = function(){
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');
	var width = $('#canvas').width();
	var height = $('#canvas').height();

	var cellSize = 10,
	direction,
	foodX,
	foodY,
	score,
	length = 5,
	snakeArray;

	function init() {
		direction = 'right';
		createSnake();
		createFood();
		loop = setInterval(paintSnake, 100);

	}
	init();

	function eat() {
		length = 1;
		reloadSnake();
		createFood();
	}

	function reloadSnake() {
		var lastDot = snakeArray.pop();
		for (var i = length; i>=0 ; i--) {
			snakeArray.push({x:lastDot.x, y:lastDot.y});
		};
	}

	function createSnake() {
		//length = 5;
		snakeArray = [];
		for (var i = length; i>=0 ; i--) {
			snakeArray.push({x:i, y:0});
		};
	}

	function createFood() {
		foodX = Math.floor((Math.random() * (width - cellSize) + cellSize) / 10);
		foodY = Math.floor((Math.random() * (width - cellSize) + cellSize) / 10);
	}

	function paintFood() {
		ctx.fillStyle = 'red';
		ctx.fillRect(foodX*cellSize, foodY*cellSize, cellSize, cellSize);
	}

	function paintSnake(){
		ctx.fillStyle = 'white';
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
			console.log(true);
		}

		snakeArray.unshift(tail);

		for(var i = 0; i < snakeArray.length; i++){
			var c = snakeArray[i];
			paintCanvas(c.x, c.y);
		}
		paintFood();
	}

	function paintCanvas(x, y) {

		ctx.fillStyle = 'blue';
		ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
		ctx.strokeStyle = 'white';
		ctx.strokeRect(x*cellSize, y*cellSize, cellSize, cellSize);
	}

	$(document).keydown(function(e){
		var key = e.which;
		if(key == '37') direction = 'left';
		if(key == '38') direction = 'up';
		if(key == '39') direction = 'right';
		if(key == '40') direction = 'down';
	})

	// function check(x, y, array) {
	// 	for (var i = 0; i < array.length; i++) {
	// 		if (array[i].x == x && array[i].y == y) {
	// 			return true;
	// 		};
	// 		return false;
	// 	};
	// }
}