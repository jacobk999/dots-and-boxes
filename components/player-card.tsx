import { cn } from "~/lib/utils";
import { CrownIcon } from "./icons/crown";

interface PlayerCardProps {
	name: string;
	score: number;
	emoji: string;
	winner?: boolean;
	color:
		| "red"
		| "orange"
		| "yellow"
		| "green"
		| "blue"
		| "indigo"
		| "purple"
		| "pink";
}

export function PlayerCard({
	name,
	score,
	emoji,
	color,
	winner = false,
}: PlayerCardProps) {
	return (
		<div
			className={cn(
				"flex flex-row rounded-md",
				color === "red" && "bg-red-scenery text-red-foreground",
				color === "orange" && "bg-orange-scenery text-orange-foreground",
				color === "yellow" && "bg-yellow-scenery text-yellow-foreground",
				color === "green" && "bg-green-scenery text-green-foreground",
				color === "blue" && "bg-blue-scenery text-blue-foreground",
				color === "indigo" && "bg-indigo-scenery text-indigo-foreground",
				color === "purple" && "bg-purple-scenery text-purple-foreground",
				color === "pink" && "bg-pink-scenery text-pink-foreground",
			)}
		>
			<div
				className={cn(
					"flex grow flex-row items-center gap-1.5 rounded-r-lg rounded-l-md px-3 py-2",
					color === "red" && "bg-red",
					color === "orange" && "bg-orange",
					color === "yellow" && "bg-yellow",
					color === "green" && "bg-green",
					color === "blue" && "bg-blue",
					color === "indigo" && "bg-indigo",
					color === "purple" && "bg-purple",
					color === "pink" && "bg-pink",
				)}
			>
				<div className="relative flex h-8 w-8 items-center justify-center rounded-[50px] bg-white/30 text-xl dark:bg-black/30">
					{winner && (
						<div className="absolute top-[-10px] text-yellow-500">
							<CrownIcon filled />
						</div>
					)}
					{emoji}
				</div>
				<p className="font-semibold">{name}</p>
			</div>
			<div className="flex w-10 items-center justify-center font-extrabold">
				<p>{score}</p>
			</div>
		</div>
	);
}
