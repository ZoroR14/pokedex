<script setup lang="ts">
import { ref } from 'vue';
import { usePokemonStore } from '../stores/PokemonStore';
import { Pokemons } from '../types';
import PokemonModal from './PokemonModal.vue';
    
const images = import.meta.glob('../assets/types/*.svg', { eager: true }) as Record<string, { default: string }>;

const store = usePokemonStore()
const isModalVisible = ref(false);
const isActiveGeneral = ref(true);
const isActiveEstadisticas = ref(false);


function getImageRoute(type: string){
    let ruta = (type == 'steel' || type == 'fairy') ? "../assets/types/normal.svg" : "../assets/types/" + type + ".svg";
    return images[ruta].default
}

function showModal(pokemon: Pokemons) {
  isModalVisible.value = true;
  store.pokemon = pokemon;
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
            <div class="pokemonDetails">
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
    <PokemonModal :isVisible="isModalVisible" @close="hideModal">
        <div style="height: 550px; width: 100%;">
            <div :style="{height: '40%', backgroundColor: store.pokemon.pokemonDetails.pokemonColor, display: 'flex'}">
                <section>
                    <img :src="store.pokemon.pokemonDetails.pokemonImage" :alt="store.pokemon.name">
                </section>
                <section>
                    <span># {{ store.pokemon.id }}</span>
                    <span>{{ store.pokemon.name }}</span>
                    <div v-for="t in store.pokemon.pokemonDetails.pokemonTypes" class="typeCard darker">
                            <img :src="getImageRoute(t.type.name)" style="width: 1.3em; height: 1.3em;" :alt="t.type.name">
                            <span>{{ t.type.name }}</span>
                    </div>
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