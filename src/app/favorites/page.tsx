"use client";

import EpisodesList from "@/components/episodes-list";
import { useEpisodeContext } from "@/context/EpisodeContext";
import { useFilter } from "@/context/FilterContext";
import { Suspense, useState } from "react";

export default function FavoritesPage() {
  const [season, setSeason] = useState("S01");
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
        onSeasonChange={setSeason}
        selectedSeason={season}
      />
    </Suspense>
  );
}
