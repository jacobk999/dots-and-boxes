import { redirect } from "next/navigation";
import { supabase } from "~/utils/supabase";

export default function CreatePage() {
  return (
    <form action={createRoom} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="bg-slate-100 p-4 rounded-xl outline-none"
      />
      <div className="flex flex-row gap-4 w-full">
        <input
          type="text"
          name="room"
          placeholder="Room Name"
          required
          className="bg-slate-100 p-4 w-full rounded-xl outline-none"
        />
        <input
          type="number"
          min="1"
          max="11"
          name="width"
          placeholder="Width"
          required
          className="bg-slate-100 p-4 rounded-xl outline-none"
        />
        <input
          type="number"
          min="1"
          max="11"
          name="height"
          placeholder="Height"
          required
          className="bg-slate-100 p-4 rounded-xl outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-emerald-400 text-white font-bold p-4 rounded-xl outline-none"
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
