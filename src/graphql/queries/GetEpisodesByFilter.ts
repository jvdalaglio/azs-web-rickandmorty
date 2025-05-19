import { gql } from "@apollo/client";

export const GET_EPISODES_BY_FILTER = gql`
  query ($page: Int, $name: String, $episode: String) {
    episodes(page: $page, filter: { name: $name, episode: $episode }) {
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
