import { useLayoutEffect, useState } from "react";

export function useWindowSize() {
	const [state, setState] = useState({
		width: 0,
		height: 0,
	});

	useLayoutEffect(() => {
		function handleResize() {
			setState({ width: window.innerWidth, height: window.innerHeight });
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return state;
}
