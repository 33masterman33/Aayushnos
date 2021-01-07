function startCards(){
  var stage = document.getElementById("a-playable_screen");
  var backdrop = document.createElement("div");
  backdrop.id = "backdrop";
  stage.appendChild(backdrop);

  // template for card
  var card = document.createElement("div");
  card.innerHTML = "<img src=\"./assets/png/uno.png\">";

  for(var i=0; i < 16; i++) {
    var newCard = card.cloneNode(true);

    newCard.fromtop = 15 + 120 * Math.floor(i/4);
    newCard.fromleft = 70 + 100 * (i%4);
    (function(idx) {
      newCard.addEventListener("click", function() { cardClick(idx); }, false);
    })(i);

    backdrop.appendChild(newCard);
  }

}