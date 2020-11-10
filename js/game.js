var colors = ['red', 'yellow', 'blue', 'green'];
var types = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+2', 'reverse', 'skip'];
var deck = [];
var hands = [];
var playableHands = [];
var pile = [];
var currentCard = null;
var currentCardColor = null;
var currentCardNumber = -1;
var turnCounter = 0;
var currentPlayersTurn = 0;
var stackingCounter = 0;
//Creates the deck with the proper amount of each card and shuffles it. This also allows for using multiple decks to increase card amount.
function createDeck(numOfDecks){
	deck = [];
	for (var deckCounter = 0; deckCounter<numOfDecks*2; deckCounter++){
		for (var colorCounter = 0; colorCounter < 4; colorCounter++){
			for (var typeCounter = 0; typeCounter < 12; typeCounter++){
				deck.push(colors[colorCounter]+types[typeCounter]);
			}
		}
	}
	for (var deckCounter=0; deckCounter<numOfDecks; deckCounter++){
		deck.push('red0');
		deck.push('yellow0');
		deck.push('blue0');
		deck.push('green0');
		for (var x = 0; x<4; x++){
			deck.push('+4');
			deck.push('wild');
		}	
	}
	deckShuffle();
	currentCard = deck.shift();
}

//Shuffles the deck
function deckShuffle(){
	for (var i = 0;i<deck.length;i++ ){
		var tempCard = deck[i];
		var randomIndex= Math.floor(Math.random() * deck.length);
		deck[i] = deck[randomIndex];
		deck[randomIndex]=tempCard;
	}
}

//Creates hands based on the number of players and number of starting cards specified on the site.
function generateHands(numOfPlayers, numOfCards){
	for (var h = 0; h < numOfPlayers; h++){
		var tempHand = [];
		for (var c = 0; c<numOfCards; c++){
			tempHand[c] = deck.shift();
		}
		hands[h] = tempHand;
	} 
}

//Determine what color and number the current played card is
function determineCard(){
	if (currentCard.includes("red")){
		currentCardColor="red";
	} else if (currentCard.includes("blue")){
		currentCardColor="blue"
	} else if (currentCard.includes("yellow")){
		currentCardColor="yellow"
	} else if (currentCard.includes("green")){
		currentCardColor="green"
	} else if (currentCard.includes("+4")){
		currentCardColor="+4"
	} else if (currentCard.includes("wild")){
		currentCardColor="wild"
	}
	if (currentCard.includes("1")){
		currentCardNumber = 1;
	} else if (currentCard.includes("+2")){
		currentCardNumber = "+2";
	} else if (currentCard.includes("3")){
		currentCardNumber = 3;
	} else if (currentCard.includes("4")){
		currentCardNumber = 4;
	} else if (currentCard.includes("5")){
		currentCardNumber = 5;
	} else if (currentCard.includes("6")){
		currentCardNumber = 6;
	} else if (currentCard.includes("7")){
		currentCardNumber = 7;
	} else if (currentCard.includes("8")){
		currentCardNumber = 8;
	}  else if (currentCard.includes("9")){
		currentCardNumber = 9;
	} else if (currentCard.includes("0")){
		currentCardNumber = 0;
	} else if (currentCard.includes("2")){
		currentCardNumber = 2;
	} else if (currentCard.includes("reverse")){
		currentCardNumber = "reverse";
	} else if (currentCard.includes("skip")){
		currentCardNumber = "skip";
	}
}


//Creates a list of all the cards that can be played by a player
function generatePlayable(currentPlayer){
	determineCard();
	playableHands = [];
	for (var x = 0; x<hands[currentPlayer].length;x++){
		if (hands[currentPlayer][x].includes(currentCardNumber)){
			playableHands.push(hands[currentPlayer][x]);
		} else if (hands[currentPlayer][x].includes(currentCardColor)){
			playableHands.push(hands[currentPlayer][x]);
		} else if (hands[currentPlayer][x].includes("wild")){
			playableHands.push(hands[currentPlayer][x]);	
		} else if (hands[currentPlayer][x].includes("+4")){
			playableHands.push(hands[currentPlayer][x]);	
		} else if (currentCardColor.includes("wild")) {
			playableHands.push(hands[currentPlayer][x]);
		} else if (currentCardColor.includes("+4")) {
			playableHands.push(hands[currentPlayer][x]);
		}
		
	}
	return playableHands;
}


//Draw a card and remove it from the deck
function drawCard(infiniteDraw,currentPlayer){

	if (currentPlayer!=currentPlayersTurn) {
		alert("it is not your turn");
		return;
	}

	if (deck.length<1){
		while (pile.length>0){
			deck.push(pile.shift());
		}
		deckShuffle();
	}

	if (stackingCounter>0){
		for (var i = 0; i < stackingCounter; i++) {
			hands[currentPlayer].push(deck.shift());
		}
		turnCounter++;
		currentPlayersTurn = turnCounter%4;
		stackingCounter = 0;
		return;
	}

	if (infiniteDrawCheck==true){
		hands[currentPlayer].push(deck.shift());
		while (generatePlayable(currentPlayer).length==0){
			hands[currentPlayer].push(deck.shift());
			generatePlayable(currentPlayer);
		}
	} else{
		hands[currentPlayer].push(deck.shift());
	}
	generatePlayable(currentPlayer);

}


//plays a card and adds it to the top of the pile while moving the previous card to a pile that can be shuffled later on.
function playCard(currentPlayer,attemptedCard){

	if (currentPlayer!=currentPlayersTurn) {
		alert("it is not your turn");
		return;
	}

	if (generatePlayable(currentPlayer).includes(attemptedCard)){
		if (stackingCounter>0){
			if (stacking==true) {
				if (attemptedCard.includes("+2")) {
					stackingCounter+=2;
					pile.push(currentCard);
					currentCard=hands[currentPlayer][hands[currentPlayer].indexOf(attemptedCard)];
					hands[currentPlayer].splice(hands[currentPlayer].indexOf(attemptedCard), 1);
				} else if(attemptedCard.includes("+4")) {
					stackingCounter+=4;
					pile.push(currentCard);
					currentCard=hands[currentPlayer][hands[currentPlayer].indexOf(attemptedCard)];
					hands[currentPlayer].splice(hands[currentPlayer].indexOf(attemptedCard), 1);

				} else {
					alert("You must draw a card because the previous player played a +2 or +4");
					return;
				}
			} else {
				alert("You must draw a card because the previous player played a +2 or +4")
				return;
			}

		} else {
			if (attemptedCard.includes("+2")){
				stackingCounter+=2;
			} else if (attemptedCard.includes("+4")) {
				stackingCounter+=4;
			}
			pile.push(currentCard);
			currentCard=hands[currentPlayer][hands[currentPlayer].indexOf(attemptedCard)];
			hands[currentPlayer].splice(hands[currentPlayer].indexOf(attemptedCard), 1);
		}
		
	}




	if (hands[currentPlayer].length==0) {
		alert("Player " + (currentPlayer+1) + " has won the game");
	}
	turnCounter++;
	

	if (currentCard.includes("skip")) {
		turnCounter++;
	} 


	currentPlayersTurn = turnCounter%4;
}
