import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto max-w-5xl flex items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="flow jobs logo" />
          <span className="text-xl font-bold tracking-tight">Flow jobs</span>
        </Link>
        <Button asChild>
          <Link href="/jobs/new">Post a job</Link>
        </Button>
      </nav>
    </header>
  );
}
