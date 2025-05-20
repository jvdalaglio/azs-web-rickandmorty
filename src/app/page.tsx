"use client";

import EpisodesList from "@/components/episodes-list";
import { useFilter } from "@/context/FilterContext";
import { useEpisodesViewModel } from "@/hooks/useEpisodes";
import { Suspense, useState } from "react";

export default function Home(): JSX.Element {
  const [season, setSeason] = useState<string>("S01");
  const [page, setPage] = useState<number>(1);
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
        subtitle={"Tente buscar por outro termo."}
        onSeasonChange={(season: string) => setSeason(season)}
        selectedSeason={season}
        showSeasonSelect={true}
        episodesInfo={episodesInfo}
        onPageChange={setPage}
      />
    </Suspense>
  );
}
