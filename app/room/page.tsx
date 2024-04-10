"use client";

import { useEffect, useState } from "react";
import { Board, createBoard } from "~/components/board";
import { CheckIcon } from "~/components/icons/check";
import { LinkIcon } from "~/components/icons/link";
import { SettingsIcon } from "~/components/icons/settings";
import { Button } from "~/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Dialog, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function RoomPage() {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) {
			const timeout = setTimeout(() => setCopied(false), 1000);
			return () => clearTimeout(timeout);
		}
	}, [copied]);

	return (
		<div className="flex flex-col items-center gap-4 w-fit left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] absolute">
			<div className="flex gap-2 w-full justify-end">
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<SettingsIcon />
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
							<div className="flex flex-col gap-4 my-2">
								<Label htmlFor="username">Username</Label>
								<Input id="username" />
								<Button variant="destructive" className="w-full">
									Leave Room
								</Button>
							</div>
						</DialogContent>
					</DialogPortal>
				</Dialog>

				<Button
					onClick={() => {
						navigator.clipboard.writeText(window.location.href);
						setCopied(true);
					}}
				>
					<div className="w-[24px] h-[24px] flex items-center justify-center">
						{copied ? <CheckIcon /> : <LinkIcon />}
					</div>
				</Button>
			</div>
			<Board width={5} height={5} board={createBoard(5, 5)} />
			<Button className="w-full">Start Game</Button>
		</div>
	);
}
