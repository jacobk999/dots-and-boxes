export function CrownIcon({ filled }: { filled: boolean }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Winner</title>
			<path
				d="M10.25 14C13.25 14 14.75 14.75 15.75 15.25L17.25 7.5C14.75 8.5 11.75 8 10.25 4C8.75 8 5.75 8.5 2.75 7.5L4.25 15.25C5.25 14.75 7.25 14 10.25 14Z"
				className={filled ? "fill-current stroke-current" : "stroke-current"}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
