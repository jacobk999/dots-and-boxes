"use client";

import { useRouter } from "next/navigation";
import { Input } from "~/components/Input";
import { Label } from "~/components/Label";
import { supabase } from "~/utils/supabase";
import { z } from "zod";
import { Button } from "~/components/Button";
import { Form } from "~/components/Form";
import { Logo } from "~/components/Logo";

const CreateSchema = z.object({
  username: z.string().min(1).max(16),
  roomName: z.string().min(1).max(32),
  width: z.coerce.number().min(1).max(11),
  height: z.coerce.number().min(1).max(11),
});

export default function CreatePage() {
  const router = useRouter();

  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = await createRoom(formData);

        if (!data) return;

        localStorage.setItem("player", data.player);
        router.push(`/room/${data.id}`);
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <Logo />
        <h1 className="text-4xl font-bold">Dots and Boxes</h1>
      </div>
      <div className="w-full">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Pineapple"
          required
          minLength={1}
          maxLength={16}
        />
      </div>
      <div className="flex w-full flex-row gap-4">
        <div className="w-full">
          <Label htmlFor="roomName">Room Name</Label>
          <Input
            type="text"
            name="roomName"
            id="roomName"
            placeholder="Strawberry"
            required
            minLength={1}
            maxLength={32}
          />
        </div>
        <div className="w-fit">
          <Label htmlFor="width">Width</Label>
          <Input
            type="number"
            min="1"
            max="11"
            name="width"
            id="width"
            placeholder="4"
            required
          />
        </div>
        <div>
          <Label htmlFor="height">Height</Label>
          <Input
            type="number"
            min="1"
            max="11"
            name="height"
            id="height"
            placeholder="4"
            required
          />
        </div>
      </div>
      <Button type="submit">Create</Button>
    </Form>
  );
}

async function createRoom(formData: FormData) {
  const { username, roomName, width, height } = CreateSchema.parse(
    Object.fromEntries(formData.entries())
  );

  const { data } = await supabase
    .from("rooms")
    .insert({
      name: roomName,
      width,
      height,
      boxes: createGrid(width, height),
      horizontals: createGrid(width, height + 1),
      verticals: createGrid(width + 1, height),
      turn: 1,
      players: [username],
    })
    .select("id");

  if (!data) return;

  const [{ id }] = data;

  return {
    id,
    player: username,
  };
}

function createGrid(width: number, height: number) {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );
}
