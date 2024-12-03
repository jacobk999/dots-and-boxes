"use server";

import { randomUUID } from "node:crypto";
import type { z } from "zod";
import { emojis } from "~/components/emoji-picker";
import { Cell, createBoard } from "~/lib/board";
import { supabase } from "~/lib/supabase";
import type { RoomDto } from "./room/[id]/room";
import {
	type CreateGameSchema,
	Errors,
	type JoinGameSchema,
} from "./validation";

export async function createRoom({
	roomName,
	username,
	width,
	height,
}: z.infer<typeof CreateGameSchema>): Promise<
	{ roomId: string; playerId: string } | { error: string }
> {
	const roomId = randomUUID();
	const ownerId = randomUUID();

	const room: RoomDto = {
		roomId,
		roomName,
		ownerId,
		turnId: ownerId,

		board: createBoard(width, height),
		players: [
			{
				playerId: ownerId,
				username,
				emoji: randomEmoji(),
				cell: Cell.Player1,
				online: true,
			},
		],

		started: false,
	};

	const { error } = await supabase.from("rooms").insert(room);

	if (error) {
		if (
			error.message.startsWith("duplicate key value violates unique constraint")
		) {
			return { error: Errors.ROOM_NAME_TAKEN };
		}

		console.error(error);
		return { error: Errors.SUPABASE_ERROR };
	}

	return { roomId, playerId: ownerId };
}

export async function joinRoom({
	roomName,
	username,
}: z.infer<typeof JoinGameSchema>): Promise<
	{ roomId: string; playerId: string } | { error: string }
> {
	const { data: room, error } = await supabase
		.from("rooms")
		.select("roomId, players, started")
		.match({ roomName })
		.single();

	if (!room) return { error: Errors.ROOM_NOT_FOUND };
	if (error) return { error: Errors.SUPABASE_ERROR };
	if (room.started) return { error: Errors.ROOM_STARTED };

	const players = room.players as RoomDto["players"];

	if (players.length >= 8) return { error: Errors.ROOM_FULL };

	const playerId = randomUUID();
	const cell = Cell[`Player${players.length + 1}` as keyof typeof Cell];

	players.push({
		playerId,
		username,
		emoji: randomEmoji(),
		cell,
		online: true,
	});

	await supabase
		.from("rooms")
		.update({ players })
		.match({ roomId: room.roomId });

	return { roomId: room.roomId, playerId };
}

function randomEmoji() {
	return emojis[Math.floor(Math.random() * emojis.length)];
}
