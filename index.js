var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $gameTime = document.querySelector('#game-time');
var boxSize = getRandom(30, 50);
var score = 0;
var isGameStarted = false;
var gameSize = $game.getBoundingClientRect();
var maxTop = gameSize.height - boxSize;
var maxLeft = gameSize.width - boxSize;
var colors = ['red', 'blue', 'green'];
var randomColorIndex = getRandom(0, colors.length);

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('click', setGameTime);

function startGame() {
	score = 0;
	$gameTime.setAttribute('disabled', 'true');
	setGameTime();
	$timeHeader.classList.remove('hide');
	$resultHeader.classList.add('hide');

	isGameStarted = true;

	console.log('Start');

	$game.style.backgroundColor = '#fff';
	$start.classList.add('hide');

	var interval = setInterval(function() {
		var time = parseFloat($time.textContent);

		if(time <= 0) {
			clearInterval(interval);
			endGame();
			//end game
		} else {
			$time.textContent = (time - 0.1).toFixed(1);
		}
	}, 100)

	renderBox();
}

function show($el){
	$el.classList.remove('hide');
}

function hide($el){
	$el.classList.add('hide');
}

function setGameTime(){
	var time = +$gameTime.value;
	$time.textContent = time.toFixed(1);
}

function setGameScore() {
	$result.textContent = score.toString();
}

function endGame() {
	isGameStarted = false;
	$gameTime.removeAttribute('disabled');
	setGameScore();
	show($start);
	$game.style.backgroundColor = '#ccc';
	$game.innerHTML = '';
	$timeHeader.classList.add('hide');
	$resultHeader.classList.remove('hide')


}
function handleBoxClick(event) {
	if (!isGameStarted) {
		return
	}
	if(event.target.dataset.box){
		score++;
		renderBox();
	}
}

function renderBox() {
	$game.innerHTML = '';
	var box = document.createElement('div');	
	var boxSize = getRandom(30, 50);

	box.style.height = box.style.width = boxSize + 'px';
	box.style.position = 'absolute';
	box.style.backgroundColor = colors[getRandom(0, colors.length)];
	box.style.top = getRandom(0, maxTop) + 'px';
	box.style.left = getRandom(0, maxLeft) + 'px';
	box.style.cursor = 'pointer';
	box.setAttribute('data-box', 'true');

	$game.insertAdjacentElement('afterbegin' , box);
}

function getRandom(min, max){
	return Math.floor(Math.random() * (max - min) + min);	
}