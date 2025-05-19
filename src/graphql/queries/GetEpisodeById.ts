import { gql } from "@apollo/client";

export const GET_EPISODE_BY_ID = gql`
  query ($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        status
        image
        species
      }
    }
  }
`;
