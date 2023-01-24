import { useState } from "react";
import "./App.css";
import Dice from "./components/Dice.js";

function App() {
  const [dices, setDices] = useState(() => getNewDices());

  function getNewDices() {
    const newDiceArr = [];
    for (let i = 0; i < 10; i++) {
      newDiceArr.push({
        id: i,
        value: Math.floor(Math.random() * 11),
        isHeld: false,
      });
    }
    return newDiceArr;
  }

  function rollDice() {
    if(isGameOver()){
      return true;
    }
    const randomDices = dices.map(dice => {
      if(!dice.isHeld){
        return { ...dice, value: Math.floor(Math.random() * 11)};
      }else{
        return dice
      }
    })
    setDices(randomDices)
  }

  function sameValueCheck(dice){
    const arr = dices.filter(dice => dice.isHeld);
    return arr.length > 0 ? (arr[0].value === dice.value) : true;
  }

  function updateDice(event) {
    const diceId = event.target.id;
    const updatesDicesArr = dices.map((dice) => {
      if (dice.id === Number(diceId) && sameValueCheck(dice)){
        return { ...dice, isHeld: true };
      }else{
        return dice;
      }
    });
    setDices(updatesDicesArr)
  }

  function isGameOver(){
    const commonValue = dices.filter((dice) => dice.isHeld)[0]?.value;
    return dices.filter(dice => dice.value === commonValue).length === dices.length
  }

  return (
    <div className="App">
      <h1 className="game-title">Tenzies</h1>
      <h3 className="game-description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h3>
      <div className="dice__container">
        {dices.map((dice, index) => (
          <Dice {...dice} key={index} updateDice={updateDice} />
        ))}
      </div>
      <button className="roll__dice" onClick={rollDice}>
        {isGameOver() ? "Game over": "Roll"}
      </button>
    </div>
  );
}

export default App;
