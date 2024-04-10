export const animateVisibility = {
	hidden: { pathLength: 0, opacity: 0 },
	visible: (i: number) => {
		const delay = 1 + i * 0.5;
		return {
			pathLength: 1,
			opacity: 1,
			transition: {
				pathLength: { delay, type: "spring", duration: 1, bounce: 0 },
				// Only mo sees the paths at length 0 at this 0.25s duration
				opacity: { delay, duration: 0.25 },
			},
		};
	},
};
