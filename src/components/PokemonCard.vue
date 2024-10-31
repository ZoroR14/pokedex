<script setup lang="ts">

import { usePokemonStore } from '../stores/PokemonStore';
const images = import.meta.glob('../assets/types/*.svg', { eager: true }) as Record<string, { default: string }>;


const store = usePokemonStore()

function getImageRoute(type: string){
    let ruta = (type == 'steel' || type == 'fairy') ? "../assets/types/normal.svg" : "../assets/types/" + type + ".svg";
    return images[ruta].default
}

</script>
<template>
    <div style="margin-left: 2%;">
        <div v-for="pokemon in store.filteredPokemons" class="pokemonCard" :style="{'--main-color': pokemon.pokemonDetails.pokemonColor,  color: pokemon.pokemonDetails.pokemonColor != 'white' ? 'white': 'black'}">
            <div class="pokemonDetails" style="">
                <section class="pokemonData">
                    <span># {{ pokemon.id }}</span>
                    <span>{{ pokemon.name }}</span>
                    <div style="display: inline-flex;">
                        <div v-for="t in pokemon.pokemonDetails.pokemonTypes" class="typeCard darker">
                            <img :src="getImageRoute(t.type.name)" style="width: 1.3em; height: 1.3em;" :alt="t.type.name">
                            <span>{{ t.type.name }}</span>
                        </div>
                    </div>
                </section>
                <section class="pokemonImage">
                    <img :src="pokemon.pokemonDetails.pokemonImage" :alt="pokemon.name" style="width: 12em; height: 12em;">
                </section>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

.pokemonCard{
  display: inline-grid;
  width: 24em;
  height: 8em;
  margin: 10px 5px;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 1px 1px 1px black;
  background-color: var(--main-color); // Color original
}

.pokemonDetails{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.pokemonData {
  width: 40%;
}

.pokemonImage {
  width: 60%;
} 

.typeCard{
    width: 4em; 
    height: 3em; 
    margin: 5px 5px; 
    color: white;
    border-radius: 5px;
}

.darker{
    background-color: var(--main-color);
    filter: brightness(0.8);
}
</style>