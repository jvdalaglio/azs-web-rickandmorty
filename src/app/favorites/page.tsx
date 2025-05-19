"use client";

import EpisodesList from "@/components/episodes-list";
import { useEpisodesViewModel } from "@/hooks/useEpisodes";
import { useState } from "react";

export default function FavoritesPage() {
  const [season, setSeason] = useState("S01");
  const { episodes } = useEpisodesViewModel({
    page: 1,
    season: season,
  });
  const storedFavorites = localStorage.getItem("favorites");
  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  return (
    <EpisodesList
      episodes={episodes.filter((episode) => favorites.includes(episode.id))}
      loading={false}
      title={"Favoritos"}
      onSeasonChange={setSeason}
      selectedSeason={season}
    />
  );
}
