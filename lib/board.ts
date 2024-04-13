import type { BoardDto } from "~/components/board";

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
