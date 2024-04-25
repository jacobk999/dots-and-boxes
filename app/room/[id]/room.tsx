"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Board, type BoardDto } from "~/components/board";
import { Confetti } from "~/components/confetti";
import { LogoIcon } from "~/components/icons/logo";
import { PlayerCard, type PlayerDto } from "~/components/player";
import { ShareButton } from "~/components/share-button";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";
import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalPortal,
	ModalTitle,
} from "~/components/ui/modal";
import { Cell, createBoard } from "~/lib/board";
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
}

function useRoom(initialRoom: RoomDto) {
	const [room, setRoom] = useState(initialRoom);
	const [edited, setEdited] = useState(false);

	// Subscribe to changes from Supabase
	useEffect(() => {
		const playerId = sessionStorage.getItem(initialRoom.roomId)!;

		const channel = supabase
			.channel(`room:${initialRoom.roomId}`, {
				config: { presence: { key: playerId } },
			})
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
			.on("presence", { event: "join" }, ({ key }) => {
				setRoom((room) => ({
					...room,
					players: room.players.map((p) =>
						p.playerId === key ? { ...p, online: true } : p,
					),
				}));
			})
			.on("presence", { event: "leave" }, ({ key }) => {
				setRoom((room) => ({
					...room,
					players: room.players.map((p) =>
						p.playerId === key ? { ...p, online: false } : p,
					),
				}));
			})
			.subscribe(async (status) => {
				if (status !== "SUBSCRIBED") return;
				if (!playerId) return;

				await channel.track({ id: playerId });
			});

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
	for (const player of players) cells.set(player.cell, player.playerId);

	const scores = new Map<string, number>();

	let maxScore = 0;
	let maxPlayerId = undefined;

	for (const row of boxes) {
		for (const cell of row) {
			if (cell === Cell.Empty) continue;

			const playerId = cells.get(cell);
			if (!playerId) continue;

			const score = (scores.get(playerId) || 0) + 1;
			scores.set(playerId, score);

			if (score > maxScore) {
				maxScore = score;
				maxPlayerId = playerId;
			}
		}
	}

	return { scores, winnerId: maxPlayerId };
}

const MotionPlayerCard = motion(PlayerCard);

export function Room({ initialRoom }: { initialRoom: RoomDto }) {
	const { room, mutateRoom } = useRoom(initialRoom);
	const { player, mutatePlayer } = usePlayer(room, mutateRoom);

	const canStart = player?.playerId === room.ownerId && room.players.length > 1;

	const { scores, winnerId } = useMemo(
		() => calculateScores(room.players, room.board.boxes),
		[room.board.boxes, room.players],
	);

	const gameFinished = useMemo(() => {
		for (const row of room.board.boxes) {
			for (const cell of row) {
				if (cell === Cell.Empty) return false;
			}
		}

		return true;
	}, [room.board.boxes]);

	return (
		<div className="absolute top-1/2 left-1/2 flex w-fit min-w-[95%] max-w-[800px] translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-6 md:min-w-[45%] lg:max-w-[100px]">
			<motion.div
				className="flex w-full items-center justify-between"
				layout
				transition={{ type: "spring", damping: 25, stiffness: 120 }}
			>
				<LogoIcon flat />
				<div className="flex gap-2">
					<ThemeSwitcher />
					<Settings player={player!} mutatePlayer={mutatePlayer} />
				</div>
			</motion.div>
			<motion.div
				layout
				transition={{ type: "spring", damping: 25, stiffness: 120 }}
				className="w-full"
			>
				<Board
					width={room.board.boxes[0].length}
					height={room.board.boxes.length}
					board={room.board}
					players={room.players}
					player={player}
					turnId={room.turnId}
					mutateRoom={mutateRoom}
					started={room.started}
				/>
			</motion.div>
			<AnimatePresence mode="popLayout">
				{(!room.started || gameFinished) && (
					<motion.div
						className="flex w-full flex-row gap-2"
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						transition={{ type: "spring", duration: 0.2 }}
					>
						<Button
							className="grow"
							disabled={!canStart}
							onClick={() => {
								if (!canStart) return;
								mutateRoom({
									started: true,
									turnId: room.ownerId,
									board: createBoard(
										room.board.boxes[0].length,
										room.board.boxes.length,
									),
								});
							}}
						>
							Start Game
						</Button>
						<ShareButton link={`/?room=${initialRoom.roomName}`} />
					</motion.div>
				)}
			</AnimatePresence>
			<div className="grid w-full grid-cols-2 gap-3">
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
							isTurn={
								room.started && !gameFinished && room.turnId === player.playerId
							}
							layout="position"
							transition={{ type: "spring", damping: 25, stiffness: 120 }}
						/>
					))}
			</div>
			{gameFinished && (
				<GameFinishedModal
					open={gameFinished}
					room={room}
					mutateRoom={mutateRoom}
					player={player}
					scores={scores}
					winnerId={winnerId!}
				/>
			)}
		</div>
	);
}

function GameFinishedModal({
	room,
	mutateRoom,
	player,
	scores,
	open,
	winnerId,
}: {
	open: boolean;
	room: RoomDto;
	mutateRoom: (room: Partial<RoomDto>) => void;
	player?: PlayerDto;
	scores: Map<string, number>;
	winnerId: string;
}) {
	const isWinner = winnerId === player?.playerId;

	return (
		<Modal defaultOpen>
			<ModalPortal>
				<ModalContent className="flex flex-col gap-6">
					<ModalHeader>
						<ModalTitle>{isWinner ? "You Win! 🎉" : "You Lose 😓"}</ModalTitle>
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
						<ModalClose asChild>
							<Button className="w-full" variant="default">
								Play Again
							</Button>
						</ModalClose>
					</ModalFooter>
				</ModalContent>
				<Confetti />
			</ModalPortal>
		</Modal>
	);
}
