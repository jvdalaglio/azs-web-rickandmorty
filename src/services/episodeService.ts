import { GET_EPISODES } from "@/graphql/queries/GetEpisodes";
import { apolloClient } from "./apolloClient";

export const fetchEpisodes = async () => {
  const { data } = await apolloClient.query({ query: GET_EPISODES });
  return data.episodes.results;
};
