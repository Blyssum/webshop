<script setup lang="ts">

import {useHead} from "unhead";

useHead({
    title: 'BLYSSUM | Shipping'
})
</script>

<template>
    <div class="text-textBeige font-serif border-x-2 border-borderGray p-5">
        <div class="font-bold text-2xl">Shipping conditions</div>
        <div class="mt-5  md:text-lg">Shirts & Baby-Tee:</div>

        <div class="grid grid-cols-5 text-sm md:text-base grid-rows-4 grid-flow-row auto-cols-auto border-2 border-borderGray p-3 mt-1 gap-3">

            <div class="flex flex-col col-span-2">Land</div>
            <div class="flex flex-col">First product</div>
            <div class="flex flex-col">Another product</div>
            <div class="flex flex-col">Max</div>

            <div class="py-3 col-span-2">Germany</div>
            <div class="py-3 text-xs md:text-base">4,17 €</div>
            <div class="py-3 text-xs md:text-base">1,19 €</div>
            <div class="py-3 text-xs md:text-base">7,74 €</div>

            <div class="py-3 col-span-2">Austria, Belgium, Netherlands, Luxembourg</div>
            <div class="py-3 text-xs md:text-base">4,76 €</div>
            <div class="py-3 text-xs md:text-base">1,19 €</div>
            <div class="py-3 text-xs md:text-base">10,12 €</div>

            <div class="py-3 col-span-2">Rest of EU</div>
            <div class="py-3 text-xs md:text-base">4,76 €</div>
            <div class="py-3 text-xs md:text-base">1,19 €</div>
            <div class="py-3 text-xs md:text-base">∞</div>

            <div class="py-3 col-span-2">Worldwide (Non-EU)</div>
            <div class="py-3 text-xs md:text-base">5,36 €</div>
            <div class="py-3 text-xs md:text-base">1,19 €</div>
            <div class="py-3 text-xs md:text-base">∞</div>


        </div>
    </div>
</template>

<style scoped>

</style>