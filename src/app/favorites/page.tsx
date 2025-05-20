"use client";

import EpisodesList from "@/components/episodes-list";
import { useEpisodeContext } from "@/context/EpisodeContext";
import { Suspense, useEffect, useState } from "react";

export default function FavoritesPage() {
  const [season, setSeason] = useState("S01");
  const { favoriteEpisodes } = useEpisodeContext();
  const [localFavorites, setLocalFavorites] = useState(favoriteEpisodes);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoritesList");
    if (storedFavorites) {
      setLocalFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EpisodesList
        episodes={localFavorites ?? favoriteEpisodes}
        loading={false}
        title={"Favoritos"}
        onSeasonChange={setSeason}
        selectedSeason={season}
      />
    </Suspense>
  );
}
