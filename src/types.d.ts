export type Pokemons = {
    id: number,
    name: string
    pokemonDetails: {weight:number, height:number, base_experience:number, stats: PokemonStats[], pokemonTypes:PokemonTypes[], base_happiness: number, capture_rate: number, pokemonColor: string, pokemonImage: string}
  }

export type PokemonTypes = {
  slot: string,
  type: Map,
  url: string
}

export type PokemonStats = {
  base_stat: string,
  effort: string,
  stat: {name: string, url: string}
}