var arr = [];
var snakeLength = 5;

function init () {
	var size = 10,
	widht = $('.wrapper').width(),
	height = $('.wrapper').height(),
	gridSize = Math.floor(widht / size) *  Math.floor(height / size),
	$html = '',
	$wrapper = $('.wrapper');

	for (var i = 0; i < gridSize; i++) {
		$html += '<div class="child"></div>';
	};
	$wrapper.append($html);
	$('head').append('<style>.child{ float: left; width: 10px; height: 10px;}</style>');

	snake();
	//rendSnake();
	food()
}

function snake() {
	
	var interval = setInterval(function() {
		for (var i = 1; i <= snakeLength; i++) {
			var snake = $('.wrapper .child:nth-child('+ i +')');
			$('.wrapper .child:nth-child('+ (snakeLength - i - 4) +')').addClass('snakeOut');
			arr = [];
			arr.push(snake);

		};
		snakeLength++;
		rendSnake();
	}, 300);
}

function food() {
	$('.wrapper .child:nth-child(30)').addClass('food');
}

function rendSnake () {
	jQuery.each(arr, function() {
		$(this).addClass('snake');
		console.log(arr.length);
	})
}