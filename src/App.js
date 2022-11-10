import logo from './logo.svg';
import './App.css';
import styled from "styled-components";

const Container=styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  max-width: 420px;
  width: 60vw;
  height: 80vh;

`
const Grid =styled.div`
  display: grid;
  grid-template-rows: repeat(6 1fr);
  grid-gap: 5px;
  box-sizing: border-box;
`

const GridRow=styled.div`
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-gap: 5px;
`

const BaseGridItem=styled.div`
  border: 2px solid black;
  width: 62px;
  height:62px;
  `
function App() {
  return (
    <div className="App">
      <header className="wordle-header">
      </header>
      <Container id='wordle-game'>
        <Grid>
            {[0,1,2,3,4,5].map(row=>(
              <GridRow key={row}>
                  {
                    [0,1,2,3,4].map(column=><BaseGridItem key={column}/>)
                  }
              </GridRow>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
