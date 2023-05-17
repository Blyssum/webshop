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
                "product": ["cover", "media", "id", "name", "calculatedPrice"]
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
</script>

<template>
    <div class="w-screen h-screen bg-blend-color-burn bg-gray-800"
         :style="{backgroundImage: 'url(' + noise + ')', backgroundColor:'#27292d', backgroundSize:'1%'}">
        <div class="w-1/2 2xl:w-1/2 h-screen mx-auto shadow-rect flex flex-col divide-y-2 divide-white" :style="{backgroundColor: '#030303'}">
            <divider/>

            <navbar/>

            <div class="w-full h-full border-x-2 border-white">
                <div class="items-start w-fit h-120 bg-gray-600">
                    <img class="m-10 w-1/3 aspect-square object-cover" :src=" product?.media?.[0].media.url "/>
                    <div class="m-10 w-1/4 h-1/3 bg-gray-800">
                        <img class="aspect-square w-1/2 object-cover" v-for="image in product?.media?.values()" :src="image?.media.url" />

                    </div>
                </div>
                <div class="text-white">{{ product?.name }}</div>
            </div>


            <divider/>
        </div>
    </div>
</template>