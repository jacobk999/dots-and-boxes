import { z } from "zod";

export const SIZE_DEFAULT = 5;

export const RoomNameSchema = z.string().min(3).max(16);
export const UsernameSchema = z.string().min(3).max(12);
export const SizeSchema = z.coerce.number().min(3).max(11);

export const CreateGameSchema = z.object({
	roomName: RoomNameSchema,
	username: UsernameSchema,
	width: SizeSchema,
	height: SizeSchema,
});

export const JoinGameSchema = z.object({
	roomName: RoomNameSchema,
	username: UsernameSchema,
});

export const SettingsSchema = z.object({
	username: UsernameSchema,
	emoji: z.string(),
});

export const Errors = {
	ROOM_NOT_FOUND: "Room not found",
	ROOM_FULL: "Room is full",
	ROOM_STARTED: "Room has already started",
	ROOM_NAME_TAKEN: "Room name is already taken",
	SUPABASE_ERROR: "Supabase error",
};
