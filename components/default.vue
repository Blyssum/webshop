<template>
    <div class="w-screen h-screen bg-blend-color-burn bg-gray-800"
         :style="{backgroundImage: 'url(' + noise + ')', backgroundColor:'#27292d', backgroundSize:'1%'}">
        <div class="w-1/2 2xl:w-1/2  h-screen mx-auto shadow-rect flex flex-col" :style="{backgroundColor: '#030303'}">

        </div>
    </div>

</template>

<script setup lang="ts">
import noise from "assets/images/noise.png";
</script>