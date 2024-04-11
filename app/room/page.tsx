"use client";

import { useState } from "react";
import Confetti from "react-confetti";
import { Board, createBoard } from "~/components/board";
import { EmojiPicker } from "~/components/emoji-picker";
import { LogoIcon } from "~/components/icons/logo";
import { SettingsIcon } from "~/components/icons/settings";
import { PlayerCard } from "~/components/player-card";
import { ShareButton } from "~/components/share-button";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Modal,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalPortal,
	ModalTitle,
	ModalTrigger,
} from "~/components/ui/modal";
import { useWindowSize } from "~/lib/use-window-size";

export default function RoomPage() {
	const { width, height } = useWindowSize();

	const [username, setUsername] = useState("WWWWWWWWWW");
	const [emoji, setEmoji] = useState("🤤");

	const hasGameEnded = false;

	return (
		<div className="absolute top-1/2 left-1/2 flex w-fit translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-6">
			<Modal open={hasGameEnded}>
				<ModalPortal>
					<ModalContent className="flex flex-col gap-6">
						<ModalHeader>
							<ModalTitle>You Win! 🎉</ModalTitle>
						</ModalHeader>
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
						<ModalFooter>
							<Button className="w-full" variant="default">
								Play Again
							</Button>
						</ModalFooter>
					</ModalContent>
					<div className="absolute z-50">
						<Confetti width={width} height={height} />
					</div>
				</ModalPortal>
			</Modal>

			<div className="flex w-full items-center justify-between">
				<LogoIcon flat />
				<div className="flex gap-2">
					<ThemeSwitcher />
					<Modal>
						<ModalTrigger asChild>
							<Button variant="secondary" size="icon" className="group">
								<SettingsIcon className="group-hover:animate-spin" />
							</Button>
						</ModalTrigger>
						<ModalPortal>
							<ModalContent>
								<ModalHeader>
									<ModalTitle>Settings</ModalTitle>
									<ModalDescription>
										Configure your room and game settings.
									</ModalDescription>
								</ModalHeader>
								<div className="my-2 flex flex-col gap-4">
									<div className="flex flex-col gap-2">
										<Label htmlFor="username">Profile</Label>
										<div className="flex flex-row gap-2">
											<Input id="username" defaultValue={username} />
											<EmojiPicker emoji={emoji} onEmojiChange={setEmoji} />
										</div>
									</div>
									<Button variant="destructive" className="w-full">
										Leave Room
									</Button>
								</div>
							</ModalContent>
						</ModalPortal>
					</Modal>
				</div>
			</div>
			<Board width={5} height={5} board={createBoard(5, 5)} />
			<div className="flex w-full flex-row gap-2">
				<Button className="grow">Start Game</Button>
				<ShareButton />
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
