"use client";

import { Input } from "@/components/ui/input";
import { useEpisodeContext } from "@/context/EpisodeContext";
import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Badge } from "../ui/badge";

export default function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { favoriteEpisodes } = useEpisodeContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo Rick and Morty"
            width={120}
            height={120}
          />
        </Link>

        {/* Botão menu (mobile only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navegação (desktop) */}
        <nav className="hidden md:flex items-center gap-4 ml-auto">
          <form onSubmit={handleSearch} className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar episódios..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Todos os episódios
          </Link>
          <Link
            href="/favorites"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex gap-2",
              pathname === "/favorites"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Favoritos
            <Badge>{favoriteEpisodes.length}</Badge>
          </Link>
        </nav>
      </div>

      {/* Navegação (mobile) */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative w-full mb-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar episódios..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Todos os episódios
            </Link>
            <Link
              href="/favorites"
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/favorites"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Favoritos
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
