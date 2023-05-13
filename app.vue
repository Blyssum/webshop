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
    <div class="w-screen h-screen bg-blend-color-burn bg-gray-800"
         :style="{backgroundImage: 'url(' + noise + ')', backgroundColor:'#27292d', backgroundSize:'1%'}">
        <div class="w-1/2 2xl:w-1/2  h-screen mx-auto shadow-rect flex flex-col" :style="{backgroundColor: '#030303'}">

            <div class="border-white border-2 w-full h-12 mt-5 ">
                <div class="w-1/2 h-full inline-flex flex-row">
                    <span class="text-white font-serif h-full my-auto px-3 border-e-2">BLYSSUM</span>
                </div>
                <div class="w-1/2 h-full inline-flex flex-row-reverse">
                    <img class="my-1.5 w-11 h-7 px-1.5" src="~assets/images/shopping_bag2.png"/>
                    <span class="text-white font-serif h-full my-auto px-3 border-x-2">ABOUT</span>
                    <span class="text-white font-serif h-full my-auto px-3 border-s-2">PRODUCTS</span>
                </div>
            </div>

            <div class="object-contain">
                <img class="border-white w-full h-fit border-x-2" src="~assets/images/exampleModel1.webp"/>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr w-full h-fit gap-0 border-white border-2">
                <div class=" p-5 h-52 w-full" v-for="product in products">
                    <img class=" mx-auto w-32 h-32" :src="product.cover.media.url"/>
                    <div class="text-sm text-white uppercase font-serif">{{
                        product.calculatedPrice.totalPrice + "€"
                        }}
                    </div>
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