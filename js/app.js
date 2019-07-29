
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const stars = document.querySelectorAll(".fa-star");
const timer = document.querySelector('.timer');
const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
let counterMacth = numOfMoves = hour = min = sec = 0;
let numOfStars=3;
let secCard = null;
let interval;

//List of all cards
const listCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 
	'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb',
 	'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];

//when click on restart icon will call start function.
restart.addEventListener('click', start);


function start(){
	//To clears a timer
	clearTimeout(interval);
	startTimer();
	//Represent how appear in website.
	moves.textContent = "0";
	timer.textContent = "00:00:00";
	numOfMoves = counterMacth = hour = min = sec = 0;
	other=null;
	//Make a deck appear.
	container.classList.remove("hide");
	//To display a result of game.
	modal.classList.add("hide");
	//Make all stars with yellow color.
	for(let i=0;i<stars.length;i++){
		stars[i].classList.add('staryellow');
	}
	//Rearrange cards.
	const suffCards = shuffle(listCards);
	deck.innerText = '';
	//Create all elements in deck.
	for (let i = 0; i < suffCards.length; i++) {
		const li = document.createElement('li');
		li.classList.add('card');
		li.innerHTML ='<i class="fa '+ suffCards[i] +'"></i>';
		deck.appendChild(li);
	}
	
	deck.addEventListener('click', display);
}

start();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function display(event){
	numOfMoves = +moves.textContent;


	let card = event.target;

	//Check if card is not contain class deck, match, open, show and element that click not equal to i.
	if(card.classList.contains("deck") || card.classList.contains("match") ||
		card.classList.contains("open", "show") || card.nodeName.toLowerCase() ==='i'){
			card=null;
		}
	//Add class open and show to card clicked.
	card.classList.add("open", "show");

	if(secCard === null){
		secCard = card;
	}
	else{
		//Wait until checks of two cards.
		deck.classList.add('stop-listener');
		//Add number of moves.
		moves.textContent = ++numOfMoves;
		if (secCard.classList.contains("open", "show") === card.classList.contains("open", "show")) {
			//Check if cards match.
			if(secCard.firstElementChild.classList[1] === card.firstElementChild.classList[1]){
				setTimeout(function(){
					secCard.classList.add("match");
					card.classList.add("match");
					secCard.classList.remove("open", "show");
					card.classList.remove("open", "show");

					secCard = null;
					
					counterMacth += 1;
				
					deck.classList.remove('stop-listener');

					if(counterMacth === 8){
						finalScore();
					}
				},200);
			}
			else{
				setTimeout(function(){
					secCard.classList.remove("open", "show");
					card.classList.remove("open", "show");
					secCard = null;
					deck.classList.remove('stop-listener');
				},500);
			}

			starColor();				
		}
	}
}
			
//Stars decrease depending on number of moves.
function starColor(){
	if(numOfMoves === 8){
		--numOfStars;
		stars[2].classList.remove("staryellow");
	}
	else if(numOfMoves === 12){
		--numOfStars;
		stars[1].classList.remove("staryellow");
	}
	else if(counterMacth === 18){
		stars[0].classList.remove("staryellow");
	}
}

//Timer.
function startTimer() {

	interval = setInterval(function() {
	if((hour < 10) && (min < 10) && (sec < 10)){
		timer.innerHTML = "0" + hour + ":0" + min + ":0" + sec;
	}
	 else if((hour < 10) && (min <10)){
  		timer.innerHTML = "0" + hour + ":0" + min + ":" + sec;
  	}
  	else if(hour < 10){
  		timer.innerHTML = hour + ":" + min + ":" + sec;
  	}

	sec++;

	if (sec == 60) {
    	sec = 0;
    	min++;
    }
  	else{
  		if(min == 60){
  			min = 0;
  			hour++;
  		}
  	}
  }, 1000);
}


function finalScore(){
	const movesInScorePage = document.getElementById('movesScore');
	const starsInScorePage = document.getElementById('starsScore');
	const timeInScorePage = document.getElementById('timeScore');
	const movesScore = moves.textContent;
	const starsScore = numOfStars;
	const timerScore = timer.textContent;
	//Show number of moves, stars and timer in result.
	movesInScorePage.textContent = movesScore;
	starsInScorePage.textContent = starsScore;
	timeInScorePage.textContent = timerScore;

	//Hide container.
	container.classList.add('hide');
	//Show modal
	modal.classList.remove('hide');
}
