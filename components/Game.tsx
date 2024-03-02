"use client";

import { createContext, useContext, useMemo } from "react";
import { useBoard, Cell, type BoardState } from "~/hooks/useBoard";
import { Tables } from "~/utils/database.types";
import { Modal, ModalContent } from "./Modal";
import { Button } from "./Button";
import { motion } from "framer-motion";
import { LinkIcon } from "~/icons/Link";
import { Board } from "./Board";

export const GameContext = createContext<
  Omit<Tables<"rooms">, "id" | "name" | "created_at"> & BoardState
>({
  players: [],
  boxes: [],
  verticals: [],
  horizontals: [],
  turn: 1,
  width: 0,
  height: 0,
  setLine: () => {},
  scores: new Map(),
  started: false,
  ended: false,
});

interface GameProps {
  room: Tables<"rooms">;
  setRoom: (room: Tables<"rooms">) => void;
}

export function Game({ room, setRoom }: GameProps) {
  const board = useBoard(room, setRoom);

  const isWinner = useMemo(() => {
    if (!board.ended) return false;

    const [winner] = room.players
      .map((player) => [player, board.scores.get(player) ?? 0] as const)
      .sort((a, b) => b[1] - a[1])[0];

    return winner == sessionStorage.getItem("player");
  }, [board.ended, board.scores, room.players]);

  return (
    <GameContext.Provider
      value={{
        ...room,
        ...board,
      }}
    >
      <div className="fixed inset-0 m-auto flex h-fit w-fit flex-col items-center gap-4 p-2">
        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-bold">{room.name}</h1>
          <Button color="indigo" padding="sm">
            <LinkIcon />
          </Button>
        </div>
        <Board />
        <Scores />
        {!room.started && (
          <Button
            full
            color="emerald"
            onClick={() => setRoom({ ...room, started: true })}
          >
            Start
          </Button>
        )}
      </div>
      <Modal open={board.ended}>
        <ModalContent>
          <h1 className="text-4xl font-bold">
            {isWinner ? "You Win" : "You Lose"}
          </h1>
          <Scores />
          <Button full color="emerald">
            Play Again
          </Button>
        </ModalContent>
      </Modal>
    </GameContext.Provider>
  );
}

const ScoreColor: Record<Exclude<Cell, Cell.Empty>, string> = {
  [Cell.Player1]: "bg-red-200 text-red-900 border-red-400",
  [Cell.Player2]: "bg-sky-200 text-sky-900 border-sky-400",
  [Cell.Player3]: "bg-green-200 text-green-900 border-green-400",
  [Cell.Player4]: "bg-yellow-200 text-yellow-900 border-yellow-400",
  [Cell.Player5]: "bg-orange-200 text-orange-900 border-orange-400",
  [Cell.Player6]: "bg-teal-200 text-teal-900 border-teal-400",
  [Cell.Player7]: "bg-purple-200 text-purple-900 border-purple-400",
  [Cell.Player8]: "bg-pink-200 text-pink-900 border-pink-400",
};

const TurnIndicatorColor: Record<Exclude<Cell, Cell.Empty>, string> = {
  [Cell.Player1]: "bg-red-400",
  [Cell.Player2]: "bg-sky-400",
  [Cell.Player3]: "bg-green-400",
  [Cell.Player4]: "bg-yellow-400",
  [Cell.Player5]: "bg-orange-400",
  [Cell.Player6]: "bg-teal-400",
  [Cell.Player7]: "bg-purple-400",
  [Cell.Player8]: "bg-pink-400",
};

function Scores() {
  const { scores, players, turn, ended } = useContext(GameContext);

  return (
    <div className="grid w-full grid-cols-4 gap-3">
      {players
        .map((player, i) => ({
          player,
          score: scores.get(player) ?? 0,
          cell: (i + 1) as Exclude<Cell, Cell.Empty>,
        }))
        .sort((a, b) => b.score - a.score)
        .map(({ player, score, cell }) => (
          <motion.div
            key={cell}
            data-active={cell === turn && !ended}
            layout
            style={{ borderRadius: "6px" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className={`group flex flex-col items-center p-2 drop-shadow-sm data-[active=true]:border data-[active=true]:font-bold ${ScoreColor[cell]} relative`}
          >
            <p>{player}</p>
            <p className="text-2xl">{score}</p>
            <span className="absolute -right-1 -top-1 hidden group-data-[active=true]:flex">
              <span
                className={`absolute h-full w-full animate-ping rounded-full bg-black  ${TurnIndicatorColor[cell]}`}
              />
              <span
                className={`relative inline-flex h-3 w-3 rounded-full ${TurnIndicatorColor[cell]}`}
              />
            </span>
          </motion.div>
        ))}
    </div>
  );
}
