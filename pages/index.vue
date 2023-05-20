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
    <div class="w-screen h-fit min-h-screen bg-blend-color-burn bg-gray-800"
         :style="{backgroundImage: 'url(' + noise + ')', backgroundColor:'#27292d', backgroundSize:'1%'}">
        <div class="w-1/2 2xl:w-1/2 h-fit min-h-screen mx-auto shadow-rect flex flex-col divide-y-2 divide-white" :style="{backgroundColor: '#030303'}">
            <divider />

            <navbar />

            <div class="object-contain">
                <img class="w-full h-fit border-white border-x-2" src="~/assets/images/exampleModel1.webp"/>
            </div>

            <div class="p-5 text-center tobject-contain h-full border-x-2 border-white text-white font-serif">
                Wir sind blyssum lorem impsum
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr w-full h-fit gap-0 border-white border-x-2">
                <div class=" p-5 h-52 w-full" v-for="product in products">
                    <img class=" mx-auto w-32 h-32" :src="product.cover.media.url"/>
                    <div class="text-sm text-white uppercase font-serif" >
                        {{ product.calculatedPrice.totalPrice + "€" }}
                    </div>
                    <nuxt-link class="buyButton" :to="'products/' + product.name!.toLowerCase().split(' ').join('-') + '-' + product.id">{{ product.name }}</nuxt-link>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr w-full h-fit gap-0 border-white border-x-2">
                <div class=" p-5 h-52 w-full" v-for="product in products">
                    <img class=" mx-auto w-32 h-32" :src="product.cover.media.url"/>
                    <div class="text-sm text-white uppercase font-serif" >
                        {{ product.calculatedPrice.totalPrice + "€" }}
                    </div>
                    <nuxt-link class="buyButton" :to="'products/' + product.name!.toLowerCase().split(' ').join('-') + '-' + product.id">{{ product.name }}</nuxt-link>
                </div>
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