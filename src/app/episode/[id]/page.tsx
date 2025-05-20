"use client";

import CharacterCard from "@/components/character-card";
import EpisodeDetailsSkeleton from "@/components/skeleton-episode-detail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEpisodeContext } from "@/context/EpisodeContext";
import useEpisodeDetails from "@/hooks/useEpisodeDetails";
import { formatDateToCustomPtBr } from "@/utils/formatDate";
import { ArrowLeft, Eye, EyeOff, Heart, HeartOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EpisodeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [isWatched, setIsWatched] = useState(false);
  const { addFavoriteEpisode, removeFavoriteEpisode, isFavorite } =
    useEpisodeContext();
  const { episode, episodeCharacters, loadingEpisodeDetails } =
    useEpisodeDetails(params.id);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWatched = localStorage.getItem("watched");

      if (storedWatched) {
        const watched = JSON.parse(storedWatched);
        setIsWatched(watched.includes(params.id));
      }
    }
  }, [params.id]);

  const toggleFavorite = () => {
    if (isFavorite(params.id)) {
      removeFavoriteEpisode(params.id);
    } else {
      if (!episode) return;
      addFavoriteEpisode(episode);
    }
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
              Data de exibição: {formatDateToCustomPtBr(episode.air_date)}
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
                Não visto
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Marcar como visto
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFavorite}
            className={
              isFavorite(params.id) ? "bg-pink-100 dark:bg-pink-900/20" : ""
            }
          >
            {isFavorite(params.id) ? (
              <>
                <HeartOff className="mr-2 h-4 w-4 text-pink-500" />
                Remover dos Favoritos
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Adicionar aos Favoritos
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
