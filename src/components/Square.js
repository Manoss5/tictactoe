import { ACTIONS, GAME } from "../App.js";

export default function Square({ val, place, dispatch }) {
  return (
    <button
      onClick={() => {
        if (!val[place] && !GAME.END) {
          GAME.ROUND++;
          dispatch({ type: ACTIONS.PLAY, payload: place });
          GAME.MOVES[GAME.ROUND - 1] = [
            ...[Math.floor(place / 3) + 1, (place % 3) + 1],
          ];
          console.log(GAME.MOVES);
        }
      }}
      className={GAME.WINNING_BLOCKS.includes(place) ? "winning" : ""}
    >
      {val[place]}
    </button>
  );
}
