<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted} from "@vue/runtime-core";
import {
    useCart,
    useProductSearch,
    useShopwareContext
} from "@shopware-pwa/composables-next";
import { getProductName } from "@shopware-pwa/helpers-next";



const route = useRoute();

const {refreshCart} = useCart();
const {search} = useProductSearch();
const {apiInstance} = useShopwareContext();

const id = route.params.slug as string

const productResponse = await search(id!, {
    withCmsAssociations: true,
    criteria: {
        associations: {
            manufacturer: {},
            properties: {},
            options: {},

        },
    },
    includes: { // omit this parameter if you want to use the whole product entity
        product: ["id", "name", "cover", "calculatedPrice", "translated", "description"],
        product_media: ["media"],
        media: ["url", "thumbnails"],
    },

});



onMounted(async () => {
    console.log("test")


    console.log(productResponse);

    await refreshCart();
})



</script>

<template>
    <div  v-if="productResponse?.product!=undefined && productResponse?.configurator!=undefined">
        <product-card :product="productResponse!.product" :configurator="productResponse!.configurator" />
    </div>
</template>