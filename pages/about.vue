<script lang="ts" setup>

import noise from "assets/images/noise.png";
import Divider from "~/components/divider.vue";
import {useHead} from "unhead";

useHead({
    title: 'BLYSSUM | About'
})

</script>


<template>
    <div class="divide-borderGray divide-y-2">
        <img class="border-x-2 border-borderGray" src="~/assets/images/aboutBild.png"/>

        <div class="p-5 leading-6 text-sm md:text-base md:leading-8 object-contain h-full border-x-2 border-borderGray text-textBeige font-serif indent-7">
            We are Blyssum, a new clothing brand consisting of young and independent designers.
            We have been continuously improving our designs and ideas since the beginning of 2023. As a German based
            company, we produce as fairly as possible, using green energy and high quality resources.
            resources. Since we produce in a print-on-demand process, we only make the things we really
            need. In this way, we avoid overproduction that unnecessarily consumes resources.
            Our blank master STANLEY/STELLA is a member of the FairWear Foundation (FWF). This guarantees
            that the workers who produce the textiles in Asia are treated and paid fairly.
            paid.
        </div>
    </div>
</template>

<style lang="scss" scoped>


</style>