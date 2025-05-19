// services/episodeService.ts
import { GET_EPISODE_BY_ID } from "@/graphql/queries/GetEpisodeById";
import { GET_EPISODES } from "@/graphql/queries/GetEpisodes";
import { GET_EPISODES_BY_FILTER } from "@/graphql/queries/GetEpisodesByFilter";
import { apolloClient } from "./apolloClient";

export const fetchEpisodes = async (page: number = 1) => {
  const { data } = await apolloClient.query({
    query: GET_EPISODES,
    variables: { page },
  });
  return data.episodes.results;
};

export const fetchEpisodesByFilter = async ({
  page = 1,
  name = "",
  season = "",
}: {
  page?: number;
  name?: string;
  season?: string;
}) => {
  const { data } = await apolloClient.query({
    query: GET_EPISODES_BY_FILTER,
    variables: {
      page,
      name,
      episode: season,
    },
  });

  return data.episodes;
};

export const fetchEpisodesById = async (id: string) => {
  const { data } = await apolloClient.query({
    query: GET_EPISODE_BY_ID,
    variables: { id },
  });
  return data.episode;
};
