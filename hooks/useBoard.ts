"use client";

import { useEffect, useMemo, useState } from "react";
import type { Tables } from "~/utils/database.types";

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

export function useBoard(
  room: Tables<"rooms">,
  setRoom: (room: Tables<"rooms">) => void
) {
  const { players, horizontals, verticals, boxes, turn } = room;

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
    setRoom({ ...room, boxes: newBoxes });
  }

  function setLine(x: number, y: number, orientation: Orientation) {
    let hasCompletedBox = false;

    if (orientation === "vertical") {
      const newVerticals = [...verticals];
      newVerticals[y][x] = turn;
      setRoom({ ...room, verticals: newVerticals });

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
      setRoom({ ...room, horizontals: newHorizontals });

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
      setRoom({ ...room, turn: (turn % players.length) + 1 });
    }
  }

  const scores = useMemo(() => {
    const score = new Map();

    for (const row of boxes) {
      for (const box of row) {
        if (box !== Cell.Empty) {
          const player = players[box - 1];
          score.set(player, score.get(player) + 1 || 1);
        }
      }
    }

    return score;
  }, [boxes, players]);

  const ended = useMemo(() => {
    for (const row of boxes) {
      for (const box of row) {
        if (box === Cell.Empty) {
          return false;
        }
      }
    }

    return true;
  }, [boxes]);

  return {
    scores,
    ended,
    setLine,
  };
}
