<template>

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { SessionContext } from "@shopware-pwa/types";
import {useSessionContext, useCart, useBreadcrumbs, useNotifications} from "@shopware-pwa/composables-next";
import {createInstance } from "@shopware-pwa/api-client";
import {useSeoMeta} from "unhead";


useSeoMeta({
    title: 'BLYSSUM',
    ogTitle: 'My Amazing Site',
    description: 'This is my amazing site, let me tell you all about it.',
    ogDescription: 'This is my amazing site, let me tell you all about it.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
})

const { refreshSessionContext } = useSessionContext();


const { data: sessionContextData } = await useAsyncData(
    "sessionContext",
    async () => {
    }
);

useSessionContext(sessionContextData.value as SessionContext);
useNotifications();

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