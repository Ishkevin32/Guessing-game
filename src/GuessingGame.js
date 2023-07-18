import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from './guessing.module.css';

function GuessingGame() {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Start Guessing");
  const [randomNumber, setRandomNumber] = useState(null);
  const [timesGuessed, setTimesGuessed] = useState(null);

  useEffect(() => {
    if (randomNumber === null) {
      setRandomNumber(
        JSON.parse(localStorage.getItem("random")) || generateRandom()
      );
    }

    if (timesGuessed === null) {
      setTimesGuessed(JSON.parse(localStorage.getItem("guesses")) || 0);
    }
  }, []);

  const generateRandom = function () {
    let random = Math.floor(Math.random() * 100);

    localStorage.setItem("random", JSON.stringify(random));

    return random;
  };

  const handleChange = function (event) {
    if (!isNaN(event.target.value)) {
      setGuess(event.target.value);
    } else {
      alert("hey, type a number you are wrong!");
    }
  };

  function reset(){
        setGuess("")
        setMessage("Start Guessing")
        setTimesGuessed(0)
        setRandomNumber(generateRandom())
        localStorage.removeItem("guesses")
  }
  function handleSubmit(event) {
    event.preventDefault();
    let parsedNum = parseInt(guess);
    console.log(parsedNum);
    console.log(randomNumber);
    if(parsedNum === randomNumber){
        setMessage("Congrats you guessed it!🥳🏆")
    }
    else if(parsedNum < randomNumber){
        setMessage("Number is too low")
    }
    else if(parsedNum > randomNumber){
        setMessage("Number is too high")
    }
    else{
        setMessage("Start Guessing!")
    }

    setTimesGuessed(timesGuessed + 1) 
    localStorage.setItem("guesses", JSON.stringify(timesGuessed + 1));
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            I am thinking of a number between 1 and 100. Guess the Lucky Number
          </Form.Label>
          <br />
          <Form.Label>You have made <Form.Label className={styles.numOfGuesses}>{timesGuessed}</Form.Label> guesses</Form.Label>
          <Form.Control className="mb-2"
            type="text"
            value={guess}
            name="guess"
            onChange={handleChange}
          />

          <Button className="mb-2 mt-2" type="submit">Guess</Button>
          <br />
        
          <Button className= "mb-2 mt-2" onClick={reset} type="button">Reset</Button>
          <br />

          <Form.Label>{message}</Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
}
export default GuessingGame;
