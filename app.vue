<template>
    <title>BLYSSUM</title>

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { SessionContext } from "@shopware-pwa/types";
import {createShopwareContext, useSessionContext, useCart, useShopwareContext} from "@shopware-pwa/composables-next";
import {createApp, ref} from "vue";
import {useNuxtApp} from "#app";
import {createInstance} from "@shopware-pwa/api-client";
import App from "./app.vue";


const { refreshSessionContext } = useSessionContext();


const { data: sessionContextData } = await useAsyncData(
    "sessionContext",
    async () => {
    }
);
useSessionContext(sessionContextData.value as SessionContext);


const runtimeConfig = useRuntimeConfig();

const apiContext = createInstance({
    endpoint: runtimeConfig.public.shopware.shopwareEndpoint,
    accessToken: runtimeConfig.public.shopware.shopwareAccessToken,
});


// import previously implemented module



const { refreshCart } = useCart();

onMounted(() => {
    refreshSessionContext();


    refreshCart();
});

</script>

<style scoped>

</style>