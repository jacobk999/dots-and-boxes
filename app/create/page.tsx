"use client";

import { useRouter } from "next/navigation";
import { Input } from "~/components/Input";
import { supabase } from "~/utils/supabase";
import { z } from "zod";
import { Button } from "~/components/Button";
import { Form } from "~/components/Form";
import { Logo } from "~/icons/Logo";
import { GameContext } from "~/components/Game";
import { Board } from "~/components/Board";
import { useState } from "react";

const MIN_SIZE = 1;
const MAX_SIZE = 10;

const CreateSchema = z.object({
  username: z.string().min(1).max(16),
  roomName: z.string().min(1).max(32),
  width: z.coerce.number().min(MIN_SIZE).max(MAX_SIZE),
  height: z.coerce.number().min(MIN_SIZE).max(MAX_SIZE),
});

export default function CreatePage() {
  const router = useRouter();

  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(4);

  return (
    <Form
      schema={CreateSchema}
      onSubmit={async (values) => {
        const data = await createRoom(values);

        if (!data) return;

        sessionStorage.setItem("player", data.player);
        router.push(`/room/${data.id}`);
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <Logo />
      </div>
      <Input
        label="Username"
        name="username"
        type="text"
        placeholder="Pineapple"
      />
      <Input
        name="roomName"
        label="Room Name"
        type="text"
        placeholder="Strawberry"
      />
      <div className="flex gap-4">
        <Input
          name="width"
          label="Width"
          type="number"
          onChange={(event) =>
            setWidth(
              Math.max(Math.min(+event.target.value, MAX_SIZE), MIN_SIZE)
            )
          }
        />
        <Input
          name="height"
          label="Height"
          type="number"
          onChange={(event) =>
            setHeight(
              Math.max(Math.min(+event.target.value, MAX_SIZE), MIN_SIZE)
            )
          }
        />
      </div>
      <div className="my-2 flex items-center justify-center">
        <GameContext.Provider
          value={{
            boxes: createGrid(width, height),
            ended: false,
            height,
            horizontals: createGrid(width, height + 1),
            players: [],
            scores: new Map(),
            setLine: () => {},
            started: false,
            turn: 1,
            verticals: createGrid(width + 1, height),
            width,
          }}
        >
          <Board />
        </GameContext.Provider>
      </div>
      <Button type="submit" full color="emerald">
        Create
      </Button>
    </Form>
  );
}

async function createRoom({
  username,
  roomName,
  width,
  height,
}: z.infer<typeof CreateSchema>) {
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
