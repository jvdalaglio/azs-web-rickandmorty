"use client";

import CharacterCard from "@/components/character-card";
import EpisodeDetailsSkeleton from "@/components/skeleton-episode-detail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useEpisodeDetails from "@/hooks/useEpisodeDetails";
import { ArrowLeft, Eye, EyeOff, Heart, HeartOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EpisodeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const { episode, episodeCharacters, loadingEpisodeDetails } =
    useEpisodeDetails(params.id);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const storedWatched = localStorage.getItem("watched");

    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(params.id));
    }

    if (storedWatched) {
      const watched = JSON.parse(storedWatched);
      setIsWatched(watched.includes(params.id));
    }
  }, [params.id]);

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter((id: string) => id !== params.id);
    } else {
      favorites.push(params.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const toggleWatched = () => {
    const storedWatched = localStorage.getItem("watched");
    let watched = storedWatched ? JSON.parse(storedWatched) : [];

    if (isWatched) {
      watched = watched.filter((id: string) => id !== params.id);
    } else {
      watched.push(params.id);
    }

    localStorage.setItem("watched", JSON.stringify(watched));
    setIsWatched(!isWatched);
  };

  if (loadingEpisodeDetails) {
    return <EpisodeDetailsSkeleton />;
  }

  if (!episode) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">Episódio não encontrado!</h2>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          Retornar para a lista de episódios
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{episode.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {episode.episode}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Data de exibição: {episode.air_date}
            </span>
            <span className="text-sm text-muted-foreground">
              {episode.characters.length} personagens
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleWatched}
            className={isWatched ? "bg-green-100 dark:bg-green-900/20" : ""}
          >
            {isWatched ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Unwatched
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Mark as Watched
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFavorite}
            className={isFavorite ? "bg-pink-100 dark:bg-pink-900/20" : ""}
          >
            {isFavorite ? (
              <>
                <HeartOff className="mr-2 h-4 w-4 text-pink-500" />
                Unfavorite
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Add to Favorites
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Personagens</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {episodeCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
}
