<script lang="ts" setup>

import {getCategories, getProducts, setup} from "@shopware-pwa/shopware-6-client";
import {Product, ShopwareSearchParams, Includes } from "@shopware-pwa/commons";
import noise from "assets/images/noise.png";
import Divider from "~/components/divider.vue";
import {PrepareSupportDefaultBehavior} from "vscode-languageserver-protocol";
import Identifier = PrepareSupportDefaultBehavior.Identifier;



const products = ref<Product[]>([])

onMounted(async () => {
    setup({
        endpoint: "https://sw.blyssum.com",
        accessToken: "SWSCN0JZTDGZWJBNNXI2CEZNQG",
    });

    const criteria =
        {
            "limit": 10,
            "includes": {
                "product": ["cover", "media", "id", "name", "calculatedPrice"]
            },
            "associations": {
                "media": {}
            }
        };

    const productsResponse = await getProducts(criteria)
    products.value = productsResponse.elements
    console.log(products.value)

    const defaultsConfigBuilder =
        require("@shopware-pwa/nuxt-module/api-defaults").default;
    defaultsConfigBuilder().add("useCms.includes.",  "someCustomValue")


})


</script>


<template>
    <div class="w-screen h-full bg-blend-color-burn bg-gray-800"
         :style="{backgroundImage: 'url(' + noise + ')', backgroundColor:'#27292d', backgroundSize:'1%'}">
        <div class="w-1/2 2xl:w-1/2 min-h-screen mx-auto shadow-rect flex flex-col divide-y-2 divide-white" :style="{backgroundColor: '#030303'}">
            <divider />

            <navbar />

            <div class="p-3 object-contain h-full border-x-2 border-white text-white font-serif">
                Wir sind blyssum lorem impsum
            </div>

            <divider/>
        </div>
    </div>

</template>

<style scoped lang="scss">

.buyButton {
  @apply pb-2 align-middle hover:underline decoration-1 text-white decoration-gray-50 underline-offset-2 rounded w-full font-serif;
}

</style>