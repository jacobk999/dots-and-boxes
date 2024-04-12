"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Board, type BoardDto, Cell } from "~/components/board";
import { Confetti } from "~/components/confetti";
import { LogoIcon } from "~/components/icons/logo";
import { PlayerCard, type PlayerDto } from "~/components/player";
import { ShareButton } from "~/components/share-button";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";
import {
	Modal,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalPortal,
	ModalTitle,
} from "~/components/ui/modal";
import { supabase } from "~/lib/supabase";
import { Settings } from "./settings";

export interface RoomDto {
	roomId: string;
	roomName: string;

	players: PlayerDto[];
	board: BoardDto;
	turnId: string;

	ownerId: string;
	started: boolean;
	ended: boolean;
}

function useRoom(initialRoom: RoomDto) {
	const [room, setRoom] = useState(initialRoom);
	const [edited, setEdited] = useState(false);

	// Subscribe to changes from Supabase
	useEffect(() => {
		const channel = supabase
			.channel(`room:${initialRoom.roomId}`)
			.on(
				"postgres_changes",
				{
					schema: "public",
					table: "rooms",
					event: "UPDATE",
					filter: `roomId=eq.${initialRoom.roomId}`,
				},
				(payload) => {
					setRoom(payload.new as RoomDto);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [initialRoom.roomId]);

	// Push changes to Supabase when the room state changes
	useEffect(() => {
		if (!edited) return;

		async function update() {
			await supabase.from("rooms").update(room).eq("roomId", room.roomId);
			setEdited(false);
		}

		update();
	}, [edited, room]);

	function mutateRoom(newRoom: Partial<RoomDto>) {
		setRoom({ ...room, ...newRoom });
		setEdited(true);
	}

	return { room, mutateRoom };
}

function usePlayer(
	room: RoomDto,
	mutateRoom: (newRoom: Partial<RoomDto>) => void,
) {
	const [playerId, setPlayerId] = useState("");
	const player = room.players.find((player) => player.playerId === playerId);

	useEffect(() => {
		const playerId = sessionStorage.getItem(room.roomId);
		if (!playerId) return;

		setPlayerId(playerId);
	}, [room.roomId]);

	function mutatePlayer(newPlayer: Partial<PlayerDto>) {
		mutateRoom({
			players: room.players.map((p) =>
				p.playerId === playerId ? { ...p, ...newPlayer } : p,
			),
		});
	}

	return { player, mutatePlayer };
}

function calculateScores(players: PlayerDto[], boxes: Cell[][]) {
	const cells = new Map<Cell, string>();
	const scores = new Map<string, number>();

	for (const player of players) cells.set(player.cell, player.playerId);

	for (const row of boxes) {
		for (const cell of row) {
			if (cell === Cell.Empty) continue;
			const playerId = cells.get(cell);
			if (!playerId) continue;
			const score = (scores.get(playerId) || 0) + 1;
			scores.set(playerId, score);
		}
	}

	return scores;
}

const MotionPlayerCard = motion(PlayerCard);

export function Room({ initialRoom }: { initialRoom: RoomDto }) {
	const { room, mutateRoom } = useRoom(initialRoom);
	const { player, mutatePlayer } = usePlayer(room, mutateRoom);

	const scores = useMemo(
		() => calculateScores(room.players, room.board.boxes),
		[room.board.boxes, room.players],
	);

	const gameFinishsed = useMemo(() => {
		for (const row of room.board.boxes) {
			for (const cell of row) {
				if (cell === Cell.Empty) return false;
			}
		}

		return true;
	}, [room.board.boxes]);

	return (
		<div className="absolute top-1/2 left-1/2 flex w-fit translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-6">
			<div className="flex w-full items-center justify-between">
				<LogoIcon flat />
				<div className="flex gap-2">
					<ThemeSwitcher />
					<Settings player={player!} mutatePlayer={mutatePlayer} />
				</div>
			</div>
			<Board
				width={room.board.boxes[0].length}
				height={room.board.boxes.length}
				board={room.board}
				players={room.players}
				player={player}
				turnId={room.turnId}
				mutateRoom={mutateRoom}
			/>
			<div className="flex w-full flex-row gap-2">
				<Button className="grow">Start Game</Button>
				<ShareButton link={`/?room=${initialRoom.roomName}`} />
			</div>
			<div className="grid w-full grid-cols-2 gap-2">
				{[...room.players]
					.sort(
						(a, b) =>
							(scores.get(b.playerId) ?? 0) - (scores.get(a.playerId) ?? 0),
					)
					.map((player, index) => (
						<MotionPlayerCard
							key={player.playerId}
							player={player}
							score={scores.get(player.playerId) ?? 0}
							winner={index === 0}
							layout
							transition={{ type: "spring", damping: 25, stiffness: 120 }}
						/>
					))}
			</div>
			<GameFinishedModal open={gameFinishsed} room={room} scores={scores} />
		</div>
	);
}

function GameFinishedModal({
	room,
	scores,
	open,
}: {
	open: boolean;
	room: RoomDto;
	scores: Map<string, number>;
}) {
	return (
		<Modal open={open}>
			<ModalPortal>
				<ModalContent className="flex flex-col gap-6">
					<ModalHeader>
						<ModalTitle>You Win! 🎉</ModalTitle>
					</ModalHeader>
					<div className="flex flex-col gap-2">
						{[...room.players]
							.sort(
								(a, b) =>
									(scores.get(b.playerId) ?? 0) - (scores.get(a.playerId) ?? 0),
							)
							.map((player, index) => (
								<PlayerCard
									key={player.playerId}
									player={player}
									score={scores.get(player.playerId) ?? 0}
									winner={index === 0}
								/>
							))}
					</div>
					<ModalFooter>
						<Button className="w-full" variant="default">
							Play Again
						</Button>
					</ModalFooter>
				</ModalContent>
				<Confetti />
			</ModalPortal>
		</Modal>
	);
}
