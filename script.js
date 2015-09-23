$(document).ready(function(){
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');
	var width = $('#canvas').width();
	var height = $('#canvas').height();

	var cellSize = 10,
	direction,
	food,
	score,
	snakeArray;

	function init() {
		direction = 'right';
		createSnake();
		loop = setInterval(paintSnake, 100);
	}
	init();

	function createSnake() {
		var length = 5;
		snakeArray = [];
		for (var i = length; i>=0 ; i--) {
			snakeArray.push({x:i, y:0});
		};
	}

	function paintSnake(){
		ctx.fillStyle = 'white';
		ctx.fillRect = (0, 0, width, height);
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

		snakeArray.unshift(tail);

		for(var i = 0; i < snakeArray.length; i++){
			var c = snakeArray[i];
			paintCanvas(c.x, c.y);
		} 
	}

	function paintCanvas(x, y) {

		// ctx.fillStyle = 'blue';
		// ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
		ctx.strokeStyle = 'blue';
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
})