import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import { useKey } from "react-use";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  max-width: 420px;
  width: 60vw;
  height: 80vh;
`;
const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(6 1fr);
  grid-gap: 5px;
  box-sizing: border-box;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

const BaseGridItem = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  width: 62px;
  height: 62px;
  font-size:2rem;
  text-transform:capitalize;
`;

function App() {
  const word = "ORATE";
  const [activeRow, setActiveRow] = useState(0);
  const [activeColumn, setActiveColumn] = useState(0);
  const [pastGuesses, setPastGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const guesses = [...pastGuesses, currentGuess];
  const data = [0, 1, 2, 3, 4, 5].map((i) =>
    i < guesses.length ? guesses[i] : [0, 0, 0, 0, 0]
  );
  useKey(onlyALpha, addToCurrentGuess);
  useKey(onlyBackSpace, removeFromCurrentGuess);
  function onlyBackSpace(keyBoardEvent) {
    const { key } = keyBoardEvent;
    return key === "Backspace" || key === "Delete";
  }
  function Row({ row }) {
    return (
      <GridRow key={row}>
        {[0, 1, 2, 3, 4].map((column) => (
          <Cell coords={{ row, column }} />
        ))}
      </GridRow>
    );
  }

  function Cell({ coords }) {
    const { row, column } = coords;
    return (
      <BaseGridItem key={column}>
       {data[row][column]!=0?data[row][column]:""}
      </BaseGridItem>
    );
  }
  function removeFromCurrentGuess() {
    if (activeColumn <= 0) return;
    const newGuess = [...currentGuess];
    newGuess.pop();
    setCurrentGuess(newGuess);
    setActiveColumn(activeColumn - 1);
  }
  function onlyALpha(keyBoardEvent) {
    const { key } = keyBoardEvent;
    const onlyAlphaRegex = /[A-Za-z]/g;
    return onlyAlphaRegex.test(key)&&key.length===1;
  }

  function addToCurrentGuess(keyBoardEvent) {
    const { key } = keyBoardEvent;
    if (activeColumn < 5) {
      const newGuess = [...currentGuess, key];

      setCurrentGuess(newGuess);
      setActiveColumn(activeColumn + 1);
    }
  }
  return (
    <div className="App">
      <header className="wordle-header"></header>
      <Container id="wordle-game">
        <Grid>
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <Row row={row} />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
