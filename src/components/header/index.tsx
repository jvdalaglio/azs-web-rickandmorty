import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center justify-center h-20 bg-background text-white gap-4 border-b-2 border-primary/10">
      <Image
        src="/logo.png"
        alt="Logo Ricky and Morty"
        sizes="100vw"
        width={140}
        height={140}
      />
    </div>
  );
}
