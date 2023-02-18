import React, { useState, useEffect, useCallback, useRef } from "react";
const size = 9;
const GameBoard = () => {
  const [data, setData] = useState(Array(size).fill(0));
  const [gameOver, setGameOver] = useState(false);
  const [move, setMove] = useState(0);
  useEffect(() => {
    initialize();
  }, [gameOver]);

  useEffect(() => {
    if (move > 0) generateNumbers();
  }, [move]);
  const generateNumbers = () => {
    let newData = [...data];
    let editableIdx = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] == 0) {
        editableIdx.push(i);
      }
    }
    if (editableIdx.length > 0) {
      let r = editableIdx[Math.floor(Math.random() * editableIdx.length)];
      let v = Math.random() > 0.5 ? 4 : 2;
      newData[r] = v;
      setData([...newData]);
    } else {
      setGameOver(true);
    }
  };
  const initialize = () => {
    generateNumbers();
    setMove(1);
  };

  const handleUp = (up) => {
    let newData = [...data];

    if (up) {
      for (let i = 0; i < 3; i++) {
        let s = i;
        let e = s + 3;
        while (e < data.length - 2 + i) {
          if (newData[s] == newData[e]) {
            if (newData[s] != 0 && newData[e] != 0) {
              newData[s] = newData[s] * 2;
              newData[e] = 0;
              s += 3;
            }
          } else {
            if (newData[s] != 0 && newData[s] != 0) {
              s += 3;
            }
          }
          if (newData[s] == 0 && newData[e] != 0) {
            newData[s] = newData[e];
            newData[e] = 0;
          }
          e += 3;
        }
      }
    } else {
      for (let i = 0; i <= 2; i++) {
        let s = i + 3 * 2;
        let e = s - 3;
        while (e >= i) {
          if (newData[s] == newData[e]) {
            if (newData[s] != 0 && newData[e] != 0) {
              newData[s] = newData[s] * 2;
              newData[e] = 0;
              s -= 3;
            }
          } else {
            if (newData[s] != 0 && newData[e] != 0) {
              s -= 3;
            }
          }
          if (newData[s] == 0 && newData[e] != 0) {
            newData[s] = newData[e];
            newData[e] = 0;
          }
          e -= 3;
        }
      }
    }

    setData([...newData]);

    setMove((m) => m + 1);
  };
  const handleLeft = (left) => {
    let newData = [...data];
    if (left) {
      for (let i = 0; i < 3; i++) {
        let s = i * 3;
        let e = s + 1;
        while (e < 3 * (i + 1)) {
          if (newData[s] == newData[e]) {
            if (newData[s] != 0 && newData[e] != 0) {
              newData[s] = newData[s] * 2;
              newData[e] = 0;
              s += 1;
            }
          } else {
            if (newData[s] != 0 && newData[e] != 0) {
              s += 1;
            }
          }
          if (newData[s] == 0 && newData[e] != 0) {
            newData[s] = newData[e];
            newData[e] = 0;
          }
          e += 1;
        }
      }
    } else {
      for (let i = 0; i <= 2; i++) {
        let s = 3 * i + (3 - 1);
        let e = s - 1;
        while (e >= 3 * i) {
          if (newData[s] == newData[e]) {
            if (newData[s] != 0 && newData[e] != 0) {
              newData[s] = newData[s] * 2;
              newData[e] = 0;
              s -= 1;
            }
          } else {
            if (newData[s] != 0 && newData[e] != 0) {
              s -= 1;
            }
          }
          if (newData[s] == 0 && newData[e] != 0) {
            newData[s] = newData[e];
            newData[e] = 0;
          }
          e -= 1;
        }
      }
    }
    setData([...newData]);
    setMove((m) => m + 1);
  };

  const handleKeyPress = useCallback(
    (event) => {
      const { keyCode } = event;
      if (keyCode > 36 && keyCode < 41 && !gameOver) {
        if (keyCode == "37") {
          handleLeft(true);
        } else if (keyCode == "38") {
          handleUp(true);
        } else if (keyCode == "39") {
          handleLeft(false);
        } else if (keyCode == "40") {
          handleUp(false);
        }
      }
    },
    [data]
  );

  const reset = () => {
    if (gameOver) {
      setData([...Array(9).fill(0)]);
      setGameOver(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleKeyPress]);
  return (
    <div className="board">
      <div className="board__menu">
        <button onClick={() => reset()}>Reset</button>
      </div>
      <div className="board__grid">
        {data?.map((row, i) => {
          // return row.map((col, j) => {
          // console.log(i, j);
          return (
            <div
              key={`${i}`}
              data={row}
              className={`board__box ${row !== 0 ? "expand" : ""}`}
            >
              {row != "0" ? row : ""}
            </div>
          );
          // });
        })}
      </div>
      <div className="board__menu">
        <p className="gameover">{`Gameover: ${gameOver}`}</p>
      </div>
      <div className="controls">
        <div onClick={() => handleUp(true)} className="controls__btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
            />
          </svg>
        </div>
        <div className="controls__lr">
          <div onClick={() => handleLeft(true)} className="controls__btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </div>
          <div onClick={() => handleLeft(false)} className="controls__btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
        <div onClick={() => handleUp(false)} className="controls__btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
