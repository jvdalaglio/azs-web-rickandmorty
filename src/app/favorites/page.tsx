"use client";

import EpisodesList from "@/components/episodes-list";
import { useEpisodeContext } from "@/context/EpisodeContext";
import { useState } from "react";

export default function FavoritesPage() {
  const [season, setSeason] = useState("S01");
  const { favoriteEpisodes } = useEpisodeContext();
  const localFavoritesList = localStorage.getItem("favoritesList");

  return (
    <EpisodesList
      episodes={JSON.parse(localFavoritesList!) ?? favoriteEpisodes}
      loading={false}
      title={"Favoritos"}
      onSeasonChange={setSeason}
      selectedSeason={season}
    />
  );
}
