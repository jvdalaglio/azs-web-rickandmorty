import { Episode } from "@/models/Episode";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useEpisodesFilter(episodes: Episode[]) {
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>(episodes);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const filtered = searchQuery
      ? episodes.filter((episode) =>
          episode.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : episodes;

    setFilteredEpisodes(filtered);
  }, [episodes, searchQuery]);

  return { filteredEpisodes, searchQuery };
}
