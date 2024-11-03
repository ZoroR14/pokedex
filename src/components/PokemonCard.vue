<script setup lang="ts">
import { ref } from 'vue';
import { usePokemonStore } from '../stores/PokemonStore';
import { Pokemons } from '../types';
import PokemonModal from './PokemonModal.vue';
import PokemonTypeCard  from './PokemonTypeCard.vue'
    

const store = usePokemonStore()
const isModalVisible = ref(false);
const isActiveGeneral = ref(true);
const isActiveEstadisticas = ref(false);

function showModal(pokemon: Pokemons) {
  store.pokemon = pokemon;
  isModalVisible.value = true;
  isActiveGeneral.value = true;
  isActiveEstadisticas.value = false;
}

function hideModal() {
  isModalVisible.value = false;
}

function manejarActivo(){
    if(isActiveGeneral.value){
        isActiveEstadisticas.value = true;
        isActiveGeneral.value = false;
    }
    else if(isActiveEstadisticas.value){
        isActiveGeneral.value = true;
        isActiveEstadisticas.value = false;
    }
}

</script>
<template>
    <div style="margin-left: 2%;">
        <div v-for="pokemon in store.filteredPokemons" :key="pokemon.id" @click="showModal(pokemon)" class="pokemonCard" :style="{'--main-color': pokemon.pokemonDetails.pokemonColor,  color: pokemon.pokemonDetails.pokemonColor != 'white' ? 'white': 'black'}">
            <section class="pokemonDetails">
                <article class="pokemonData">
                    <div style="color: #000;"># {{ pokemon.id }}</div>
                    <div style="font-size: 2em;">{{ pokemon.name }}</div>
                    <PokemonTypeCard :pokemon="pokemon"></PokemonTypeCard>
                </article>
                <article class="pokemonImage">
                    <img :src="pokemon.pokemonDetails.pokemonImage" :alt="pokemon.name" style="width: 280px; height: 280px;">
                </article>
            </section>
        </div>
    </div>
    <PokemonModal :isVisible="isModalVisible" @close="hideModal">
        <div style="height: 550px; width: 100%;">
            <div :style="{height: '40%', backgroundColor: store.pokemon.pokemonDetails.pokemonColor, display: 'flex'}">
                <section>
                    <img :src="store.pokemon.pokemonDetails.pokemonImage" :alt="store.pokemon.name">
                </section>
                <section>
                    <div># {{ store.pokemon.id }}</div>
                    <div>{{ store.pokemon.name }}</div>
                    <PokemonTypeCard :pokemon="store.pokemon"></PokemonTypeCard>
                </section>
            </div>
            <div style="height: 60%; display: inline-flexbox;">
                <div :style="{backgroundColor: isActiveGeneral ? 'lightblue' : 'transparent', width: '50%'}" @click="manejarActivo">
                    <span>Datos Generales</span>
                </div>
                <div :style="{backgroundColor: isActiveEstadisticas ? 'lightblue' : 'transparent', width: '50%'}" @click="manejarActivo">
                    <span>Estadisticas Base</span>
                </div>
                <div v-show="isActiveGeneral">
                    <p>
                        Nombre: {{ store.pokemon.name.charAt(0).toUpperCase() + store.pokemon.name.slice(1) }} <br>
                        Peso: {{ store.pokemon.pokemonDetails.weight }} kg <br>
                        Altura: {{ store.pokemon.pokemonDetails.height }} " <br>
                        Experiencia Base: {{ store.pokemon.pokemonDetails.base_experience }} pts <br>
                        Felicidad Base: {{ store.pokemon.pokemonDetails.base_happiness }} <br>
                        Indice de Captura: {{ store.pokemon.pokemonDetails.capture_rate }} <br>
                        Grito
                    </p>
                </div>
                <div v-show="isActiveEstadisticas">
                    <section style="margin-top: 10px;">
                        <div v-for="stats in store.pokemon.pokemonDetails.stats" :key="stats.stat.name">
                            <label>{{ stats.stat.name }}</label>
                            <progress :value="stats.base_stat" max="250"></progress>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </PokemonModal>
</template>
<style lang="scss" scoped>

.pokemonCard{
  display: inline-grid;
  width: 24em;
  height: 8em;
  margin: 20px 6px;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 1px 1px 1px black;
  background-color: var(--main-color); // Color original
}

.pokemonDetails{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 10px;
  height: 100%;
  width: 100%;
}

.pokemonData {
  width: 40%;
}

.pokemonImage {
  width: 60%;
  position: relative;
  bottom: 125px;
  right: 10px;
} 

progress{
    width: 100%;
    height: 20px;
    border-radius: 50px;
    background-color: #ddd;
    transition: width 300ms ease;
    margin: 3px 3px;
}

progress[value]::-webkit-progress-bar{
    width: 100%;
    height: 20px;
    background-color: #eee;
    transition: width 300ms ease;
}

progress[value]::-webkit-progress-value{
    width: 0;
    border-radius: 50px;
    background-color: lightblue;
    transition: width 300ms ease;
}
</style>