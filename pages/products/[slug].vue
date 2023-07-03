<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "@vue/reactivity";
import {onMounted} from "@vue/runtime-core";
import {
    useCart,
    useProductSearch,
    useAddToCart,
    useShopwareContext, useProductConfigurator, useProduct, useBreadcrumbs
} from "@shopware-pwa/composables-next";
import {Product} from "@shopware-pwa/types";
import {getCategoryBreadcrumbs} from "@shopware-pwa/helpers-next";

const route = useRoute()


const {refreshCart} = useCart();
const {search} = useProductSearch();
const {apiInstance} = useShopwareContext();

const isLoading = ref(true);

const id = route.params.slug as string

const { data: productResponse } = await useAsyncData(
    "cmsProduct" + id,
    async () => {
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
                product: ["id", "name", "cover", "calculatedPrice", "translated"],
                product_media: ["media"],
                media: ["url", "thumbnails"],
            },

        });

        return productResponse;
    },
    { server: false }
);


onMounted(async () => {
    await refreshCart();
})



</script>

<template>
    <div>
        <template v-if="productResponse?.product!=undefined && productResponse?.configurator!=undefined">
            <product-card :product="productResponse!.product" :configurator="productResponse!.configurator" />
        </template>
    </div>
</template>