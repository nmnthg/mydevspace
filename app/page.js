import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-6">MyDevSpace</h1>
      <Button asChild>
        <Link href="/auth">Login</Link>
      </Button>
    </div>
  );
}
