var numDecks = 1;
var numPlayers = 2;
var numCards = 7;
var infiniteDraw = false;
var stacking = true;
function start_screen() {
	document.getElementById("a-welcome_screen").style.display = 'none';
	document.getElementById("a-playable_screen").style.display = 'block';
	startCards();
	//alert('Welcome to Aayushnos Alpha');
	numDecks = document.getElementById("a-choices").elements[1].value;
	numPlayers = document.getElementById("a-choices").elements[0].value;
	numCards = document.getElementById("a-choices").elements[2].value;
	if (document.getElementById("a-choices").elements[1].value == 0){
		numDecks=1;
	}
	if (document.getElementById("a-choices").elements[0].value == 0){
		numPlayers=2;
	} else if (document.getElementById("a-choices").elements[0].value < 2){
		alert("You cannot play with less that two people.");
		document.getElementById("a-welcome_screen").style.display = 'block';
		document.getElementById("a-playable_screen").style.display = 'none';
	}
	if (document.getElementById("a-choices").elements[2].value == 0){
		numCards=7;
	} else if (document.getElementById("a-choices").elements[2].value < 5){
		alert("You cannot play with less that five starting cards.");
		document.getElementById("a-welcome_screen").style.display = 'block';
		document.getElementById("a-playable_screen").style.display = 'none';
	}
	if (document.getElementById("a-active_rad_4").checked){
		infiniteDraw=true;
	}
	if (document.getElementById("a-inactive_rad_4").checked){
		stacking=false;
	}

	createDeck(numDecks);
	generateHands(numPlayers,numCards);
}

