<script setup lang="ts">

const props = defineProps(['pokemon'])

const images = import.meta.glob('../assets/types/*.svg', { eager: true }) as Record<string, { default: string }>;

function getImageRoute(type: string){
    let ruta = (type == 'steel' || type == 'fairy') ? "../assets/types/normal.svg" : "../assets/types/" + type + ".svg";
    return images[ruta].default
}

function formeatTexto (texto: string){
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}

</script>
<template>
    <div style="display: inline-flex;">
        <div v-for="t in props.pokemon.pokemonDetails.pokemonTypes" class="typeCard darker" :style="{'--main-color': props.pokemon.pokemonDetails.pokemonColor}">
            <img :src="getImageRoute(t.type.name)" style="width: 1.3em; height: 1.3em;" :alt="t.type.name">
            <span>{{ formeatTexto(t.type.name) }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.typeCard{
    width: 4em; 
    height: 2em; 
    margin: 16px 2px; 
    padding-left: 10px;
    padding-right: 19px;
    padding-top: 5px;
    color: white;
    border-radius: 5px;
    font-size: small;
    display:  inline-flex;
}

.darker{
    background-color: var(--main-color);
    filter: brightness(0.8);
}
</style>