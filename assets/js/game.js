const mod = (()=>{
    `use strict`;

    let cardTypes = [`C`, `D`, `H`, `S`],
        specialCardTypes = [`A`,`J`, `K`, `Q`],
        deck = [],
        scores = [];

    const stopGameButton = document.querySelector(`#stop-game-button`),
        pickCardButton = document.querySelector(`#pick-card-button`),
        newGameButton = document.querySelector(`#new-game-button`),
        cardsDiv = document.querySelectorAll(`.cards-div`),
        scoreSpan = document.querySelectorAll(`span`);

    pickCardButton.disabled = true;
    stopGameButton.disabled = true;

    const createDeck = () => {
        deck.length = 0;
        for(card of cardTypes){
            for(let i=2; i<=10; i++){
                deck.push(`${i}${card}`);
            }
            for(specialCard of specialCardTypes){
                deck.push(`${specialCard}${card}`);
            }
        }

        return _.shuffle(deck);
    }

    const startGame = (numPlayers = 2) => {
        deck = createDeck();
        scores.length = 0;
        for(let i = 0; i < numPlayers; i++){
            scores.push(0);
        }

        scoreSpan.forEach(elem => elem.innerText = 0);
        cardsDiv.forEach(elem => elem.innerHTML = ``);

        pickCardButton.disabled = false;
        stopGameButton.disabled = false;
    }

    const pickCard = (deck) => deck.pop();

    const addPoints = (turn, cardValue) => {
        scores[turn] = scores[turn] + cardValue;
        scoreSpan[turn].innerText = scores[turn];
    }

    const getCardValue = (card) => {
        let value = card.substring(0, card.length-1);
        return (isNaN(value)) ? ((value === `A`) ? 11 : 10) 
        : parseInt(value);
    }

    const renderCard = (cardPicked) => {
        const newCard = document.createElement(`img`);
        newCard.src = `assets/cards/${cardPicked}.png`;
        newCard.alt = `Card image here.png`;
        newCard.classList.add(`card`);

        return newCard;
    }

    const pcTurn = () => {
        pickCardButton.disabled = true;
        stopGameButton.disabled = true;
        do{
            let cardPicked = pickCard(deck),
                cardValue = getCardValue(cardPicked);

            addPoints(1, cardValue);

            cardsDiv[1].append(renderCard(cardPicked));

            if(scores[0] > 21){
                break;
            }

        }while((scores[1] < 21) && (scores[1] < scores[0]));

        theWinnerIs();
    }

    const theWinnerIs = () => {
        if(scores[0] === scores[1])
        {
            alert(`Tieee!`)
        }
        else if(scores[0] > 21){
            alert(`You're such a loser!`);
        }
        else if (scores[1] > 21){
            alert(`You win`);
        }
        else{
            alert(`You're such a loser`);
        }
    }
    pickCardButton.addEventListener(`click`, () => {
        let cardPicked = pickCard(deck),
            cardValue = getCardValue(cardPicked);
        
        addPoints(0, cardValue);

        cardsDiv[0].append(renderCard(cardPicked));

        if(scores[0] >= 21)
        {
            pcTurn();
        }
    });


    stopGameButton.addEventListener(`click`, () => {
        pickCardButton.disabled = true;
        pcTurn();  
    });

    newGameButton.addEventListener(`click`, () =>{
        startGame();
    });

})();

