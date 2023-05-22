<script lang="ts" setup>
import {Product} from "@shopware-pwa/commons";
import {getProduct, setup} from "@shopware-pwa/shopware-6-client";
import {useRoute} from "vue-router";
import {ref} from "@vue/reactivity";
import {onMounted} from "@vue/runtime-core";
import noise from "assets/images/noise.png";

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

    currentImageURL = product?.value?.media[0].media?.url;

})

let currentImageURL = "";

function setCurrentImage(url: string): void {
    currentImageURL = url;
    console.log(currentImageURL);
}

</script>

<template>
    <div :style="{backgroundImage: 'url(' + noise + ')', backgroundColor:'#27292d', backgroundSize:'1%'}"
         class="w-screen h-fit min-h-screen bg-blend-color-burn bg-gray-800 overflow-y-hidden">
        <div :style="{backgroundColor: '#030303'}" class="w-1/2 2xl:w-1/3 h-fit min-h-screen mx-auto shadow-rect flex flex-col  divide-y-2 divide-white">
            <divider/>

            <navbar/>

            <div class="w-full h-fit border-x-2 border-white inline-flex">
                <div class="p-5 w-1/2">
                    <img class="flex aspect-square object-cover border-2 border-white" :src="currentImageURL"/>

                    <div class="flex flex-col-reverse ">
                        <div class="grid grid-cols-4 pt-5 grid-flow-col gap-5 h-fit">
                            <img v-for="image in product?.media?.values()" :src="image?.media.url" class="aspect-square object-cover border-2 border-white" @click=" setCurrentImage(image?.media.url!); " />

                        </div>
                    </div>
                </div>

                <div class="w-1/2 py-5 pr-5">
                    <div class="border-2 p-5 h-full text-white font-serif flex flex-col">
                        <div class="font-bold text-2xl">{{ product?.name }}</div>

                        <div class="font-light">{{ product?.calculatedPrice.totalPrice + "€" }}</div>

                        <div class="text-base mt-5">{{ product?.description }}</div>

                        <div class="mt-5"> size:
                            <br>
                            <button class="border-2 rounded-full mx-2 px-6 hover:bg-white hover:text-black transition-all"> S </button>
                            <button class="border-2 rounded-full mx-2 px-6 hover:bg-white hover:text-black transition-all"> M </button>
                            <button class="border-2 rounded-full mx-2 px-6 hover:bg-white hover:text-black transition-all"> L </button>
                        </div>

                        <div class="flex flex-col-reverse h-full">
                            <div class="text-center border-2 rounded-full px-6 hover:bg-white hover:text-black transition-all"> ADD TO CART </div>
                            <div class="text-center border-2 rounded-full mb-0.5 px-6 hover:bg-white hover:text-black transition-all"> PURCHASE </div>
                        </div>
                    </div>
                </div>
            </div>


            <divider/>
        </div>
    </div>
</template>