export function BoardIcon({
	rows,
	columns,
}: { rows: number; columns: number }) {
	return (
		<div className="rounded-[1.25rem] border border-input bg-background p-2">
			<div
				className="rounded-lg"
				style={{
					width: "200px",
					height: "200px",
					backgroundImage: `repeating-linear-gradient(0deg, hsl(var(--accent)), hsl(var(--accent)) 3px, transparent 0, transparent calc(100% / ${rows})), repeating-linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent)) 3px, transparent 0, transparent calc(100% / ${columns}))`,
					boxShadow: "inset 0px 0px 0px 3px hsl(var(--accent))",
				}}
			/>
		</div>
	);
}
