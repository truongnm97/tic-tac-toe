import React from "react";
import { actionTypes, useTicTacToe } from "../contexts/TicTacToeContext";
import classes from "../styles/tic-tac-toe.module.scss";
import { oMark, xMark } from "../assets/icons";

const TicTacToePage = () => {
  const [{ board, size, currentPlayer, result }, dispatch] = useTicTacToe();

  const isGameStarted = !!currentPlayer;

  const currentPlayerIcon = currentPlayer && (
    <img
      src={currentPlayer === "X" ? xMark : currentPlayer === "O" ? oMark : ""}
      alt={currentPlayer}
      width={40}
    />
  );

  const handleCellClick = (index) => {
    if (result || !isGameStarted) return;

    dispatch({ type: actionTypes.MAKE_MOVE, payload: { index } });
  };

  const handleStart = () => {
    if (isGameStarted) {
      dispatch({ type: actionTypes.RESET_GAME });
    } else {
      dispatch({ type: actionTypes.START_GAME });
    }
  };

  const handleResize = (size) => {
    dispatch({ type: actionTypes.RESIZE_BOARD, payload: { size } });
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className={classes["size-wrapper"]}>
        {!isGameStarted && (
          <button
            disabled={size <= 3}
            className={classes["size-button"]}
            onClick={() => handleResize(size - 1)}
          >
            ◀
          </button>
        )}
        <div className={classes.size}>
          <span>{size}</span>
          <span className={classes.multiply}>x</span>
          <span>{size}</span>
        </div>
        {!isGameStarted && (
          <button
            disabled={size >= 10}
            className={classes["size-button"]}
            onClick={() => handleResize(size + 1)}
          >
            ▶
          </button>
        )}
      </div>
      {isGameStarted ? (
        result ? (
          result === "draw" ? (
            <h2 className={classes.result}>It's a draw!</h2>
          ) : (
            <h2 className={classes.result}>Player {currentPlayerIcon} wins!</h2>
          )
        ) : (
          <h2 className={classes.currentPlayer}>
            Current Player: {currentPlayerIcon}
          </h2>
        )
      ) : (
        <h2>Press Start</h2>
      )}
      <div
        className={classes.board}
        style={{
          gridTemplateColumns: `repeat(${size}, 60px)`,
        }}
      >
        {board.map((cell, index) => {
          const topRow = index < size ? classes["top-row"] : "";
          const leftCol = index % size === 0 ? classes["left-col"] : "";
          const rightCol = (index + 1) % size === 0 ? classes["right-col"] : "";
          const bottomRow =
            index >= size * (size - 1) ? classes["bottom-row"] : "";
          const disabled = !isGameStarted || cell || result;

          return (
            <div
              key={index}
              className={`${classes.cell} ${disabled ? classes.disabled : ""} ${topRow} ${leftCol} ${rightCol} ${bottomRow}`}
              onClick={() => handleCellClick(index)}
            >
              {cell === "X" && <img src={xMark} alt="X" width={40} />}
              {cell === "O" && <img src={oMark} alt="Y" height={40} />}
            </div>
          );
        })}
      </div>
      <button className={isGameStarted ? "danger" : "success"} onClick={handleStart}>
        {isGameStarted ? "Reset" : "Start"}
      </button>
    </div>
  );
};

export default TicTacToePage;
