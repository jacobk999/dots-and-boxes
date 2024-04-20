"use client";

import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "~/lib/utils";
import { Cell } from "../lib/board";
import { CrownIcon } from "./icons/crown";

export interface PlayerDto {
	playerId: string;
	username: string;
	emoji: string;
	cell: Cell;
	online: boolean;
}

interface PlayerCardProps {
	player: PlayerDto;
	score: number;
	winner?: boolean;
	isTurn?: boolean;
}

export const PlayerCard = forwardRef<HTMLDivElement, PlayerCardProps>(
	({ player, score, winner = false, isTurn = false }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"flex w-full flex-row transition-opacity",
					!player.online && "opacity-50",
				)}
			>
				<motion.div
					className={cn(
						"flex grow flex-row rounded-md",
						PlayerCardBackground[player.cell],
					)}
					variants={{
						initial: { y: "0rem" },
						bouncing: {
							y: ["0rem", "-0.5rem", "0rem"],
							transition: {
								repeat: Number.POSITIVE_INFINITY,
								duration: 1,
								ease: cubicBezier(0.72, 1.48, 0.83, 1.12),
							},
						},
					}}
					animate={isTurn ? "bouncing" : "initial"}
				>
					<div
						className={cn(
							"flex grow flex-row items-center gap-1.5 rounded-r-lg rounded-l-md px-3 py-2",
							PlayerNametagBackground[player.cell],
						)}
					>
						<div className="relative flex h-8 w-8 items-center justify-center rounded-[50px] bg-white/30 text-xl dark:bg-black/30">
							<AnimatePresence>
								{winner && (
									<motion.div
										className="absolute text-yellow-500"
										initial={{ opacity: 0, scale: 0, y: 0 }}
										animate={{ opacity: 1, scale: 1, y: -17 }}
										exit={{ opacity: 0, scale: 0, y: 0 }}
										transition={{ type: "spring", duration: 0.5, delay: 0.3 }}
									>
										<CrownIcon filled />
									</motion.div>
								)}
							</AnimatePresence>

							{player.emoji}
						</div>
						<p className="font-semibold">{player.username}</p>
					</div>
					<div className="flex w-10 items-center justify-center font-extrabold">
						<p>{score}</p>
					</div>
				</motion.div>
			</div>
		);
	},
);

const PlayerCardBackground: Record<Cell, string> = {
	[Cell.Empty]: "bg-background",
	[Cell.Player1]: "bg-red-scenery text-red-foreground",
	[Cell.Player2]: "bg-blue-scenery text-blue-foreground",
	[Cell.Player3]: "bg-green-scenery text-green-foreground",
	[Cell.Player4]: "bg-yellow-scenery text-yellow-foreground",
	[Cell.Player5]: "bg-orange-scenery text-orange-foreground",
	[Cell.Player6]: "bg-indigo-scenery text-indigo-foreground",
	[Cell.Player7]: "bg-purple-scenery text-purple-foreground",
	[Cell.Player8]: "bg-pink-scenery text-pink-foreground",
};

const PlayerNametagBackground: Record<Cell, string> = {
	[Cell.Empty]: "bg-background",
	[Cell.Player1]: "bg-red",
	[Cell.Player2]: "bg-blue",
	[Cell.Player3]: "bg-green",
	[Cell.Player4]: "bg-yellow",
	[Cell.Player5]: "bg-orange",
	[Cell.Player6]: "bg-indigo",
	[Cell.Player7]: "bg-purple",
	[Cell.Player8]: "bg-pink",
};
