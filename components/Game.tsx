"use client";

import { createContext, useContext } from "react";
import {
  useBoard,
  Cell,
  type BoardState,
  type Orientation,
} from "~/hooks/useBoard";

const GameContext = createContext<BoardState>({
  boxes: [],
  verticals: [],
  horizontals: [],
  setLine: () => {},
  width: 0,
  height: 0,
  scores: [],
  turn: 1,
});

export function Game() {
  const board = useBoard(9, 9, 8);

  return (
    <GameContext.Provider value={board}>
      <div className="flex flex-col p-2 md:flex-row gap-4">
        <Board />
        <Scores />
      </div>
    </GameContext.Provider>
  );
}

function Board() {
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

const ScoreColor: Record<Exclude<Cell, Cell.Empty>, string> = {
  [Cell.Player1]:
    "bg-red-100 text-red-900 border-red-200 data-[active=true]:border-red-400",
  [Cell.Player2]:
    "bg-blue-100 text-blue-900 border-blue-200 data-[active=true]:border-blue-400",
  [Cell.Player3]:
    "bg-green-100 text-green-900 border-green-200 data-[active=true]:border-green-400",
  [Cell.Player4]:
    "bg-yellow-100 text-yellow-900 border-yellow-200 data-[active=true]:border-yellow-400",
  [Cell.Player5]:
    "bg-orange-100 text-orange-900 border-orange-200 data-[active=true]:border-orange-400",
  [Cell.Player6]:
    "bg-teal-100 text-teal-900 border-teal-200 data-[active=true]:border-teal-400",
  [Cell.Player7]:
    "bg-purple-100 text-purple-900 border-purple-200 data-[active=true]:border-purple-400",
  [Cell.Player8]:
    "bg-pink-100 text-pink-900 border-pink-200 data-[active=true]:border-pink-400",
};

function Scores() {
  const { scores, turn } = useContext(GameContext);

  return (
    <div className="flex flex-col gap-3">
      {scores.map((score, i) => (
        <div
          key={i}
          data-active={i + 1 === turn}
          className={`drop-shadow-sm p-2 border rounded-md transition-all data-[active=true]:animate-pulse data-[active=true]:font-bold ${
            ScoreColor[(i + 1) as Exclude<Cell, Cell.Empty>]
          }`}
        >
          Player {i + 1}: {score}
        </div>
      ))}
    </div>
  );
}

const BoxColor: Record<Cell, string> = {
  [Cell.Empty]: "bg-slate-100",
  [Cell.Player1]: "bg-red-100",
  [Cell.Player2]: "bg-blue-100",
  [Cell.Player3]: "bg-green-100",
  [Cell.Player4]: "bg-yellow-100",
  [Cell.Player5]: "bg-orange-100",
  [Cell.Player6]: "bg-teal-100",
  [Cell.Player7]: "bg-purple-100",
  [Cell.Player8]: "bg-pink-100",
};

function Box({ value }: { value: Cell }) {
  return (
    <div className={`${BoxColor[value]} transition-colors aspect-square`} />
  );
}

function Dot() {
  return (
    <div className="w-3 h-3">
      <div className="bg-slate-500 rounded-full relative w-4 h-4 -left-0.5 -top-0.5" />
    </div>
  );
}

const LineColor: Record<Cell, string> = {
  [Cell.Empty]: "bg-slate-200 hover:bg-slate-300",
  [Cell.Player1]: "bg-red-200 pointer-events-none",
  [Cell.Player2]: "bg-blue-200 pointer-events-none",
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
  const { setLine } = useContext(GameContext);

  return (
    <button
      className={`transition-colors ${LineColor[value]}`}
      onClick={() => {
        if (value !== 0) return;
        setLine(x, y, orientation);
      }}
    />
  );
}
