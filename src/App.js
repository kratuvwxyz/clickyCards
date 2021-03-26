import "./App.css";
import React, { Component } from "react";
import cards from "./cards.json";

import Header from "./components/Layout/Base/Header/Header";
import Nav from "./components/Layout/Base/Nav/Nav";
import Base from "./components/Layout/Base/Base";
import Container from "./components/Layout/Base/Container/Container";
import Row from "./components/Layout/Base/Container/Row/Row";
import Column from "./components/Layout/Base/Container/Row/Column/Column";
import Card from "./components/Layout/Base/Container/Row/Column/Card/Card";

// random selection out of 60 cards and splice them
const drawRandomCard = (deck) => {
  const randomIndex = Math.floor(Math.random() * deck.length);
  return deck.splice(randomIndex, 1)[0];
};

//x3 = Array getting cards from cards.json
let x3 = [];

//x4 = cards need to show on the page
let x4 = 6;

// let's get first 6 cards out of the dack
let newCards = () => {
  for (let k = 0; k < x4; k++) {
    x3[k] = drawRandomCard(cards);
  }
};

// card raised by 2 to the next level
let cardsRaised = () => {
  x4 += 2;
  newCards();
};

// once game over, cards needs to reset
let cardsReset = () => {
  x3 = [];
  x4 = 6;
  newCards();
};

//code for shuffle cards
let shuffleCards = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

newCards();

class App extends Component {
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

  handleRemains = () => {
    const newRemainCards = this.state.x4 - 1;
    this.setState({
      x4: newRemainCards,
      cardsHit: newRemainCards,
    });
    if (newRemainCards === 0) {
      const levelSet = this.state.level + 1;
      if (levelSet <= 4) {
        cardsRaised();
        this.setState({
          x4: x4,
          cardsHit: x4,
          level: levelSet,
        });
      } else if (levelSet === 5) {
        cardsRaised();
        this.setState({
          x4: x4,
          cardsHit: x4,
          level: "Final",
        });
      }
    }
  };

  //shffle cards properly...
  handleShuffle = () => {
    let shuffledCards = shuffleCards(x3);
    this.setState({ x3: shuffledCards });
  };

  // every right click you need to update scores and display banner
  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: "Try not to hit any duplicates!",
    });
    if (newScore === 1) {
      this.setState({
        rightWrong: "Try not to hit any duplicates!",
      });
    } else if (newScore === 50) {
      this.setState({
        rightWrong: "Congratulations!!! You Just Won!!!",
        clicked: [],
      });
      // Reload the current page, without using the cache, in 5 seconds
      setTimeout(function () {
        window.location.reload(true);
      }, 5000);
    } else {
      this.setState({
        rightWrong: "Correct, try next!",
      });
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
      clicked: [],
    });
    this.handleShuffle();
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

  render() {
    return (
      <Base>
        <Header rightWrong={this.state.rightWrong} />
        <Nav cardsHit={this.state.cardsHit} score={this.state.currentScore} topScore={this.state.topScore} level={this.state.level} />
        <Container>
          <Row>
            {this.state.x3.map((card) => (
              <Column size="lg-2 md-3 sm-3 4">
                <Card key={card.id} handleClick={this.handleClick} handleIncrement={this.handleIncrement} handleReset={this.handleReset} handleShuffle={this.handleShuffle} id={card.id} image={card.image} />
              </Column>
            ))}
          </Row>
        </Container>
      </Base>
    );
  }
}

export default App;
