"use client";

import ReactConfetti from "react-confetti";
import { useWindowSize } from "~/lib/use-window-size";

export function Confetti() {
	const { width, height } = useWindowSize();

	return (
		<div className="absolute z-50">
			<ReactConfetti width={width} height={height} />
		</div>
	);
}
