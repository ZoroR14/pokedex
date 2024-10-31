<script setup lang="ts">
    // Importa todas las imágenes SVG en un objeto
    const images = import.meta.glob('../assets/types/*.svg', { eager: true }) as Record<string, { default: string }>;

    const arrayOfTypes: Array<{id: string, name: string, img: string}> = [
        {id: '1', name: 'Bug', img : images["../assets/types/bug.svg"].default},
        {id: '2', name: 'Dragon', img : images["../assets/types/dragon.svg"].default},
        {id: '3', name: 'Electric', img : images["../assets/types/electric.svg"].default},
        {id: '4', name: 'Fighting', img : images["../assets/types/fighting.svg"].default},
        {id: '5', name: 'Fire', img : images["../assets/types/fire.svg"].default},
        {id: '6', name: 'Flying', img : images["../assets/types/flying.svg"].default},
        {id: '7', name: 'Ghost', img : images["../assets/types/ghost.svg"].default},
        {id: '8', name: 'Grass', img : images["../assets/types/grass.svg"].default},
        {id: '9', name: 'Ground', img : images["../assets/types/ground.svg"].default},
        {id: '10', name: 'Ice', img : images["../assets/types/ice.svg"].default},
        {id: '11', name: 'Normal', img : images["../assets/types/normal.svg"].default},
        {id: '12', name: 'Poison', img : images["../assets/types/poison.svg"].default},
        {id: '13', name: 'Psychic', img : images["../assets/types/psychic.svg"].default},
        {id: '14', name: 'Rock', img : images["../assets/types/rock.svg"].default},
        {id: '15', name: 'Water', img : images["../assets/types/water.svg"].default}
    ];
</script>
<template>
    <div v-for="type in arrayOfTypes" class="cardFilter">
        <img :src="type.img" :alt="type.name" style="width: 1.3em; height: 1.3em; padding-left: 12px; padding-top: 8px;">
        <span>Type {{ type.name }}</span>
    </div>
</template>