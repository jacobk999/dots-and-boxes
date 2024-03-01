import { redirect } from "next/navigation";
import { supabase } from "~/utils/supabase";

export default function JoinPage() {
  return (
    <form action={joinRoom} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="bg-slate-100 p-4 rounded-xl outline-none"
      />
      <input
        type="text"
        name="room"
        placeholder="Room Name"
        required
        className="bg-slate-100 p-4 w-full rounded-xl outline-none"
      />

      <button
        type="submit"
        className="bg-emerald-400 text-white font-bold p-4 rounded-xl outline-none"
      >
        Join
      </button>
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
