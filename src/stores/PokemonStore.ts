import { defineStore } from "pinia";
import { Pokemons, PokemonTypes }  from '../types'

export const usePokemonStore = defineStore('pokemonStore', {
    state: () => ({
        pokemons: [] as Pokemons[],
        url: 'https://pokeapi.co/api/v2' as string,
        filterPokemonName: "" as string,
        filterByType: "" as string,
        page: 1 as number,
        showPagination: true as boolean
    }),
    actions: {
        async  getPokemons(){
            const response = await this.cachedData(this.url + '/generation/1', 1) ?? await fetch(this.url + '/generation/1')
            const pokemonData = await Promise.all(
              response.pokemon_species.map(async (element: {name: string, url: string}) => {
                const secondResponse = await this.cachedData(element.url, 2) ?? await fetch(element.url)
                const thirdResponse = await this.cachedData(this.url + '/pokemon/' + element.name, 3) ?? await fetch(this.url + '/pokemon/' + element.name)
          
                const pokemonImage = thirdResponse['sprites']['front_default'];
                const pokemonColor = secondResponse['color']['name'];
                const pokemonTypes: PokemonTypes[] = thirdResponse['types'];

                const {base_happiness, capture_rate, id} = secondResponse
                const {weight, height, base_experience, stats} = thirdResponse
          
                return {
                  id: id,
                  name: element.name,
                  pokemonDetails: {
                    weight, height, base_experience, stats, pokemonTypes, base_happiness, capture_rate, pokemonColor, pokemonImage
                  }
                }
              })
            )
            this.pokemons = pokemonData;
          },
          
          //Cache
          async  cachedData(url: string, version: number){
             const cacheVersion = version;
             const cacheName = `pokeapp-${cacheVersion}`;
             const cacheStorage = await caches.open(cacheName)
             let cachedResponse = await cacheStorage.match(url)
          
          
             if (!cachedResponse || !cachedResponse.ok) {
                await cacheStorage.add(url);
                cachedResponse = await cacheStorage.match(url)
                return await cachedResponse!.json()
            }
          
            return await cachedResponse.json();
          },
    },
    getters: {
        filteredPokemons(state){
            if(!state.filterPokemonName && !state.filterByType){
              state.showPagination = true;
              const perPage:number = 10;
              const from = (state.page * perPage) - perPage;
              const to = (state.page * perPage);
              return state.pokemons.slice(from, to);
            } 
            else if(state.filterPokemonName){
              state.showPagination = false;
              return state.pokemons.filter((pokemon) => {
                return pokemon.name.toLowerCase().includes(state.filterPokemonName.toLowerCase())
              })
            }
            else{
              state.showPagination = false;
              return state.pokemons.filter((pokemon) => {
                return pokemon.pokemonDetails.pokemonTypes.some((type) => {
                  return type.type.name.toLowerCase().includes(state.filterByType.toLocaleLowerCase())
                })
              })
            }
        },
    },
})