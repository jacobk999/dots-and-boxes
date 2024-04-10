export function BoardIcon({
	rows,
	columns,
}: { rows: number; columns: number }) {
	return (
		<div
			className="rounded-lg"
			style={{
				width: "200px",
				height: "200px",
				backgroundImage: `repeating-linear-gradient(0deg, currentColor, currentColor 1px, transparent 0, transparent calc(100% / ${rows})), 
													repeating-linear-gradient(90deg, currentColor, currentColor 1px, transparent 0, transparent calc(100% / ${columns}))`,
				boxShadow: "inset 0px 0px 0px 1px currentColor",
			}}
		/>
	);
}
