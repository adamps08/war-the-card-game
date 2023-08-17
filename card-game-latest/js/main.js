


let deckId = ''

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
        console.log(data.remaining)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


document.querySelector('#deal').addEventListener('click', drawTwo)
document.querySelector('#warButton').addEventListener('click', warTime)
document.querySelector('#playAgain').addEventListener('click', startOver)

document.querySelector("#warButton").style.display= 'none'
document.querySelector('#player1War').style.display = 'none'
document.querySelector('#player2War').style.display = 'none'
document.querySelector('#player1').style.display = 'none'
document.querySelector('#player2').style.display = 'none'
document.querySelector('#playAgain').style.display = 'none'

  let plr1Score = 0
  let plr2Score = 0
  let cardsLeft = 52

 


function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  
  
  if (cardsLeft > 0){
    cardsLeft -=2
  }

  document.querySelector('#remainingCards').innerText = `Cards Remaing: ${cardsLeft}`
  document.querySelector('#player1War').style.display = 'none'
  document.querySelector('#player2War').style.display = 'none'
  document.querySelector('#player1').style.display = ''
  document.querySelector('#player2').style.display = ''

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image 
        document.querySelector('#player2').src = data.cards[1].image
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        if(player1Val > player2Val){
          plr1Score+= 2
          document.querySelector('#result').innerText = 'Player 1 Wins'
          document.querySelector('#p1score').innerText = `${plr1Score}` 
        }else if(player1Val < player2Val){
          plr2Score += 2
          document.querySelector('#result').innerText = 'Player 2 Wins'
          document.querySelector('#p2score').innerText = `${plr2Score}`
        }else if(player1Val === player2Val){
         document.querySelector('h3').innerText = 'Time for War!'
         document.querySelector('#deal').style.display ='none'
         document.querySelector('#warButton').style.display = ''
       }
       endGame();
      })

      .catch(err => {
          console.log(`error ${err}`)
      });

     

}

function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}


//At the end of the fame
// function endGame () {
//   if (cardsLeft <= 0 && plr1Score > plr2Score){
//     document.querySelector('#result').innerText = 'Game Over. Player One Wins!!!'
//   }else if(cardsLeft <= 0 && plr1Score < plr2Score){
//   document.querySelector('#result').innerText = 'Game Over. Player Two Wins!!!'
//   }else if(cardsLeft <= 0 && plr1Score === plr2Score){
//     document.querySelector('#result').innerText = 'Game Over. Tie game...'
//    }
//   if (cardsLeft <= 0){
//     document.querySelector('#deal').style.display ='none'
//     document.querySelector('#warButton').style.display ='none'
//     document.querySelector('#playAgain').style.display = ''
//   }
// }


//In the Case of War...
function warTime(){
  document.querySelector('#player1War').style.display = ''
  document.querySelector('#player2War').style.display = ''
  document.querySelector('#player1').style.display = ''
  document.querySelector('#player2').style.display = ''


  const war = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`
  
  if (cardsLeft > 0){
    cardsLeft -=6
  } else return cardsLeft = 0

   document.querySelector('#remainingCards').innerText = `Cards Remaing: ${cardsLeft}`
   fetch(war)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1War').src = data.cards[0].image 
        document.querySelector('#player2War').src = data.cards[1].image
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        if(player1Val > player2Val){
          plr1Score+= 6
          document.querySelector('#result').innerText = 'Player 1 Wins'
          document.querySelector('#p1score').innerText = `${plr1Score}` 
          document.querySelector('#deal').style.display =''
         document.querySelector('#warButton').style.display ='none'
        }else if(player1Val < player2Val){
          plr2Score += 6
          document.querySelector('#result').innerText = 'Player 2 Wins'
          document.querySelector('#p2score').innerText = `${plr2Score}`
          document.querySelector('#deal').style.display =''
         document.querySelector('#warButton').style.display ='none'
        }else { 
         document.querySelector('h3').innerText = 'go to War Again!'
        }
        endGame();
      })

      .catch(err => {
          console.log(`error ${err}`)
      });

      endGame();   
}

//At the end of the fame
function endGame() {
  if (cardsLeft <= 0) {
    if (plr1Score > plr2Score) {
      document.querySelector('#result').innerText = 'Game Over. Player One Wins!!!';
    } else if (plr1Score < plr2Score) {
      document.querySelector('#result').innerText = 'Game Over. Player Two Wins!!!';
    } else {
      document.querySelector('#result').innerText = 'Game Over. Tie game...';
    }

    document.querySelector('#deal').style.display = 'none';
    document.querySelector('#warButton').style.display = 'none';
    document.querySelector('#playAgain').style.display = '';
  }
}
//play again

function startOver (){
  document.querySelector('#deal').style.display = '';
  document.querySelector('#playAgain').style.display = 'none';
  
  cardsLeft = 52
  document.querySelector('#remainingCards').innerText = `Cards Remaing: 52`
  plr1Score = 0
  document.querySelector('#p1score').innerText = `` 
  plr2Score = 0
  document.querySelector('#p2score').innerText = `` 

  document.querySelector('#player1').style.display = 'none'
document.querySelector('#player2').style.display = 'none'
  

  fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
        console.log(data.remaining)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}