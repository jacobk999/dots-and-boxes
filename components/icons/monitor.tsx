export function MonitorIcon({ filled }: { filled: boolean }) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>System Theme</title>
			<path
				d="M12 18H3C1.89543 18 1 17.1046 1 16V5C1 3.89543 1.89543 3 3 3H21C22.1046 3 23 3.89543 23 5V16C23 17.1046 22.1046 18 21 18H12ZM12 18V21.3674M7 22.2069L7.68978 22C10.5014 21.1565 13.4986 21.1565 16.3102 22L17 22.2069"
				stroke="currentColor"
				fill={filled ? "currentColor" : "none"}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
