import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query {
    episodes(page: 1) {
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
