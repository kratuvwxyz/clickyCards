import React, { Component } from 'react';
//-components
///-Layout
////-Header
import Header from "./components/Layout/Base/Header/Header";
////-Nav
import Nav from "./components/Layout/Base/Nav/Nav";
////-Base
import Base from "./components/Layout/Base/Base";
/////-Container
import Container from "./components/Layout/Base/Container/Container";
//////-Row
import Row from "./components/Layout/Base/Container/Row/Row";
///////-Column
import Column from "./components/Layout/Base/Container/Row/Column/Column";
////////-Card
import Card from "./components/Layout/Base/Container/Row/Column/Card/Card";

//-styles
import './App.css';

//-images
import cards from "./cards.json";

// const random52 = Math.floor((Math.random()*52)+1);
// splice code
const drawRandomCard = (deck) => {
  const randomIndex = Math.floor(Math.random() * deck.length);
  return deck.splice(randomIndex, 1)[0]
}
// let x1 = drawRandomCard(cards);
// // console.log(x1);
// let x2 = [];
// x2.push(x1);
// // console.log(x2);

//x3 = Array getting cards from cards.json
let x3 = [];
// console.log(x3);
//x4 = cards need to show on the page
let x4 = 6;

//cardReset helps to make sure everything strat from begining
let cardsReset = () => {
  x3 = [];
  // console.log(x3);
  x4 = 6;
  for(let k=0; k<x4; k++){
    x3[k] = drawRandomCard(cards);
  }
}

//cardRaised add 2 more cards to play if you win level
let cardsRaised = () => {
  x4 += 2;
  for(let k=0; k<x4; k++){
    x3[k] = drawRandomCard(cards);
  }
  // console.log(x3);
}

//First thing First... this is the one getting first cards out of cards.json
for(let k=0; k<x4; k++){
  x3[k] = drawRandomCard(cards);
}
// console.log(x3);

//code for shuffle cards
const shuffleCards = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//App
class App extends Component {
//-state
    state = {
      x3,
      x4,
      cardsHit: x4,
      currentScore: 0,
      topScore: 0,
      level: 1,
      rightWrong: "",
      clicked: [],
    };

  //if click is not duplicate then move forward...
  handleClick = (id) => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.handleRemains();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };
  
  //counting cards
  //-if cards to click is 0 then move to next level and add 2 more cards
  handleRemains = () => {
    const newRemainCards = this.state.x4 - 1;
    console.log(newRemainCards);
    this.setState({
      x4: newRemainCards,
      cardsHit: newRemainCards
    });
    if (newRemainCards === 0) {
      const levelSet = this.state.level + 1;
      if (levelSet <= 4) {
        cardsRaised();
        this.setState({
        x4: x4,
        cardsHit: x4,
        level: levelSet
        });
      } else if (levelSet === 5){
        cardsRaised();
        this.setState({
          x4: x4,
          cardsHit: x4,
          level: "Final"
        });
      }
    }
  }

  //adding score and topScore if click card is correct and shuffle cards
  //-at score 50, game over... reload page
  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: "Try not to hit any duplicates!"
    });
    if (newScore === 1) {
      this.setState({
        rightWrong: "Try not to hit any duplicates!"
      });
    } else if (newScore === 50) {
      //alert("Congratulations!!! You Just Won!!!");
      this.setState({
        rightWrong: "Congratulations!!! You Just Won!!!",
        clicked: []
      });
      // Reload the current page, without using the cache, in 5 seconds
      setTimeout(function(){
        window.location.reload(true);
     }, 5000);
    } else {
      this.setState({
        rightWrong: "Correct, try next!"
      })
    }
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    this.handleShuffle();
  };

  //make sure game reset properly
  handleReset = () => {
    cardsReset();
    this.setState({
      currentScore: 0,
      level: 1,
      x4: x4,
      cardsHit: x4,
      topScore: this.state.topScore,
      rightWrong: "Oh no!!! Try again!",
      clicked: []
    });
    this.handleShuffle();
  };

  //shffle cards properly...
  handleShuffle = () => {
    let shuffledCards = shuffleCards(x3);
    this.setState({ x3: shuffledCards });
  };

  //App render finally...
  render() {
    return (
      <Base>
        <Header 
          rightWrong={this.state.rightWrong}
        />
        <Nav 
          cardsHit={this.state.cardsHit}
          score={this.state.currentScore}
          topScore={this.state.topScore}
          level={this.state.level}
        />
        <Container>
          <Row>
            {this.state.x3.map(card => (
              <Column size="lg-2 md-3 sm-3 xs-4">
                <Card 
                  key={card.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={card.id}
                  image={card.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Base>
    );
  }
}

export default App;
