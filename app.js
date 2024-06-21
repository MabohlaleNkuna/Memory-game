// script.js

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('gameBoard');
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cards = [];
  let card1 = null;
  let card2 = null;
  let isLocked = false;

    for (let i = 0; i < 2; i++) {
     for (let x of letters) {
        cards.push(x);
     }
    }
  // Add cards
  function addCard(x) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = 
    '<div class="front" style="color: blue;">' + x + '</div>' + 
    '<div class="back" style="color: aqua;">&#128512;</div>';

    card.addEventListener('click', flipCard);
    return card;
}
  // Rearranging the cards
  function rearrange(container) {
      for (let i = container.length - 1; i > 0; i--) {
        const j = Math.random() * (i + 1) | 0;
          [container[i], container[j]] = [container[j], container[i]];
      }
      return container;
  }

  function flipCard() {
      if (isLocked || this === card1) return;

      this.classList.add('flipped-card');

      if (!card1) {
          card1 = this;
          return;
      }

      card2 = this;
      isSame();
  }

  function isSame() {
      const isMatch = card1.innerText === card2.innerText;
      isMatch ? disableCards() : closeCards();
  }
  function resettingGame() {
    [card1,card2,isLocked]=[null,null,false]
 }

  function disableCards() {
      card1.removeEventListener('click', flipCard);
      card2.removeEventListener('click', flipCard);
      resettingGame();
  }

  function closeCards() {
      isLocked = true;
      setTimeout(() => {
          card1.classList.remove('flipped-card');
          card2.classList.remove('flipped-card');
          resettingGame();
      }, 1000);
  }

  // Initialize game
  function initialiseGame() {
      const rearrangedCards = rearrange(cards);
      rearrangedCards.forEach(x => {
          const card = addCard(x);
          gameBoard.appendChild(card);
      });
  }

  initialiseGame();
});
