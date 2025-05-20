"use client";
import { Episode } from "@/models/Episode";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface EpisodeContextData {
  favoriteEpisodes: Episode[];
  addFavoriteEpisode: (episode: Episode) => void;
  removeFavoriteEpisode: (episodeId: string) => void;
  isFavorite: (episodeId: string) => boolean;
}

interface EpisodeProviderProps {
  children: ReactNode;
}

const EpisodeContext = createContext<EpisodeContextData>(
  {} as EpisodeContextData
);

export function EpisodeProvider({
  children,
}: EpisodeProviderProps): JSX.Element {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const localFavorites = localStorage.getItem("favoritesList");
    if (localFavorites) {
      setFavoriteEpisodes(JSON.parse(localFavorites));
    }
  }, []);

  function addFavoriteEpisode(episode: Episode): void {
    const updatedFavorites = [...favoriteEpisodes, episode];
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem("favoritesList", JSON.stringify(updatedFavorites));
  }

  function removeFavoriteEpisode(episodeId: string): void {
    const updatedFavorites = favoriteEpisodes.filter(
      (episode) => episode.id !== episodeId
    );
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem("favoritesList", JSON.stringify(updatedFavorites));
  }

  function isFavorite(episodeId: string): boolean {
    return favoriteEpisodes.some((episode) => episode.id === episodeId);
  }

  return (
    <EpisodeContext.Provider
      value={{
        favoriteEpisodes,
        addFavoriteEpisode,
        removeFavoriteEpisode,
        isFavorite,
      }}
    >
      {children}
    </EpisodeContext.Provider>
  );
}

export function useEpisodeContext(): EpisodeContextData {
  const context = useContext(EpisodeContext);

  if (!context) {
    throw new Error("useEpisode must be used within an EpisodeProvider");
  }

  return context;
}
