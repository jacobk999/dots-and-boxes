export function MoonIcon({ filled }: { filled: boolean }) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Dark Theme</title>
			<path
				d="M20.9999 11.9658C19.8486 13.789 17.8157 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.18428 10.211 4.15139 12.0342 3.00006C12.0228 3.00002 12.0114 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.9886 21 11.9772 20.9999 11.9658Z"
				stroke="currentColor"
				fill={filled ? "currentColor" : "none"}
				strokeWidth="2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
