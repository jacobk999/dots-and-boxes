"use client";

import { useRouter } from "next/navigation";
import { supabase } from "~/utils/supabase";
import { Label } from "~/components/Label";
import { Input } from "~/components/Input";
import { z } from "zod";

const JoinSchema = z.object({
  username: z.string().min(1).max(16),
  roomName: z.string().min(1).max(32),
});

export default function JoinPage() {
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = await joinRoom(formData);
        if (!data) return;

        localStorage.setItem("player", data.player);
        router.push(`/room/${data.id}`);
      }}
      className="flex flex-col gap-4 p-4"
    >
      <Label htmlFor="username">Username</Label>
      <Input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        minLength={1}
        maxLength={16}
        required
      />
      <Label htmlFor="roomName">Room Name</Label>
      <Input
        type="text"
        name="roomName"
        id="roomName"
        placeholder="Room Name"
        required
        className="bg-slate-100 p-4 w-full rounded-xl outline-none"
      />

      <button
        type="submit"
        className="bg-emerald-400 border border-emerald-600 text-white font-bold p-4 rounded-xl outline-none"
      >
        Join
      </button>
    </form>
  );
}

async function joinRoom(formData: FormData) {
  const { roomName, username } = JoinSchema.parse(
    Object.fromEntries(formData.entries())
  );

  const { data } = await supabase
    .from("rooms")
    .select("id,players")
    .eq("name", roomName);

  if (!data) return;

  const [room] = data;

  await supabase
    .from("rooms")
    .update({ players: [...room.players, username] })
    .eq("id", room.id);

  return { id: room.id, player: username };
}
