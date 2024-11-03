<script setup lang="ts">
import SearchInput from './components/SearchInput.vue';
import CardFilter from './components/CardFilter.vue';
import PokemonCard from './components/PokemonCard.vue';
import Pagination from './components/Pagination.vue'

import { usePokemonStore } from './stores/PokemonStore'

import { onMounted } from 'vue';

const store = usePokemonStore()

onMounted(() => {
  store.getPokemons();
})

</script>
<template>
  <header class="principalHeader">
    <h1>Pokédex</h1>
    <p style="text-justify: auto; font: inherit;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dui justo, laoreet ac tempus sed, tincidunt vel est. In pulvinar pellentesque odio sit amet molestie. Aliquam laoreet ut metus congue consequat. Praesent dapibus felis at lectus laoreet, nec porta ligula auctor. Quisque vestibulum erat ac turpis mattis, ac fringilla libero tempor. Sed sed congue ante. Vestibulum eleifend euismod lacus non sagittis. Donec luctus, urna nec pellentesque aliquam, orci enim semper arcu, nec vestibulum lectus felis ac ex.
    </p>
    <SearchInput/>
    <div class="textoFiltro">
      <span>Filtrar por tipo:</span>
    </div>
    <CardFilter/>
    <PokemonCard/>
    <Pagination v-show="store.showPagination"/>
  </header>
</template>

