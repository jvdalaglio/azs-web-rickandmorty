import { Character } from "@/models/Character";
import { Episode } from "@/models/Episode";
import { fetchEpisodesById } from "@/services/episodeService";
import { useEffect, useState } from "react";

interface IUseEpisodeDetails {
  loadEpisode: (id: string) => Promise<void>;
  episode: Episode | null;
  episodeCharacters: Character[];
  loadingEpisodeDetails: boolean;
}

export default function useEpisodeDetails(id: string): IUseEpisodeDetails {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [episodeCharacters, setEpisodeCharacters] = useState<Character[]>([]);
  const [loadingEpisodeDetails, setLoadingEpisodeDetails] = useState(true);

  const loadEpisode = async (id: string): Promise<void> => {
    setLoadingEpisodeDetails(true);
    const data = await fetchEpisodesById(id);
    setEpisode(data);
    setEpisodeCharacters(data.characters);
    setLoadingEpisodeDetails(false);
  };

  useEffect(() => {
    loadEpisode(id);
  }, [id]);

  return {
    loadEpisode,
    episode,
    episodeCharacters,
    loadingEpisodeDetails,
  };
}
