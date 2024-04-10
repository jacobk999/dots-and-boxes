export function SunIcon({ filled }: { filled: boolean }) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Light Theme</title>
			<path
				d="M19 5L19.5 4.5M12 2V1.5M2 12H1.5M12 22.5V22M22.5 12H22M5 5L4.5 4.5M19 19L19.5 19.5M5 19L4.5 19.5M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
				stroke="currentColor"
				fill={filled ? "currentColor" : "none"}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
