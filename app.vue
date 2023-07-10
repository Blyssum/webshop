<template>
    <meta name="google-site-verification" content="RJ5wF4EZWSm7DGx0iVjukXX89mMMRZt2Edq1btd_aTM" />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { SessionContext } from "@shopware-pwa/types";
import {useSessionContext, useCart, useBreadcrumbs, useNotifications} from "@shopware-pwa/composables-next";
import {createInstance } from "@shopware-pwa/api-client";

useSeoMeta({
    title: 'BLYSSUM',
    ogTitle: 'BLYSSUM CLOTHING',
    description: 'Affordable Streetwear by BLYSSUM',
    ogDescription: 'Look at multiple Designs by BLYSSUM in our Onlineshop.',
    ogImage: '/assets/images/seoLogo.png',
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