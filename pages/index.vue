<script lang="ts" setup>

import {useCart, useListing} from "@shopware-pwa/composables-next";
import Flicking from "@egjs/vue3-flicking";
import {AutoPlay} from "@egjs/flicking-plugins";
import {useRouter} from "vue-router";
import {useHead} from "unhead";

const {search, getElements} = useListing({
    listingType: "categoryListing",
    categoryId: "bae9ba04cf8a4b588c0d0daafbc4a70c", // entrypoint to browse
    defaultSearchCriteria: { // set the default criteria
        limit: 2,
        p: 1,
        sort: [
            {"field": "sales", "order": "DESC"},
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
const {refreshCart} = await useCart();

const plugins = [new AutoPlay({duration: 6000, direction: "NEXT", stopOnHover: false})];

useHead({
    title: 'BLYSSUM'
})

onMounted(async () => {
    await refreshCart();
    console.log(getElements)
})


</script>


<template>
    <div class="divide-y-2 divide-white">
        <client-only>
            <cookie-consent/>
        </client-only>

        <img alt="" @click="router.push('/about')" class="border-white border-x-2"
             src="~assets/images/trippytongueBanner.png"/>

        <Flicking :plugins="plugins" class="border-x-2" :options="{ align: 'prev', circular: true }">
            <nuxt-link to="/details/01891d544470708287dd102981fd7217" class="panel inline-flex w-full cursor-pointer">
                <img class="w-1/2 aspect-auto object-cover" src="~assets/images/diashow/moritz2.jpeg" alt=""/>
                <img class="w-1/2 aspect-auto object-cover" src="~assets/images/diashow/moritz1.jpeg" alt=""/>

            </nuxt-link>
            <img class="panel" src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" alt=""/>
            <img class="panel" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt=""/>
        </Flicking>

        <div class="p-5 text-center border-x-2 border-white text-white font-serif">
            TOPSELLERS:
        </div>

        <div class="text-white font-serif border-x-2 p-5 ">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div v-for="product in getElements" class="w-full border-2">
                    <img :src="product.cover.media.url" alt="" class="cursor-pointer p-16 mx-auto object-contain"
                         @click="router.push('/details/' + product.id)"/>
                    <div class="flex p-7 border-t-2 border-white">
                        <nuxt-link :to="'/details/' + product.id" class="buyButton"> {{ product.name }}</nuxt-link>

                        <div class="text-2xl ml-auto"> {{ product.calculatedPrice.totalPrice + "0€" }}</div>
                    </div>
                </div>
            </div>

            <nuxt-link
                    class="mx-auto flex text-center border-2 rounded-full px-6 py-1 mt-5 hover:bg-white hover:text-black transition-all w-fit"
                    to="/products">
                Alle Produkte
            </nuxt-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.buyButton {
  @apply pb-2 align-middle hover:underline decoration-1 text-white decoration-gray-50 underline-offset-2 rounded font-serif;
}

</style>