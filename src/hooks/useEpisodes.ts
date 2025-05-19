import { Episode } from "@/models/Episode";
import { fetchEpisodes } from "@/services/episodeService";
import { useEffect, useState } from "react";

export const useEpisodesViewModel = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEpisodes();
        setEpisodes(data);
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
  }, []);

  return { episodes, loading, error };
};
