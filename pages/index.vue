<script lang="ts" setup>

import {useCart, useListing, useNotifications } from "@shopware-pwa/composables-next";
import {getProductRoute} from "@shopware-pwa/helpers-next";
import Flicking from "@egjs/vue3-flicking";
import autoPlay from "@egjs/flicking-plugins/src/AutoPlay";
import {AutoPlay} from "@egjs/flicking-plugins";
import {useRouter} from "vue-router";

const {search, getElements} = useListing({
    listingType: "categoryListing",
    categoryId: "bae9ba04cf8a4b588c0d0daafbc4a70c", // entrypoint to browse
    defaultSearchCriteria: { // set the default criteria
        limit: 2,
        p: 1,
        sort: [
            { "field": "sales", "order": "DESC" },
        ]
    },
});

search({ // invoke search() method
    includes: { // omit this parameter if you want to use the whole product entity
        product: ["id", "name", "cover", "calculatedPrice", "translated", "sales"],
        product_media: ["media"],
        media: ["url", "thumbnails"],
    },
});

const router = useRouter();
const { refreshCart } = await useCart();
const { pushInfo } = useNotifications();

const plugins = [new AutoPlay({ duration: 3000, direction: "NEXT", stopOnHover: false })];


onMounted(async () => {
    await refreshCart();
    console.log(getElements)
    pushInfo("test");
})


</script>


<template>
    <div class="divide-y-2 divide-white">
        <client-only>
            <cookie-consent/>
        </client-only>

        <img alt="" @click="pushInfo('test', {timeout: 10000}); console.log('test')" class="h-fit border-white border-x-2" src="~assets/images/trippytongueBanner.png"/>

        <Flicking class="border-x-2" :options="{ align: 'prev', circular: true }" @move-end="onMoveEnd">
            <div class="panel inline-flex w-full">
                <img class="w-1/2 aspect-auto object-cover" src="~assets/images/diashow/moritz2.jpeg" />
                <img class="w-1/2 aspect-auto object-cover" src="~assets/images/diashow/moritz1.jpeg" />

            </div>
            <img class="panel" src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"/>
            <img class="panel" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
        </Flicking>

        <div class="p-5 text-center border-x-2 border-white text-white font-serif">
            TOPSELLERS:
        </div>

        <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 font-serif text-white border-x-2">
            <div v-for="product in getElements" class="w-full border-2">
                <img :src="product.cover.media.url" alt="" class="cursor-pointer p-16 mx-auto object-contain" @click="router.push('/details/' + product.id)"/>
                <div class="flex p-7 border-t-2 border-white">
                    <nuxt-link :to="'/details/' + product.id" class="buyButton"> {{ product.name }}</nuxt-link>

                    <div class="text-2xl ml-auto"> {{ product.calculatedPrice.totalPrice + "0€" }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>

.buyButton {
  @apply pb-2 align-middle hover:underline decoration-1 text-white decoration-gray-50 underline-offset-2 rounded font-serif;
}

</style>