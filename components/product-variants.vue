<script setup lang="ts">
import {useProductConfigurator, useShopwareContext} from "@shopware-pwa/composables-next";
import {onMounted} from "@vue/runtime-core";



const onHandleChange = async () => {

    const {
        handleChange,
        getOptionGroups,
        getSelectedOptions,
        findVariantForSelectedOptions,
    } = useProductConfigurator();

}

onMounted(async () => {



})

</script>

<template>
    <button @click="onHandleChange()">aSJFDnjuadf</button>
</template>

<style scoped>

</style>