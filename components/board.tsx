import { Fragment } from "react";
import type { RoomDto } from "~/app/room/[id]/room";
import { cn } from "~/lib/utils";
import type { PlayerDto } from "./player";

export enum Cell {
	Empty = 0,
	Player1 = 1,
	Player2 = 2,
	Player3 = 3,
	Player4 = 4,
	Player5 = 5,
	Player6 = 6,
	Player7 = 7,
	Player8 = 8,
}

export type BoardDto = {
	horizontals: Cell[][];
	verticals: Cell[][];
	boxes: Cell[][];
};

export function createBoard(width: number, height: number): BoardDto {
	return {
		boxes: createGrid(width, height),
		horizontals: createGrid(width, height + 1),
		verticals: createGrid(width + 1, height),
	};
}

function createGrid(width: number, height: number) {
	return Array.from({ length: height }, () =>
		Array.from({ length: width }, () => Cell.Empty),
	);
}

interface BoardProps {
	width: number;
	height: number;
	board: BoardDto;
	players: PlayerDto[];
	player?: PlayerDto;
	turnId: string;
	mutateRoom: (room: Partial<RoomDto>) => void;
}

export function Board({
	width,
	board,
	players,
	player,
	turnId,
	mutateRoom,
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
		if (players[turn].playerId !== player?.playerId) return;

		let hasCompletedBox = false;
		const cell = player?.cell!;

		if (orientation === Orientation.Vertical) {
			if (board.verticals[y][x] !== Cell.Empty) return;

			board.verticals[y][x] = cell;
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
			className="grid"
			style={{
				gridTemplateColumns: `repeat(${width}, 12px minmax(0, 93px)) 12px`,
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
							/>
							<Dot />
						</Fragment>
					))}
					{board.verticals[y]?.map((value, x) => (
						<Fragment key={`frag-v-${x}-${y}`}>
							<Line
								value={value}
								setLine={() => setLine(x, y, Orientation.Vertical)}
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

const BoxColor: Record<Cell, string> = {
	[Cell.Empty]: "bg-background",
	[Cell.Player1]: "bg-red/75",
	[Cell.Player2]: "bg-blue/75",
	[Cell.Player3]: "bg-green/75",
	[Cell.Player4]: "bg-yellow/75",
	[Cell.Player5]: "bg-orange/75",
	[Cell.Player6]: "bg-indigo/75",
	[Cell.Player7]: "bg-purple/75",
	[Cell.Player8]: "bg-pink/75",
};

function Box({ value }: { value: Cell }) {
	return (
		<div className={cn("relative aspect-square scale-105", BoxColor[value])} />
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

const LineColor: Record<Cell, string> = {
	[Cell.Empty]: "bg-accent hover:bg-accent/70 disabled:pointer-events-none",
	[Cell.Player1]: "bg-red pointer-events-none",
	[Cell.Player2]: "bg-blue pointer-events-none",
	[Cell.Player3]: "bg-green pointer-events-none",
	[Cell.Player4]: "bg-yellow pointer-events-none",
	[Cell.Player5]: "bg-orange pointer-events-none",
	[Cell.Player6]: "bg-indigo pointer-events-none",
	[Cell.Player7]: "bg-purple pointer-events-none",
	[Cell.Player8]: "bg-pink pointer-events-none",
};

function Line({
	value,
	setLine,
}: {
	value: Cell;
	setLine: () => void;
}) {
	return (
		<button
			type="button"
			className={cn("z-40 transition-colors", LineColor[value])}
			onClick={() => setLine()}
		/>
	);
}
