"use client";

import { useEpisodeContext } from "@/context/EpisodeContext";
import { useLocalStorageList } from "@/hooks/useLocalStorageList";
import { Episode } from "@/models/Episode";
import { ResponseInfo } from "@/models/Response";
import EpisodesCard from "../episodes-card";
import Paginator from "../paginator";
import EpisodesSkeleton from "../skeleton-episodes";

const SEASONS = ["S01", "S02", "S03", "S04", "S05"];

interface EpisodeListProps {
  episodes: Episode[];
  loading: boolean;
  title: string;
  subtitle: string;
  onSeasonChange: (season: string) => void;
  selectedSeason: string;
  showSeasonSelect?: boolean;
  episodesInfo?: ResponseInfo;
  onPageChange?: (page: number) => void;
}

export default function EpisodesList({
  episodes,
  loading,
  title,
  subtitle,
  onSeasonChange,
  selectedSeason,
  showSeasonSelect = false,
  episodesInfo,
  onPageChange,
}: EpisodeListProps): JSX.Element {
  const { addFavoriteEpisode, isFavorite, removeFavoriteEpisode } =
    useEpisodeContext();
  const { list: watched, toggleItem: toggleWatched } =
    useLocalStorageList("watched");

  const onFavorite = (episode: Episode) => {
    if (isFavorite(episode.id)) {
      removeFavoriteEpisode(episode.id);
    } else {
      addFavoriteEpisode(episode);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl tracking-tight font-creepster">{title}</h1>

        {showSeasonSelect && (
          <div className="flex items-center gap-2">
            <label htmlFor="season" className="text-sm text-muted-foreground">
              Temporada:
            </label>
            <select
              id="season"
              value={selectedSeason}
              onChange={(e) => onSeasonChange(e.target.value)}
              className="border border-gray-200/20 rounded px-2 py-1 text-sm bg-card"
            >
              {SEASONS.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <p className="text-muted-foreground">
        {episodes.length} episódio
        {episodes.length !== 1 ? "s" : ""}
      </p>

      {loading ? (
        <EpisodesSkeleton />
      ) : episodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold">Nenhum episódio encontrado.</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {episodes.map((episode) => (
              <EpisodesCard
                key={episode.id}
                episode={episode}
                isFavorite={isFavorite(episode.id)}
                isWatched={watched.includes(episode.id)}
                onFavoriteToggle={() => onFavorite(episode)}
                onWatchedToggle={() => toggleWatched(episode.id)}
              />
            ))}
          </div>
          {episodesInfo && episodesInfo.pages > 1 && (
            <Paginator
              currentPage={episodesInfo.prev ? episodesInfo.prev + 1 : 1}
              totalPages={episodesInfo.pages}
              onPageChange={(page) => onPageChange?.(page)}
              key={1}
            />
          )}
        </>
      )}
    </div>
  );
}
