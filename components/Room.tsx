"use client";

import { useEffect, useState } from "react";
import type { Tables } from "~/utils/database.types";
import { supabase } from "~/utils/supabase";

interface RoomProps {
  initialRoom: Tables<"rooms">;
}

export function Room({ initialRoom }: RoomProps) {
  const [room, setRoom] = useState(initialRoom);

  useEffect(() => {
    const channel = supabase
      .channel("room")
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

  return (
    <div>
      <p>
        {room.name} - {room.id}
      </p>
      <div>
        {room.players.map((player) => (
          <div key={player}>{player}</div>
        ))}
      </div>
      <Board />
    </div>
  );
}
