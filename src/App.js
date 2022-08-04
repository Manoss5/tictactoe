import "./App.css";
import { useReducer } from "react";
import Square from "./components/Square";
import History from "./components/History";

export const ACTIONS = {
  PLAY: "play",
  GO_BACK: "go-back",
  REVERSE_ORDER: "reverse-order",
};

export const GAME = {
  END: false,
  ROUND: 0,
  XO: ["X", "O", "X", "O", "X", "O", "X", "O", "X"],
  MOVES: [],
  WINNING_BLOCKS: [],
};

function GameOver(s) {
  if (s[4] && s[4] === s[0] && s[4] === s[8]) {
    return (
      (GAME.END = `${GAME.XO[GAME.ROUND - 1]} WINS`),
      (GAME.WINNING_BLOCKS = [0, 4, 8])
    );
  }
  if (s[4] && s[4] === s[6] && s[4] === s[2]) {
    return (
      (GAME.END = `${GAME.XO[GAME.ROUND - 1]} WINS`),
      (GAME.WINNING_BLOCKS = [2, 4, 6])
    );
  }
  if (s[4] && s[4] === s[3] && s[4] === s[5]) {
    return (
      (GAME.END = `${GAME.XO[GAME.ROUND - 1]} WINS`),
      (GAME.WINNING_BLOCKS = [3, 4, 5])
    );
  }
  if (s[4] && s[4] === s[1] && s[4] === s[7]) {
    return (
      (GAME.END = `${GAME.XO[GAME.ROUND - 1]} WINS`),
      (GAME.WINNING_BLOCKS = [1, 4, 7])
    );
  }
  if (s[0] && s[0] === s[1] && s[0] === s[2]) {
    return (
      (GAME.END = `${GAME.XO[GAME.ROUND - 1]} WINS`),
      (GAME.WINNING_BLOCKS = [0, 1, 2])
    );
  }
  if (s[0] && s[0] === s[3] && s[0] === s[6]) {
    return (
      (GAME.END = `${GAME.XO[GAME.ROUND - 1]} WINS`),
      (GAME.WINNING_BLOCKS = [0, 3, 6])
    );
  }
  if (s[8] && s[8] === s[7] && s[8] === s[6]) {
    return (
      (GAME.END = `${GAME.XO[GAME.ROUND - 1]} WINS`),
      (GAME.WINNING_BLOCKS = [6, 7, 8])
    );
  }
  if (s[8] && s[8] === s[5] && s[8] === s[2]) {
    return (
      (GAME.END = `${GAME.XO[GAME.ROUND - 1]} WINS`),
      (GAME.WINNING_BLOCKS = [2, 5, 8])
    );
  }
  if (GAME.ROUND === 9) {
    return (GAME.END = "DRAW");
  }
  return;
}

function reducer(state, action) {
  const val = state.val;
  const history = state.history;
  switch (action.type) {
    case ACTIONS.PLAY:
      val[action.payload] = GAME.XO[GAME.ROUND - 1];
      history[GAME.ROUND] = [...val];
      history[GAME.ROUND + 1] && history.splice(GAME.ROUND + 1);
      if (GAME.ROUND > 4) {
        GameOver(val);
      }
      return {
        ...state,
        val,
        history,
      };
    case ACTIONS.GO_BACK:
      GAME.WINNING_BLOCKS = [];
      GAME.ROUND < history.length - 1
        ? (GAME.END = false)
        : GameOver(history[history.length - 1]);
      return {
        ...state,
        val: [...history[action.payload]],
      };
    case ACTIONS.REVERSE_ORDER:
      return {
        ...state,
        direction: state.direction === "column" ? "column-reverse" : "column",
      };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    direction: "column",
    val: [],
    history: [[]],
  });

  let history = state.history.map((h) => {
    let ind = state.history.indexOf(h);
    return (
      <li key={ind}>
        <History dispatch={dispatch} place={ind} move={GAME.MOVES[ind]} />
      </li>
    );
  });

  let board = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
    return <Square key={i} val={state.val} place={i} dispatch={dispatch} />;
  });

  return (
    <div className="App">
      <div className="turn">
        <span>{GAME.END ? GAME.END : `${GAME.XO[GAME.ROUND]}'s TURN`}</span>
      </div>
      <div className="tictactoe">{board}</div>
      <ul style={{ flexDirection: `${state.direction}` }}>{history}</ul>
      <button
        className="reverse"
        onClick={() => dispatch({ type: ACTIONS.REVERSE_ORDER })}
      >
        Reverse Order
      </button>
    </div>
  );
}

export default App;
