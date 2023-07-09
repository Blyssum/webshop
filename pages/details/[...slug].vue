<script lang="ts" setup>

import {useRoute} from "vue-router";
import {onMounted} from "@vue/runtime-core";
import {
    useCart,
    useProductSearch,
    useShopwareContext
} from "@shopware-pwa/composables-next";
import {getProductName} from "@shopware-pwa/helpers-next";
import ProductCard from "~/components/product-card.vue";
import {useHead} from "unhead";



const route = useRoute();

const {refreshCart} = useCart();
const {search} = useProductSearch();
const {apiInstance} = useShopwareContext();

const id = route.params.slug as string

const { data: productResponse } = await useAsyncData(
    "cmsProduct" + id!,
    async () => {
        const productResponse = await search(id!, {
            withCmsAssociations: true,
            criteria: {

            }
        });

        useHead({
            title: 'BLYSSUM | ' + productResponse.product.translated.name
        })

        return productResponse;
    },
    { server: false }
);


onMounted(async () => {
    console.log("test")


    console.log(productResponse);

    await refreshCart();
})

</script>

<template>
    <div v-if="productResponse?.product!=undefined && productResponse?.configurator!=undefined">
        <product-card :configurator="productResponse!.configurator" :product="productResponse!.product"/>
    </div>
</template>

<style scoped>

</style>