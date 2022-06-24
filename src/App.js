import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./style.css";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(true);
  const [firstName, setFirstName] = React.useState(["Chibuike"]);
  function handleChange(event) {
    setFirstName([event.target.value]);
  }
  React.useEffect(() => {
    const checkIsHeld = dice.every((die) => die.isHeld === true);
    const checkValue = new Set(dice.map((die) => die.value)).size === 1;
    const result = checkIsHeld === true && checkValue === true ? true : false;
    setTenzies(result);
    console.log(result ? "YES I MADE IT!!!" : "Keep trying");
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    // if(names.lenght===1){}else{console.log("please add your name")}
    if (tenzies) {
      setDice(allNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: die.id,
              };
        })
      );
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={holdDice}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti /*width={width} height={height} */ />}

      <h1 className="title">{tenzies ? firstName[0] : "TENZIES"}</h1>
      <p className="instructions">
        {tenzies
          ? `Congratulations on your achievement and best wishes for your next adventure!`
          : `Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.`}
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <input
        style={{
          display: `${
            tenzies ? "none" : "none"
          }` /*change the second none to flex for it to accept input */,
        }}
        type="text"
        placeholder="First Name"
        value={firstName[0]}
        onChange={handleChange}
      />
    </main>
  );
}
