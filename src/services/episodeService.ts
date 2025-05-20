// services/episodeService.ts
import { GET_EPISODE_BY_ID } from "@/graphql/queries/GetEpisodeById";
import { GET_EPISODES } from "@/graphql/queries/GetEpisodes";
import { GET_EPISODES_BY_FILTER } from "@/graphql/queries/GetEpisodesByFilter";
import { Episode } from "@/models/Episode";
import { Response } from "@/models/Response";
import { Result } from "postcss";
import { apolloClient } from "./apolloClient";

export const fetchEpisodes = async (
  page: number = 1
): Promise<Result<Episode>> => {
  const { data } = await apolloClient.query({
    query: GET_EPISODES,
    variables: { page },
  });
  return data.episodes;
};

export const fetchEpisodesByFilter = async ({
  page = 1,
  name = "",
  season = "",
}: {
  page?: number;
  name?: string;
  season?: string;
}): Promise<Response<Episode>> => {
  const { data } = await apolloClient.query({
    query: GET_EPISODES_BY_FILTER,
    variables: {
      page,
      name,
      episode: season,
    },
  });

  const response = data.episodes;

  return response;
};

export const fetchEpisodesById = async (id: string): Promise<Episode> => {
  const { data } = await apolloClient.query({
    query: GET_EPISODE_BY_ID,
    variables: { id },
  });
  return data.episode;
};
