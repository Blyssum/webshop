<script lang="ts" setup>

import noise from "assets/images/noise.png";
import Divider from "~/components/divider.vue";
import {useHead} from "unhead";

useHead({
    title: 'BLYSSUM | About'
})

</script>


<template>
    <div class="divide-white divide-y-2">
        <img class="border-x-2 border-white" src="~/assets/images/aboutBild.png"/>

        <div class="p-5 leading-6 text-sm md:text-base md:leading-8 object-contain h-full border-x-2 border-white text-white font-serif indent-7">
            Wir sind Blyssum, eine neue Bekleidungsmarke bestehend aus jungen und unabhängigen Designern.
            Seit Anfang 2023 verbessern wir kontinuierlich unsere Designs und Ideen. Als in Deutschland ansässiges
            Unternehmen produzieren wir so fair wie möglich, indem wir grüne Energien und hochwertige Ressourcen
            verwenden. Da wir im Print-on-Demand-Verfahren produzieren, stellen wir nur die Dinge her, die wir wirklich
            benötigen. Auf diese Weise vermeiden wir Überproduktion, die unnötig Ressourcen verbraucht.
            Unser Blank Herrsteller STANLEY/STELLA ist Mitglied der FairWear Foundation (FWF). Dadurch wird garantiert,
            dass die Arbeitskräfte, die für die Herstellung der Textilien in Asien arbeiten, fair behandelt sowie
            entlohnt werden.
        </div>
    </div>
</template>

<style lang="scss" scoped>


</style>