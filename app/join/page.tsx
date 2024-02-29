import { redirect } from "next/navigation";
import { supabase } from "~/utils/supabase";

export default function JoinPage() {
  return (
    <form action={joinRoom}>
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="room" placeholder="Room Name" />
      <button type="submit">Join</button>
    </form>
  );
}

async function joinRoom(formData: FormData) {
  "use server";

  const { data } = await supabase
    .from("rooms")
    .select("id,players")
    .eq("name", formData.get("room") as string);

  if (!data) return;

  const [room] = data;

  await supabase
    .from("rooms")
    .update({ players: [...room.players, formData.get("name") as string] })
    .eq("id", room.id);

  redirect(`/room/${room.id}`);
}
