<script setup lang="ts">
    import { usePokemonStore } from '../stores/PokemonStore';
    const store = usePokemonStore()
</script>
<template>
    <input class="busqueda" v-model="store.filterPokemonName" type="text" placeholder="Buscar por nombre"/>
</template>