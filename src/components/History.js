import { ACTIONS, GAME } from "../App";

export default function History({ dispatch, place }) {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTIONS.GO_BACK, payload: place });
        GAME.ROUND = place;
      }}
      className={GAME.ROUND === place ? "current" : ""}
    >
      {place !== 0 ? `round ${place} at (${GAME.MOVES[place - 1]})` : `start`}
    </button>
  );
}
