import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query Pokemongameindex {
    pokemongameindex {
      pokemon {
        id
        name
        base_experience
        height
        weight
        is_default
        order
        pokemon_species_id
      }
    }
  }
`;
