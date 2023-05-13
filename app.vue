<script lang="ts" setup>

import {getCategories, getProducts, setup} from "@shopware-pwa/shopware-6-client";
import {Product} from "@shopware-pwa/commons";
import noise from "./assets/images/noise.png";
import {backgroundColors} from "chalk";

const products = ref<Product[]>([])

onMounted(async () => {
    setup({
        endpoint: "https://sw.blyssum.com",
        accessToken: "SWSCN0JZTDGZWJBNNXI2CEZNQG",
    });
    const productsResponse = await getProducts()
    products.value = productsResponse.elements
    console.log(products.value)
})

const noeDiggi = (product: Product) => {
    alert("Du bekommst kein " + product.name)
}

</script>



<template>
    <div class="w-screen h-screen bg-blend-color-burn bg-gray-800" :style="{backgroundImage: 'url(' + noise + ')', backgroundColor:'#27292d', backgroundSize:'1%'}">
        <div class="w-1/2 2xl:w-1/2  h-screen mx-auto shadow-rect flex flex-wrap" :style="{backgroundColor: '#030303'}">

            <div class="border-white flex border-2 w-full h-12 mt-5">
                <span class="w-full h-full inline-block align-middle">
                    <div class="text-white font-serif h-full my-auto px-3 border-e-2">BLYSSUM</div>
                </span>
                <img class="my-auto h-7 px-1.5 border-s-2" src="~assets/images/shopping_bag2.png"/>
            </div>

            <img class="border-white w-full h-fit border-2" src="~assets/images/exampleModel.webp"/>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr w-max h-fit gap-0 border-white border-2">
                <div class=" p-5 h-52 w-fit" v-for="product in products">
                    <img class="object-contain w-32 h-32" :src="product.cover.media.url"/>
                    <div class="text-sm text-white uppercase font-serif">{{ product.calculatedPrice.totalPrice + "€" }}</div>
                    <button class="buyButton" @click="noeDiggi(product)">{{ product.name }}</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">

.buyButton {
  @apply pb-2 align-middle hover:underline decoration-1 text-white decoration-gray-50 underline-offset-2 rounded w-full font-serif;
}

</style>