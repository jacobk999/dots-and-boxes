"use client";

import { useContext } from "react";
import { Cell, type Orientation } from "~/hooks/useBoard";
import { GameContext } from "./Game";

export function Board() {
  const { width, horizontals, verticals, boxes } = useContext(GameContext);

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${width}, 12px minmax(0, 80px)) 12px`,
      }}
    >
      {horizontals.map((row, y) => (
        <>
          <Dot key={`dot-0-${y}`} />
          {row.map((value, x) => (
            <>
              <Line
                x={x}
                y={y}
                value={value}
                orientation="horizontal"
                key={`horizontal-${x}-${y}`}
              />
              <Dot key={`dot-${x + 1}-${y}`} />
            </>
          ))}
          {verticals[y]?.map((value, x) => (
            <>
              <Line
                x={x}
                y={y}
                value={value}
                orientation="vertical"
                key={`vertical-${x}-${y}`}
              />
              {boxes[y]?.[x] !== undefined && (
                <Box key={`box-${x}-${y}`} value={boxes[y][x]} />
              )}
            </>
          ))}
        </>
      ))}
    </div>
  );
}

const BoxColor: Record<Cell, string> = {
  [Cell.Empty]: "bg-slate-100",
  [Cell.Player1]: "bg-red-100",
  [Cell.Player2]: "bg-sky-100",
  [Cell.Player3]: "bg-green-100",
  [Cell.Player4]: "bg-yellow-100",
  [Cell.Player5]: "bg-orange-100",
  [Cell.Player6]: "bg-teal-100",
  [Cell.Player7]: "bg-purple-100",
  [Cell.Player8]: "bg-pink-100",
};

function Box({ value }: { value: Cell }) {
  return (
    <div className={`${BoxColor[value]} aspect-square transition-colors`} />
  );
}

function Dot() {
  return (
    <div className="h-3 w-3">
      <div className="relative -left-0.5 -top-0.5 h-4 w-4 rounded-full bg-slate-500" />
    </div>
  );
}

const LineColor: Record<Cell, string> = {
  [Cell.Empty]: "bg-slate-200 hover:bg-slate-300 disabled:pointer-events-none",
  [Cell.Player1]: "bg-red-200 pointer-events-none",
  [Cell.Player2]: "bg-sky-200 pointer-events-none",
  [Cell.Player3]: "bg-green-200 pointer-events-none",
  [Cell.Player4]: "bg-yellow-200 pointer-events-none",
  [Cell.Player5]: "bg-orange-200 pointer-events-none",
  [Cell.Player6]: "bg-teal-200 pointer-events-none",
  [Cell.Player7]: "bg-purple-200 pointer-events-none",
  [Cell.Player8]: "bg-pink-200 pointer-events-none",
};

function Line({
  x,
  y,
  value,
  orientation,
}: {
  x: number;
  y: number;
  value: Cell;
  orientation: Orientation;
}) {
  const { setLine, started, players, turn } = useContext(GameContext);

  return (
    <button
      className={`transition-colors ${LineColor[value]}`}
      disabled={!started}
      onClick={() => {
        if (value !== 0) return;

        const player = sessionStorage.getItem("player")!;
        const playerIndex = players.indexOf(player) + 1;
        if (playerIndex !== turn) return;

        setLine(x, y, orientation);
      }}
    />
  );
}
