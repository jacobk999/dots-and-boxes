import { redirect } from "next/navigation";
import { Input } from "~/components/Input";
import { Label } from "~/components/Label";
import { supabase } from "~/utils/supabase";

export default function CreatePage() {
  return (
    <form action={createRoom} className="flex flex-col gap-4 p-4">
      <Label htmlFor="id">Username</Label>
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        required
        minLength={1}
        maxLength={16}
      />
      <div className="flex flex-row gap-4 w-full">
        <div className="w-full">
          <Label htmlFor="id">Room Name</Label>
          <Input
            type="text"
            name="room"
            id="room"
            placeholder="Room Name"
            required
          />
        </div>
        <div>
          <Label htmlFor="width">Width</Label>
          <Input
            type="number"
            min="1"
            max="11"
            name="width"
            id="width"
            placeholder="Width"
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
            placeholder="Height"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-emerald-400 border border-emerald-600 text-white font-bold p-4 rounded-xl outline-none"
      >
        Create
      </button>
    </form>
  );
}

async function createRoom(formData: FormData) {
  "use server";

  const width = +formData.get("width")!;
  const height = +formData.get("height")!;

  const { data } = await supabase
    .from("rooms")
    .insert({
      name: formData.get("room") as string,
      width,
      height,
      boxes: createGrid(width, height),
      horizontals: createGrid(width, height + 1),
      verticals: createGrid(width + 1, height),
      turn: 1,
      players: [formData.get("name") as string],
    })
    .select("id");

  if (!data) return;

  const [{ id }] = data;

  redirect(`/room/${id}`);
}

function createGrid(width: number, height: number) {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );
}
