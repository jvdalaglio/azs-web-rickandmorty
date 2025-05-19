"use client";

import { useEpisodesFilter } from "@/hooks/useEpisodesFilter";
import { useLocalStorageList } from "@/hooks/useLocalStorageList";
import { Episode } from "@/models/Episode";
import EpisodesCard from "../episodes-card";
import EpisodesSkeleton from "../skeleton-episodes";

const SEASONS = ["S01", "S02", "S03", "S04", "S05"];

interface EpisodeListProps {
  episodes: Episode[];
  loading: boolean;
  title: string;
  onSeasonChange: (season: string) => void;
  selectedSeason: string;
}

export default function EpisodesList({
  episodes,
  loading,
  title,
  onSeasonChange,
  selectedSeason,
}: EpisodeListProps) {
  const { filteredEpisodes, searchQuery } = useEpisodesFilter(episodes);
  const { list: favorites, toggleItem: toggleFavorite } =
    useLocalStorageList("favorites");
  const { list: watched, toggleItem: toggleWatched } =
    useLocalStorageList("watched");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl tracking-tight font-creepster">
          {searchQuery ? `Resultados da busca: "${searchQuery}"` : title}
        </h1>

        <div className="flex items-center gap-2">
          <label htmlFor="season" className="text-sm text-muted-foreground">
            Temporada:
          </label>
          <select
            id="season"
            value={selectedSeason}
            onChange={(e) => onSeasonChange(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {SEASONS.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-muted-foreground">
        {filteredEpisodes.length} episódio
        {filteredEpisodes.length !== 1 ? "s" : ""}
      </p>

      {loading ? (
        <EpisodesSkeleton />
      ) : filteredEpisodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold">Nenhum episódio encontrado.</h2>
          <p className="text-muted-foreground">Tente buscar por outro termo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEpisodes.map((episode) => (
            <EpisodesCard
              key={episode.id}
              episode={episode}
              isFavorite={favorites.includes(episode.id)}
              isWatched={watched.includes(episode.id)}
              onFavoriteToggle={() => toggleFavorite(episode.id)}
              onWatchedToggle={() => toggleWatched(episode.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
