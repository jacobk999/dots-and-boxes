"use server";

import { randomUUID } from "node:crypto";
import type { z } from "zod";
import { Cell, createBoard } from "~/components/board";
import { emojis } from "~/components/emoji-picker";
import { supabase } from "~/lib/supabase";
import type { RoomDto } from "./room/[id]/room";
import type { CreateGameSchema, JoinGameSchema } from "./validation";

export async function createRoom({
	roomName,
	username,
	width,
	height,
}: z.infer<typeof CreateGameSchema>) {
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
			},
		],

		started: false,
		ended: false,
	};

	await supabase.from("rooms").insert(room);

	return { roomId, playerId: ownerId };
}

export async function joinRoom({
	roomName,
	username,
}: z.infer<typeof JoinGameSchema>) {
	const { data: room, error } = await supabase
		.from("rooms")
		.select("roomId, players")
		.match({ roomName })
		.single();

	if (error || !room) {
		throw new Error("Room not found");
	}

	const playerId = randomUUID();

	const players = room.players as RoomDto["players"];

	if (players.length >= 8) throw new Error("Room is full");

	const cell = Cell[`Player${players.length + 1}` as keyof typeof Cell];
	players.push({ playerId, username, emoji: randomEmoji(), cell });

	await supabase
		.from("rooms")
		.update({ players })
		.match({ roomId: room.roomId });

	return { roomId: room.roomId, playerId };
}

function randomEmoji() {
	return emojis[Math.floor(Math.random() * emojis.length)];
}
