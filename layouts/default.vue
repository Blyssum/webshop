<script setup lang="ts">
import noise from "assets/images/noise.png";

</script>

<template>
    <div id="app" class="h-fit min-h-screen bg-blend-color-burn bg-gray-800 p-5"
         :style="{backgroundImage: 'url(' + noise + ')', backgroundColor:'#27292d', backgroundSize:'1%'}">
        <div class="xl:w-3/5 3xl:w-1/2 4xl:w-2/5 h-fit lg:shadow-rect mx-auto flex flex-col divide-y-2 divide-borderGray bg-almostBlack">
            <divider />

            <navbar />

            <slot />

            <page-footer />

            <divider />
        </div>
        <notifications />
    </div>
</template>

<style scoped>

</style>
