import { motion } from "framer-motion";
import { animateVisibility } from "./animate-path";

export function LinkIcon({
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
			<title>Share</title>
			<motion.path
				d="M11.253 9.13176C10.1924 8.0711 7.6468 6.37404 4.53553 9.48531C1 13.0208 3.47487 15.4957 4.18198 16.2028C4.88909 16.9099 7.01041 19.0313 10.8995 15.1422"
				className="stroke-current"
				strokeWidth="1.5"
				strokeLinecap="round"
				initial={{ pathLength: 0, opacity: 0 }}
				variants={animateVisibility}
				animate={animate}
			/>
			<motion.path
				d="M8.77818 10.8995C9.83884 11.9602 12.3844 13.6572 15.4957 10.5459C19.0312 7.01041 16.5563 4.53553 15.8492 3.82843C15.1421 3.12132 13.0208 0.999999 9.13173 4.88909"
				className="stroke-current"
				strokeWidth="1.5"
				strokeLinecap="round"
				initial={{ pathLength: 0, opacity: 0 }}
				variants={animateVisibility}
				animate={animate}
			/>
		</svg>
	);
}
