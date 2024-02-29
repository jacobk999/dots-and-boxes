import { supabase } from "~/utils/supabase";
import { Room } from "~/components/Room";

export const revalidate = 0;

export default async function RoomPage({ params }: { params: { id: string } }) {
  const { data } = await supabase.from("rooms").select("*").eq("id", params.id);

  if (!data) {
    return <div>Room not found</div>;
  }

  const [room] = data;

  return <Room initialRoom={room} />;
}
