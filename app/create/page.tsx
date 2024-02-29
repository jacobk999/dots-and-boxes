import { redirect } from "next/navigation";
import { Cell, createGrid } from "~/hooks/useBoard";
import { supabase } from "~/utils/supabase";

export default function CreatePage() {
  return (
    <form action={createRoom}>
      <input type="text" name="name" placeholder="Name" required />
      <input type="text" name="room" placeholder="Room Name" required />
      <input
        type="number"
        min="1"
        max="11"
        name="width"
        placeholder="Width"
        required
      />
      <input
        type="number"
        min="1"
        max="11"
        name="height"
        placeholder="Height"
        required
      />
      <button type="submit">Create</button>
    </form>
  );
}

async function createRoom(formData: FormData) {
  "use server";

  console.log("Hello from the server");

  const width = +formData.get("width")!;
  const height = +formData.get("height")!;

  const { data, error } = await supabase
    .from("rooms")
    .insert({
      name: formData.get("room") as string,
      width,
      height,
      boxes: createGrid(width, height, Cell.Empty),
      horizontals: createGrid(width, height + 1, Cell.Empty),
      verticals: createGrid(width + 1, height, Cell.Empty),
      turn: 1,
      players: [formData.get("name") as string],
    })
    .select("id");

  console.log(data, error);

  if (!data) return;

  const [{ id }] = data;

  redirect(`/room/${id}`);
}
