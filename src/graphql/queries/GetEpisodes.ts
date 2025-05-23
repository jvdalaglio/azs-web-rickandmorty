// graphql/queries/getEpisodes.ts
import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      results {
        id
        name
        episode
        air_date
        characters {
          id
        }
      }
    }
  }
`;
