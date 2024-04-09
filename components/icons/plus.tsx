export function PlusIcon({ filled }: { filled: boolean }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Plus</title>
			{filled ? (
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M1.46447 1.46447C0 2.92893 0 5.28595 0 10C0 14.714 0 17.0711 1.46447 18.5355C2.92893 20 5.28595 20 10 20C14.714 20 17.0711 20 18.5355 18.5355C20 17.0711 20 14.714 20 10C20 5.28595 20 2.92893 18.5355 1.46447C17.0711 0 14.714 0 10 0C5.28595 0 2.92893 0 1.46447 1.46447ZM9 7C9 6.44772 9.44772 6 10 6C10.5523 6 11 6.44772 11 7V9H13C13.5523 9 14 9.44772 14 10C14 10.5523 13.5523 11 13 11H11V13C11 13.5523 10.5523 14 10 14C9.44772 14 9 13.5523 9 13V11H7C6.44772 11 6 10.5523 6 10C6 9.44771 6.44772 9 7 9H9V7Z"
					className="fill-foreground"
				/>
			) : (
				<>
					<path
						d="M0 10C0 5.28595 0 2.92893 1.46447 1.46447C2.92893 0 5.28595 0 10 0C14.714 0 17.0711 0 18.5355 1.46447C20 2.92893 20 5.28595 20 10C20 14.714 20 17.0711 18.5355 18.5355C17.0711 20 14.714 20 10 20C5.28595 20 2.92893 20 1.46447 18.5355C0 17.0711 0 14.714 0 10Z"
						fillOpacity="0.5"
						className="fill-foreground"
					/>
					<path
						d="M10 6C9.44772 6 9 6.44771 9 7V9H7C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11H9V13C9 13.5523 9.44772 14 10 14C10.5523 14 11 13.5523 11 13V11H13C13.5523 11 14 10.5523 14 10C14 9.44771 13.5523 9 13 9H11V7C11 6.44771 10.5523 6 10 6Z"
						className="fill-foreground"
					/>
				</>
			)}
		</svg>
	);
}
