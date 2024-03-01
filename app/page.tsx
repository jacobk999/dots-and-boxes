import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Link href="/create" prefetch>
        Create
      </Link>
      <Link href="/join" prefetch>
        Join
      </Link>
    </div>
  );
}
