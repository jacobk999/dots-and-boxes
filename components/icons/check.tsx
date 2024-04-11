import { motion } from "framer-motion";
import { animateVisibility } from "./animate-path";

export function CheckIcon({
	animate,
	className,
}: { animate: "hidden" | "visible"; className?: string }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>Check</title>
			<motion.path
				d="M2.5 10.7132L7.51684 15.7247L7.91768 15.0238C10.0668 11.2658 13.041 8.0448 16.6161 5.60354L17.5 5"
				className="stroke-current"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				initial={{ pathLength: 0, opacity: 0 }}
				variants={animateVisibility}
				animate={animate}
			/>
		</svg>
	);
}
