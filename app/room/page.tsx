"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Board, createBoard } from "~/components/board";
import { CheckIcon } from "~/components/icons/check";
import { CrownIcon } from "~/components/icons/crown";
import { LinkIcon } from "~/components/icons/link";
import { LogoIcon } from "~/components/icons/logo";
import { SettingsIcon } from "~/components/icons/settings";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Dialog, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { useWindowSize } from "~/lib/use-window-size";
import { cn } from "~/lib/utils";

export default function RoomPage() {
	const { width, height } = useWindowSize();
	const [copied, setCopied] = useState(false);

	const [username, setUsername] = useState("WWWWWWWWWW");
	const [emoji, setEmoji] = useState("🤤");

	const hasGameEnded = false;

	useEffect(() => {
		if (copied) {
			const timeout = setTimeout(() => setCopied(false), 1500);
			return () => clearTimeout(timeout);
		}
	}, [copied]);

	return (
		<div className="absolute top-1/2 left-1/2 flex w-fit translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-6">
			<Dialog open={hasGameEnded}>
				<DialogPortal>
					<DialogContent className="flex flex-col gap-6">
						<DialogHeader>
							<DialogTitle>You Win! 🎉</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col gap-2">
							<PlayerCard
								name="WWWWWWWWWW"
								score={10}
								emoji={emoji}
								winner
								color="red"
							/>
							<PlayerCard
								name="WWWWWW"
								score={10}
								emoji={emoji}
								color="orange"
							/>
							<PlayerCard
								name="WWWWWWWW"
								score={10}
								emoji={emoji}
								color="yellow"
							/>
						</div>
						<DialogFooter>
							<Button className="w-full" variant="default">
								Play Again
							</Button>
						</DialogFooter>
					</DialogContent>
					<div className="absolute z-50">
						<Confetti width={width} height={height} />
					</div>
				</DialogPortal>
			</Dialog>

			<div className="flex w-full justify-between items-center">
				<LogoIcon flat />
				<div className="flex gap-2">
					<ThemeSwitcher />
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="secondary" size="icon" className="group">
								<SettingsIcon className="group-hover:animate-spin" />
							</Button>
						</DialogTrigger>
						<DialogPortal>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Settings</DialogTitle>
									<DialogDescription>
										Configure your room and game settings.
									</DialogDescription>
								</DialogHeader>
								<div className="my-2 flex flex-col gap-4">
									<div className="flex flex-col gap-2">
										<Label htmlFor="username">Profile</Label>
										<div className="flex flex-row gap-2">
											<Input id="username" defaultValue={username} />
											<Popover modal>
												<PopoverTrigger asChild>
													<Button id="avatar" variant="outline" size="icon">
														{emoji}
													</Button>
												</PopoverTrigger>
												<PopoverContent>
													<div className="grid h-[300px] grid-cols-8 overflow-y-auto p-2">
														{emojis.map((emoji, index) => (
															<PopoverClose asChild>
																{/* TODO: add focusing with arrow keys */}
																<Button
																	key={`${emoji}-${index}`}
																	variant="ghost"
																	size="icon"
																	className="text-2xl"
																	onClick={() => {
																		setEmoji(emoji);
																	}}
																>
																	{emoji}
																</Button>
															</PopoverClose>
														))}
													</div>
												</PopoverContent>
											</Popover>
										</div>
									</div>

									<Button variant="destructive" className="w-full">
										Leave Room
									</Button>
								</div>
							</DialogContent>
						</DialogPortal>
					</Dialog>
				</div>
			</div>
			<Board width={5} height={5} board={createBoard(5, 5)} />
			<div className="flex w-full flex-row gap-2">
				<Button className="grow">Start Game</Button>
				<Button
					variant="link"
					size="icon"
					onClick={() => {
						navigator.clipboard.writeText(window.location.href);
						setCopied(true);
					}}
				>
					<div className="relative flex h-[24px] w-[24px] items-center justify-center">
						<CheckIcon
							animate={copied ? "visible" : "hidden"}
							className="absolute"
						/>
						<LinkIcon
							animate={copied ? "hidden" : "visible"}
							className="absolute"
						/>
					</div>
				</Button>
			</div>
			<div className="grid grid-cols-2 gap-2">
				<PlayerCard
					name="WWWWWWWWWW"
					score={10}
					emoji={emoji}
					winner
					color="red"
				/>
				<PlayerCard name="WWWWWW" score={10} emoji={emoji} color="orange" />
				<PlayerCard
					name="WWWWWWWW"
					score={10}
					emoji={emoji}
					color="yellow"
					winner
				/>
				<PlayerCard
					name="WWWWWWWWWW"
					score={10}
					emoji={emoji}
					winner
					color="green"
				/>
				<PlayerCard name="WWWWWW" score={10} emoji={emoji} color="blue" />
				<PlayerCard name="WWWWWWWW" score={10} emoji={emoji} color="indigo" />
				<PlayerCard name="WWWWWWWW" score={10} emoji={emoji} color="purple" />
				<PlayerCard name="WWWWWWWW" score={10} emoji={emoji} color="pink" />
			</div>
		</div>
	);
}

const emojis = [
	"😀",
	"😃",
	"😄",
	"😁",
	"😆",
	"😅",
	"🤣",
	"😂",
	"🙂",
	"😉",
	"😊",
	"😇",
	"🥰",
	"😍",
	"🤩",
	"😘",
	"😗",
	"😚",
	"😙",
	"🥲",
	"😏",
	"😋",
	"😛",
	"😜",
	"🤪",
	"😝",
	"🤗",
	"🤭",
	"🫢",
	"🫣",
	"🤫",
	"🤔",
	"🫡",
	"🤤",
	"🤠",
	"🥳",
	"🥸",
	"😎",
	"🤓",
	"🧐",
	"🙃",
	"🫠",
	"🤐",
	"🤨",
	"😐",
	"😑",
	"😶",
	"🫥",
	"😶‍🌫️",
	"😒",
	"🙄",
	"😬",
	"😮‍💨",
	"🤥",
	"😌",
	"😔",
	"😪",
	"😴",
	"😷",
	"🤒",
	"🤕",
	"🤢",
	"🤮",
	"🤧",
	"🥵",
	"🥶",
	"🥴",
	"😵",
	"😵‍💫",
	"🤯",
	"🥱",
	"😕",
	"🫤",
	"😟",
	"🙁",
	"☹️",
	"😮",
	"😯",
	"😲",
	"😳",
	"🥺",
	"🥹",
	"😦",
	"😧",
	"😨",
	"😰",
	"😥",
	"😢",
	"😭",
	"😱",
	"😖",
	"😣",
	"😞",
	"😓",
	"😩",
	"😫",
	"😤",
	"😡",
	"😠",
	"🤬",
	"👿",
	"😈",
	"👿",
	"💀",
	"☠️",
	"💩",
	"🤡",
	"👹",
	"👺",
	"👻",
	"👽",
	"👾",
	"🤖",
	"😺",
	"😸",
	"😹",
	"😻",
	"😼",
	"😽",
	"🙀",
	"😿",
	"😾",
	"🙈",
	"🙉",
];

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

function PlayerCard({
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
