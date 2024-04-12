import { supabase } from "~/lib/supabase";
import { Room, type RoomDto } from "./room";

export const dynamic = "force-dynamic";

export default async function RoomPage({ params }: { params: { id: string } }) {
	const { data: room, error } = await supabase
		.from("rooms")
		.select("*")
		.match({ roomId: params.id })
		.single();

	if (error || !room) {
		return <div>Room not found</div>;
	}

	return <Room initialRoom={room as RoomDto} />;
}
