import React, {
  createContext,
  useContext,
  useReducer,
  Reducer,
  ReducerState,
  ReducerAction,
  Dispatch,
} from "react";
import {
  checkDraw,
  checkWinner,
  createBoard,
  generateWinningCombinations,
  switchPlayer,
} from "../utils";

export const actionTypes = {
  MAKE_MOVE: "MAKE_MOVE",
  RESET_GAME: "RESET_GAME",
  START_GAME: "START_GAME",
  RESIZE_BOARD: "RESIZE_BOARD",
};

/**
 * Tic tac toe store.
 * @typedef {Object} TicTacToeStore
 * @property {number} size
 * @property {number[]} board
 * @property {'X' | 'O' | null} currentPlayer
 * @property {number[][]} winningCombinations
 * @property {"win" | "draw" | null} result
 */

/**
 * Tic tac toe action.
 * @typedef {Object} TicTacToeAction
 * @property {keyof actionTypes} type
 * @property {{}} payload
 */

/**
 * Tic tac toe reducer.
 * @typedef {Reducer<TicTacToeStore, TicTacToeAction>} TicTacToeReducer
 */

/**
 * @param {number} size
 * @returns {TicTacToeStore}
 */
const initialState = (size = 3, currentPlayer = null) => ({
  size,
  board: createBoard(size),
  currentPlayer,
  result: null,
  winningCombinations: currentPlayer ? generateWinningCombinations(size) : [],
});

/**
 * @param {TicTacToeStore} state
 * @param {TicTacToeAction} action
 */
const ticTacToeReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.MAKE_MOVE: {
      const { index } = action.payload;
      const { board, currentPlayer, winningCombinations } = state;

      if (board[index] || state.result) {
        return state; // Invalid move or game already won
      }

      const newBoard = [...board];
      newBoard[index] = currentPlayer;

      const result = checkWinner(newBoard, currentPlayer, winningCombinations)
        ? "win"
        : checkDraw(newBoard)
          ? "draw"
          : null;

      return {
        ...state,
        board: newBoard,
        currentPlayer: result ? currentPlayer : switchPlayer(currentPlayer),
        result,
      };
    }
    case actionTypes.RESET_GAME: {
      return initialState(state.size);
    }
    case actionTypes.RESIZE_BOARD: {
      return initialState(action.payload.size);
    }
    case actionTypes.START_GAME: {
      const { size } = state;
      return initialState(size, "X");
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

/**
 * @type {React.Context<[ReducerState<TicTacToeReducer>, Dispatch<ReducerAction<TicTacToeReducer>>]>}
 */
const TicTacToeContext = createContext();

export const TicTacToeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticTacToeReducer, initialState());

  return (
    <TicTacToeContext.Provider value={[state, dispatch]}>
      {children}
    </TicTacToeContext.Provider>
  );
};

export const useTicTacToe = () => useContext(TicTacToeContext);
