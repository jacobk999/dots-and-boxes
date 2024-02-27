type Board = number[][];

function createBoard(width: number, height: number): Board {
  const board = [];

  for (let y = 0; y < 2 * height + 1; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(0);
    }
    board.push(row);
  }

  return board;
}

export default function Home() {
  return (
    <main>
      <Board board={createBoard(9, 9)} />
    </main>
  );
}

function Board({ board }: { board: Board }) {
  return (
    <div>
      {board.map((row, y) => {
        if (y % 2 === 0) {
          return (
            <div key={y} className="flex">
              <Dot key={`0-${y}-dot`} />
              {row.map((line, x) => (
                <>
                  <Line
                    orientation="horizontal"
                    key={`${x}-${y}-line`}
                    value={line}
                  />
                  <Dot key={`${x + 1}-${y}-dot`} />
                </>
              ))}
            </div>
          );
        } else {
          return (
            <div key={y} className="flex">
              <Line orientation="vertical" key={`0-${y}-line`} />
              {row.map((cell, x) => (
                <>
                  <Box key={`${x + 1}-${y}-box`} />
                  <Line
                    orientation="vertical"
                    key={`${x + 1}-${y}-line`}
                    value={cell}
                  />
                </>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
}

function Box() {
  return <div className="w-16 h-16" />;
}

function Dot() {
  return <div className="w-2 h-2 bg-black rounded-full" />;
}

function Line({
  orientation,
  value,
}: {
  orientation: "horizontal" | "vertical";
  value: number;
}) {
  const size = orientation === "horizontal" ? "w-16 h-2" : "w-2 h-16";
  const color = value === 0 ? "bg-slate-200" : "bg-red-200";

  return <div className={`${size} ${color}`} />;
}
