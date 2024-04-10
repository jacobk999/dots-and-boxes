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
				gridTemplateColumns: `repeat(${width}, 12px minmax(0, 80px)) 12px`,
			}}
		>
			{board.horizontals.map((row, y) => (
				<>
					<Dot />
					{row.map((value, x) => (
						<>
							<Line
								x={x}
								y={y}
								value={value}
								orientation={Orientation.Horizontal}
							/>
							<Dot />
						</>
					))}
					{board.verticals[y]?.map((value, x) => (
						<>
							<Line
								x={x}
								y={y}
								value={value}
								orientation={Orientation.Vertical}
							/>
							{board.boxes[y]?.[x] !== undefined && (
								<Box value={board.boxes[y][x]} />
							)}
						</>
					))}
				</>
			))}
		</div>
	);
}

const BoxColor: Record<Cell, string> = {
	[Cell.Empty]: "bg-gray-100",
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
			<div className="relative -left-0.5 -top-0.5 h-4 w-4 rounded-full bg-gray-500" />
		</div>
	);
}

enum Orientation {
	Horizontal = 0,
	Vertical = 1,
}

const LineColor: Record<Cell, string> = {
	[Cell.Empty]: "bg-gray-200 hover:bg-gray-300 disabled:pointer-events-none",
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
	return (
		<button type="button" className={`transition-colors ${LineColor[value]}`} />
	);
}
