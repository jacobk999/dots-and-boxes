"use client";

import { useRouter } from "next/navigation";
import { supabase } from "~/utils/supabase";
import { Label } from "~/components/Label";
import { Input } from "~/components/Input";
import { z } from "zod";
import { Button } from "~/components/Button";
import { Form } from "~/components/Form";

const JoinSchema = z.object({
  username: z.string().min(1).max(16),
  roomName: z.string().min(1).max(32),
});

export default function JoinPage() {
  const router = useRouter();

  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = await joinRoom(formData);
        if (!data) return;

        localStorage.setItem("player", data.player);
        router.push(`/room/${data.id}`);
      }}
    >
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Pineapple"
          minLength={1}
          maxLength={16}
          required
        />
      </div>
      <div>
        <Label htmlFor="roomName">Room Name</Label>
        <Input
          type="text"
          name="roomName"
          id="roomName"
          placeholder="Strawberry"
          required
          className="w-full rounded-xl bg-slate-100 p-4 outline-none"
        />
      </div>
      <Button type="submit">Join</Button>
    </Form>
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
