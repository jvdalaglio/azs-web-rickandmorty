"use client";

import EpisodesList from "@/components/episodes-list";
import { useEpisodesViewModel } from "@/hooks/useEpisodes";
import { useState } from "react";

export default function Home() {
  const [season, setSeason] = useState("S01");
  const { episodes, loading } = useEpisodesViewModel({
    page: 1,
    season: season,
  });

  return (
    <EpisodesList
      episodes={episodes}
      loading={loading}
      title={"Todos os episódios"}
      onSeasonChange={(season: string) => setSeason(season)}
      selectedSeason={season}
    />
  );
}
