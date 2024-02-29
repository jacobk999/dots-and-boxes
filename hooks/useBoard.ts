"use client";

import { useEffect, useMemo, useState } from "react";

export enum Cell {
  Empty,
  Player1,
  Player2,
  Player3,
  Player4,
  Player5,
  Player6,
  Player7,
  Player8,
}

export type Orientation = "vertical" | "horizontal";
export type BoardState = ReturnType<typeof useBoard>;

export function useBoard(width: number, height: number, players: number) {
  // Create a width x height 2d array of uninitialized boxes
  const [boxes, setBoxes] = useState(createGrid(width, height, Cell.Empty));

  const [verticals, setVerticals] = useState(
    createGrid(width + 1, height, Cell.Empty)
  );

  const [horizontals, setHorizontals] = useState(
    createGrid(width, height + 1, Cell.Empty)
  );

  const [turn, setTurn] = useState(1);

  useEffect(() => {
    setBoxes(createGrid(width, height, Cell.Empty));
    setVerticals(createGrid(width + 1, height, Cell.Empty));
    setHorizontals(createGrid(width, height + 1, Cell.Empty));
  }, [width, height]);

  function isBoxComplete(x: number, y: number) {
    const top = horizontals[y]?.[x];
    const bottom = horizontals[y + 1]?.[x];
    const left = verticals[y]?.[x];
    const right = verticals[y]?.[x + 1];

    return top && bottom && left && right;
  }

  function setBox(x: number, y: number, value: Cell) {
    const newBoxes = [...boxes];
    newBoxes[y][x] = value;
    setBoxes(newBoxes);
  }

  function setLine(x: number, y: number, orientation: Orientation) {
    let hasCompletedBox = false;

    if (orientation === "vertical") {
      const newVerticals = [...verticals];
      newVerticals[y][x] = turn;
      setVerticals(newVerticals);

      // Check if the box to the right is complete
      if (isBoxComplete(x, y)) {
        setBox(x, y, turn);
        hasCompletedBox = true;
      }

      // Check if the box to the left is complete
      if (isBoxComplete(x - 1, y)) {
        setBox(x - 1, y, turn);
        hasCompletedBox = true;
      }
    } else {
      const newHorizontals = [...horizontals];
      newHorizontals[y][x] = turn;
      setHorizontals(newHorizontals);

      // Check if the box below is complete
      if (isBoxComplete(x, y)) {
        setBox(x, y, turn);
        hasCompletedBox = true;
      }

      // Check if the box above is complete
      if (isBoxComplete(x, y - 1)) {
        setBox(x, y - 1, turn);
        hasCompletedBox = true;
      }
    }

    if (!hasCompletedBox) {
      setTurn((turn) => (turn % players) + 1);
    }
  }

  const scores = useMemo(() => {
    const score = Array.from({ length: players }, () => 0);

    for (const row of boxes) {
      for (const box of row) {
        if (box !== Cell.Empty) {
          score[box - 1]++;
        }
      }
    }

    return score;
  }, [boxes, players]);

  return {
    boxes,
    verticals,
    horizontals,
    setLine,
    width,
    height,
    scores,
    turn,
  };
}

function createGrid<T>(width: number, height: number, value: T) {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => value)
  );
}
