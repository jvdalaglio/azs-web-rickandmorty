"use client";

import EpisodesList from "@/components/episodes-list";
import { useFilter } from "@/context/FilterContext";
import { useEpisodesViewModel } from "@/hooks/useEpisodes";
import { Suspense, useState } from "react";

export default function Home() {
  const [season, setSeason] = useState("S01");
  const [page, setPage] = useState(1);
  const { filter } = useFilter();
  const { episodes, loading, episodesInfo } = useEpisodesViewModel({
    page: page,
    season: filter ? "" : season,
    name: filter,
  });

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EpisodesList
        episodes={episodes}
        loading={loading}
        title={"Todos os episódios"}
        onSeasonChange={(season: string) => setSeason(season)}
        selectedSeason={season}
        showSeasonSelect={true}
        episodesInfo={episodesInfo}
        onPageChange={setPage}
      />
    </Suspense>
  );
}
