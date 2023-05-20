<script lang="ts" setup>
import {Product} from "@shopware-pwa/commons";
import {getProduct, setup} from "@shopware-pwa/shopware-6-client";
import {useRoute} from "vue-router";
import {ref} from "@vue/reactivity";
import {onMounted} from "@vue/runtime-core";
import noise from "assets/images/noise.png";
import {getBiggestThumbnailUrl, getMedia, getProductThumbnailUrl} from "@shopware-pwa/helpers-next";

const route = useRoute()

const product = ref<Product>()
onMounted(async () => {
    setup({
        endpoint: "https://sw.blyssum.com",
        accessToken: "SWSCN0JZTDGZWJBNNXI2CEZNQG",
    });

    const criteria =
        {
            "limit": 10,
            "includes": {
                "product": ["cover", "media", "id", "name", "description", "calculatedPrice"]
            },
            "associations": {
                "media": {}
            }
        };

    const slug = route.params.slug as string
    const id = slug.split("-").pop()

    product.value = (await getProduct(id!, criteria)).product
    console.log(product);

})

let currentImageURL = product?.value?.cover.url;

function setCurrentImage(url: string): void {
    currentImageURL = url;
    console.log(currentImageURL);
}

</script>

<template>
    <div class="w-fit h-fit min-h-screen bg-blend-color-burn bg-gray-800 overflow-y-hidden"
         :style="{backgroundImage: 'url(' + noise + ')', backgroundColor:'#27292d', backgroundSize:'1%'}">
        <div class="w-1/2 2xl:w-1/2 h-fit min-h-screen mx-auto shadow-rect flex flex-col  divide-y-2 divide-white" :style="{backgroundColor: '#030303'}">
            <divider/>

            <navbar/>

            <div class="w-full h-full border-x-2 border-white inline-flex">
                <div class="p-5 w-1/2">
                    <img class=" aspect-square object-cover border-2 border-white" v-bind:src="currentImageURL"/>
                    <div class="grid grid-cols-4 grid-flow-col gap-4 h-24 pt-5">
                        <img class="aspect-square object-cover border-2 border-white" @click=" setCurrentImage(image?.media.url!); " v-for="image in product?.media?.values()" :src="image?.media.url" />

                    </div>
                </div>

                <div class="p-10 w-1/2 text-white font-serif">
                    <div class="font-bold text-2xl">{{ product?.name }}</div>

                    <div class="font-light">{{ product?.calculatedPrice.totalPrice + "€" }}</div>

                    <div class="text-base mt-5">{{ product?.description }}</div>

                    <div class="mt-5"> size:
                        <br>
                        <button class="border-2 rounded-full mx-2 px-6 hover:bg-white hover:text-black transition-all"> S </button>
                        <button class="border-2 rounded-full mx-2 px-6 hover:bg-white hover:text-black transition-all"> M </button>
                        <button class="border-2 rounded-full mx-2 px-6 hover:bg-white hover:text-black transition-all"> L </button>
                    </div>

                    <div class="text-center border-2 rounded-full mt-48 px-6 hover:bg-white hover:text-black transition-all"> ADD TO CART </div>
                    <div class="text-center border-2 rounded-full mt-0.5 px-6 hover:bg-white hover:text-black transition-all"> PURCHASE </div>

                </div>
            </div>


            <divider/>
        </div>
    </div>
</template>