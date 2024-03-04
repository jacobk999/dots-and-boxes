"use client";

import { useRouter } from "next/navigation";
import { supabase } from "~/utils/supabase";
import { Label } from "~/components/Label";
import { Input } from "~/components/Input";
import { z } from "zod";
import { Button } from "~/components/Button";
import { Form } from "~/components/Form";
import { Logo } from "~/icons/Logo";

const JoinSchema = z.object({
  username: z.string().min(1).max(16),
  roomName: z.string().min(1).max(32),
});

export default function JoinPage() {
  const router = useRouter();

  return (
    <Form
      schema={JoinSchema}
      onSubmit={async (values) => {
        const data = await joinRoom(values);
        if (!data) return;

        sessionStorage.setItem("player", data.player);
        router.push(`/room/${data.id}`);
      }}
    >
      <div>
        <div className="flex items-center justify-center gap-2">
          <Logo />
        </div>
        <Input
          type="text"
          label="Username"
          name="username"
          placeholder="Pineapple"
          minLength={1}
          maxLength={16}
          required
        />
      </div>
      <div>
        <Input
          type="text"
          name="roomName"
          label="Room Name"
          placeholder="Strawberry"
          required
          className="w-full rounded-xl bg-slate-100 p-4 outline-none"
        />
      </div>
      <Button type="submit" full color="emerald">
        Join
      </Button>
    </Form>
  );
}

async function joinRoom({ roomName, username }: z.infer<typeof JoinSchema>) {
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
