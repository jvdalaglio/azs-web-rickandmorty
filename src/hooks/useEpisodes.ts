// hooks/useEpisodes.ts
import { Episode } from "@/models/Episode";
import { ResponseInfo } from "@/models/Response";
import { fetchEpisodesByFilter } from "@/services/episodeService";
import { useEffect, useState } from "react";

interface IUseEpisodes {
  episodes: Episode[];
  loading: boolean;
  error: string;
  episodesInfo: ResponseInfo;
}

export const useEpisodesViewModel = ({
  page = 1,
  name = "",
  season = "",
}: {
  page?: number;
  name?: string;
  season?: string;
}): IUseEpisodes => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [episodesInfo, setEpisodesInfo] = useState<ResponseInfo>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchEpisodesByFilter({ page, name, season });
        setEpisodes(data.results);
        setEpisodesInfo(data.info);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Erro ao carregar episódios");
        } else {
          setError("Erro ao carregar episódios");
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, name, season]);

  return { episodes, loading, error, episodesInfo };
};
