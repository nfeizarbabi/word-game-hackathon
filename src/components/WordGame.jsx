import { useEffect, useState } from "react";
import SuccessRate from "./SuccessRate";
import Notify from "./Notify";

export default function Hangman() {
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  // Words array to use for guessing values
  const guessThis = ["flamingo", "sunny", "tropical"];

  // initial state for word will be blank
  const [word, setWord] = useState("");
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [status, setStatus] = useState("");

  const randomizeWord = () =>
    setWord(
      guessThis[Math.floor(Math.random() * guessThis.length)].toUpperCase()
    );

  // We want to reset the state at the beginning of a game, and when we play again, which will use the randomizeWord function
  const reset = () => {
    randomizeWord();
    setCorrect([]);
    setIncorrect([]);
    setStatus("");
  };

  // Function to handle on click when player guesses the letter
  // Function will determine whether the input is for a value that exists in the hidden word or not

  const guessInput = (letter) => {
    if (word.includes(letter)) {
      setCorrect([...correct, letter]);
    } else {
      setIncorrect([...incorrect, letter]);
    }
  };

  useEffect(() => {
    if (
      correct.length &&
      word.split("").every((letter) => correct.includes(letter))
    )
      setStatus("won!!!");
  }, [correct]);

  useEffect(() => {
    if (incorrect.length === 6) setStatus("lost :(");
  }, [incorrect]);

  useEffect(reset, []);

  // This function will mask the word to the player
  // The map ternary function will reveal the correct letters, as they are guessed, otherwise the word will remain a blank
  const hideGuessThis = word
    .split("")
    .map((letter) => (correct.includes(letter) ? letter : "_"))
    .join("");

  return (
    <div>
      <p className="wordHidden">{hideGuessThis}</p>
      <section>
        {alphabets.map((letter, index) => (
          <button
            // to disable the button once its used as a guess, whether right or wrong
            disabled={
              correct.includes(letter) ||
              incorrect.includes(letter) ||
              status === "won!!!" ||
              status === "lost :("
            }
            // to handle the onClick, when the player guesses by pressing the letter
            onClick={() => guessInput(letter)}
            key={index}
          >
            {letter}
          </button>
        ))}
        <SuccessRate incorrect={incorrect.length} />
        <Notify status={status} word={word} reset={reset} />
      </section>
    </div>
  );
}
