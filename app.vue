<template>
    <title>BLYSSUM</title>

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { SessionContext } from "@shopware-pwa/types";
import {useSessionContext, useCart, useBreadcrumbs } from "@shopware-pwa/composables-next";
import {createInstance } from "@shopware-pwa/api-client";


const { refreshSessionContext } = useSessionContext();


const { data: sessionContextData } = await useAsyncData(
    "sessionContext",
    async () => {
    }
);
useSessionContext(sessionContextData.value as SessionContext);

const runtimeConfig = useRuntimeConfig();

createInstance({
    endpoint: runtimeConfig.public.shopware.shopwareEndpoint,
    accessToken: runtimeConfig.public.shopware.shopwareAccessToken,
});


// import previously implemented module



const { refreshCart } = useCart();

onMounted(async () => {
    await refreshSessionContext();
    await refreshCart();
});

</script>

<style scoped>

</style>