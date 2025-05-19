import { gql } from "@apollo/client";

export const GET_EPISODES_BY_FILTER = gql`
  query ($page: Int, $name: String, $episode: String) {
    episodes(page: $page, filter: { name: $name, episode: $episode }) {
      info {
        pages
        next
        prev
        count
      }
      results {
        id
        name
        air_date
        episode
        created
        characters {
          id
          name
        }
      }
    }
  }
`;
