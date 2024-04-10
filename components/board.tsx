import { Fragment } from "react";
import { cn } from "~/lib/utils";

enum Cell {
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

type Board = {
	horizontals: Cell[][];
	verticals: Cell[][];
	boxes: Cell[][];
};

export function createBoard(width: number, height: number): Board {
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
	board: Board;
}

export function Board({ width, board }: BoardProps) {
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
								x={x}
								y={y}
								value={value}
								orientation={Orientation.Horizontal}
							/>
							<Dot />
						</Fragment>
					))}
					{board.verticals[y]?.map((value, x) => (
						<Fragment key={`frag-v-${x}-${y}`}>
							<Line
								x={x}
								y={y}
								value={value}
								orientation={Orientation.Vertical}
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
	return (
		<button
			type="button"
			className={cn("z-40 transition-colors", LineColor[value])}
		/>
	);
}
