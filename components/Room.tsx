"use client";

import { useEffect, useState } from "react";
import type { Tables } from "~/utils/database.types";
import { supabase } from "~/utils/supabase";
import { Game } from "./Game";

interface RoomProps {
  initialRoom: Tables<"rooms">;
}

export function Room({ initialRoom }: RoomProps) {
  const [room, setRoom] = useState(initialRoom);
  const [edited, setEdited] = useState(false);

  // Subscribe to changes within the room
  useEffect(() => {
    const channel = supabase
      .channel("room" + initialRoom.id)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${initialRoom.id}`,
        },
        (payload) => {
          setRoom(payload.new as Tables<"rooms">);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [initialRoom]);

  // Update the database when the room is edited by the user
  useEffect(() => {
    if (!edited) return;

    async function update() {
      await supabase.from("rooms").update(room).eq("id", room.id);
      setEdited(false);
    }

    update();
  }, [room, edited]);

  return (
    <div>
      <p>
        {room.name} - {room.id}
      </p>
      <Game
        room={room}
        setRoom={(room) => {
          setRoom(room);
          setEdited(true);
        }}
      />
    </div>
  );
}
