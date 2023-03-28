import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box, Grid, Link, Typography } from "@mui/material";

function Square({ value, onSquareClick }) {
  return (
    <Button
      variant="outlined"
      component="label"
      size="large"
      sx={{ width: "64px", height: "64px", fontSize: "x-large" }}
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </Button>
  );
}

function Board({ oysterIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (oysterIsNext) {
      nextSquares[i] = "🥂";
    } else {
      nextSquares[i] = "🦪";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (oysterIsNext ? "🦪" : "🥂");
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="baseline"
      >
        <Grid>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </Grid>
        <Grid>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </Grid>
        <Grid>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </Grid>
      </Grid>
      <Typography variant="p" component="p" align="center" sx={{ m: 2 }}>
        {status}
      </Typography>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const oysterIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function JumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <Button
        key={move}
        onClick={() => JumpTo(move)}
        sx={{ fontSize: "x-small" }}
      >
        {description}
      </Button>
    );
  });

  return (
    <Box>
      <Typography variant="h6" component="p" sx={{ mt: 4, mb: 2 }}>
        Enjoy Tic-Tac-Toe game while waiting.
      </Typography>
      <Grid
        item
        container
        alignItems="flex-start"
        justifyContent="space-around"
      >
        <Grid>
          <Board
            oysterIsNext={oysterIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </Grid>
        <Grid>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            {moves}
          </ButtonGroup>
        </Grid>
      </Grid>
      <Link
        href="https://react.dev/learn/tutorial-tic-tac-toe"
        underline="always"
        target="_blank"
      >
        React Tutorial: Tic-Tac-Toe
      </Link>
    </Box>
  );
}
