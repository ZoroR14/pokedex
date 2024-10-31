export type Pokemons = {
    id: number,
    name: string
    pokemonDetails: {weight:number, height:number, base_experience:number, stats: [], pokemonTypes:PokemonTypes[], base_happiness: number, capture_rate: number, pokemonColor: string, pokemonImage: string}
  }

export type PokemonTypes = {
  slot: string,
  type: Map,
  url: string
}