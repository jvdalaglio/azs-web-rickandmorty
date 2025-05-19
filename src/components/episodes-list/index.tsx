// components/episodes-list/index.tsx
import { useEpisodesViewModel } from "@/hooks/useEpisodes";
import { useEpisodesFilter } from "@/hooks/useEpisodesFilter";
import { useLocalStorageList } from "@/hooks/useLocalStorageList";
import EpisodesCard from "../episodes-card";
import EpisodesSkeleton from "../skeleton-episodes";

export default function EpisodesList() {
  const { episodes, loading } = useEpisodesViewModel();
  const { filteredEpisodes, searchQuery } = useEpisodesFilter(episodes);
  const { list: favorites, toggleItem: toggleFavorite } =
    useLocalStorageList("favorites");
  const { list: watched, toggleItem: toggleWatched } =
    useLocalStorageList("watched");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl tracking-tight font-creepster">
          {searchQuery
            ? `Resultados da busca: "${searchQuery}"`
            : "Todos os episódios"}
        </h1>
        <p className="text-muted-foreground">
          {filteredEpisodes.length} episódio
          {filteredEpisodes.length !== 1 ? "s" : ""}
        </p>
      </div>

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
