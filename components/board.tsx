"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import type { RoomDto } from "~/app/room/[id]/room";
import { cn } from "~/lib/utils";
import { Cell } from "../lib/board";
import type { PlayerDto } from "./player";

export type BoardDto = {
	horizontals: Cell[][];
	verticals: Cell[][];
	boxes: Cell[][];
	lastMove?: { x: number; y: number; orientation: Orientation };
};

interface BoardProps {
	width: number;
	height: number;
	board: BoardDto;
	players: PlayerDto[];
	player?: PlayerDto;
	turnId: string;
	mutateRoom: (room: Partial<RoomDto>) => void;
	started: boolean;
}

export function Board({
	width,
	board,
	players,
	player,
	turnId,
	mutateRoom,
	started,
}: BoardProps) {
	const turn = players.findIndex((p) => p.playerId === turnId);

	function isBoxComplete(x: number, y: number) {
		const top = board.horizontals[y]?.[x];
		const bottom = board.horizontals[y + 1]?.[x];
		const left = board.verticals[y]?.[x];
		const right = board.verticals[y]?.[x + 1];

		return top && bottom && left && right;
	}

	function setBox(x: number, y: number, value: Cell) {
		board.boxes[y][x] = value;
		mutateRoom({ board });
	}

	function setLine(x: number, y: number, orientation: Orientation) {
		if (!started || players[turn].playerId !== player?.playerId) return;

		let hasCompletedBox = false;
		const cell = player?.cell!;

		if (orientation === Orientation.Vertical) {
			if (board.verticals[y][x] !== Cell.Empty) return;

			board.verticals[y][x] = cell;
			board.lastMove = { x, y, orientation };
			mutateRoom({ board });

			// Check if the box to the right is complete
			if (isBoxComplete(x, y)) {
				setBox(x, y, cell);
				hasCompletedBox = true;
			}

			// Check if the box to the left is complete
			if (isBoxComplete(x - 1, y)) {
				setBox(x - 1, y, cell);
				hasCompletedBox = true;
			}
		} else {
			if (board.horizontals[y][x] !== Cell.Empty) return;

			board.horizontals[y][x] = cell;
			board.lastMove = { x, y, orientation };
			mutateRoom({ board });

			// Check if the box below is complete
			if (isBoxComplete(x, y)) {
				setBox(x, y, cell);
				hasCompletedBox = true;
			}

			// Check if the box above is complete
			if (isBoxComplete(x, y - 1)) {
				setBox(x, y - 1, cell);
				hasCompletedBox = true;
			}
		}

		if (!hasCompletedBox) {
			mutateRoom({ turnId: players[(turn + 1) % players.length].playerId });
		}
	}

	return (
		<div
			className="grid w-full"
			style={{
				gridTemplateColumns: `repeat(${width}, 12px 1fr) 12px`,
			}}
		>
			{board.horizontals.map((row, y) => (
				<Fragment key={`frag-${y}`}>
					<Dot />
					{row.map((value, x) => (
						<Fragment key={`frag-h-${x}-${y}`}>
							<Line
								value={value}
								setLine={() => setLine(x, y, Orientation.Horizontal)}
								lastMove={
									board.lastMove?.x === x &&
									board.lastMove?.y === y &&
									board.lastMove?.orientation === Orientation.Horizontal
								}
								disabled={!started}
							/>
							<Dot />
						</Fragment>
					))}
					{board.verticals[y]?.map((value, x) => (
						<Fragment key={`frag-v-${x}-${y}`}>
							<Line
								value={value}
								setLine={() => setLine(x, y, Orientation.Vertical)}
								lastMove={
									board.lastMove?.x === x &&
									board.lastMove?.y === y &&
									board.lastMove?.orientation === Orientation.Vertical
								}
								disabled={!started}
							/>
							{board.boxes[y]?.[x] !== undefined && (
								<Box value={board.boxes[y][x]} />
							)}
						</Fragment>
					))}
				</Fragment>
			))}
		</div>
	);
}

function Box({ value }: { value: Cell }) {
	const color = value === Cell.Empty ? "background" : PlayerColor[value];

	return (
		<motion.div
			className={cn("relative aspect-square scale-105")}
			variants={{
				initial: {
					background: `radial-gradient(circle, hsl(var(--${color}) / 0.75) 0%, hsl(var(--background)) 0%)`,
				},
				filled: {
					background: `radial-gradient(circle, hsl(var(--${color}) / 0.75) 100%, hsl(var(--background)) 100%)`,
				},
			}}
			transition={{ type: "spring", duration: 0.65, delay: 0.15 }}
			animate={value === Cell.Empty ? "initial" : "filled"}
		/>
	);
}

function Dot() {
	return (
		<div className="z-50 h-3 w-3">
			<div className="relative top-1/2 left-1/2 z-10 h-[1.125rem] w-[1.125rem] translate-x-[-50%] translate-y-[-50%] rounded-full bg-accent-foreground" />
		</div>
	);
}

enum Orientation {
	Horizontal = 0,
	Vertical = 1,
}

const PlayerColor: Record<Cell, string> = {
	[Cell.Empty]: "accent",
	[Cell.Player1]: "red",
	[Cell.Player2]: "blue",
	[Cell.Player3]: "green",
	[Cell.Player4]: "yellow",
	[Cell.Player5]: "orange",
	[Cell.Player6]: "indigo",
	[Cell.Player7]: "purple",
	[Cell.Player8]: "pink",
};

function Line({
	value,
	lastMove,
	setLine,
	disabled,
}: {
	value: Cell;
	lastMove?: boolean;
	setLine: () => void;
	disabled?: boolean;
}) {
	const color = PlayerColor[value];

	return (
		<motion.button
			type="button"
			className={cn(
				"z-40 transition-colors disabled:pointer-events-none",
				value !== Cell.Empty && "pointer-events-none",
				lastMove && "animate-darken",
			)}
			variants={{
				initial: {
					background: `radial-gradient(circle, hsl(var(--${color})) 0%, hsl(var(--accent)) 0%)`,
				},
				filled: {
					background: `radial-gradient(circle, hsl(var(--${color})) 100%, hsl(var(--accent)) 100%)`,
				},
			}}
			animate={value === Cell.Empty ? "initial" : "filled"}
			transition={{
				type: "spring",
				duration: 0.45,
			}}
			onClick={() => setLine()}
			disabled={disabled}
		>
			<span className="sr-only">Line - {value}</span>
		</motion.button>
	);
}
