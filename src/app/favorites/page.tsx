"use client";

import EpisodesList from "@/components/episodes-list";
import { useEpisodeContext } from "@/context/EpisodeContext";
import { useFilter } from "@/context/FilterContext";
import { Suspense, useState } from "react";

export default function FavoritesPage(): JSX.Element {
  const [season, setSeason] = useState<string>("S01");
  const { favoriteEpisodes } = useEpisodeContext();
  const { filter } = useFilter();

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EpisodesList
        episodes={favoriteEpisodes.filter((episode) =>
          filter
            ? episode.name.toLowerCase().includes(filter.toLowerCase())
            : episode
        )}
        loading={false}
        title={"Favoritos"}
        subtitle={"Você ainda não marcou nenhum episódio como favorito ❤️."}
        onSeasonChange={setSeason}
        selectedSeason={season}
      />
    </Suspense>
  );
}
