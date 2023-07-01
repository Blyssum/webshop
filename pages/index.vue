<script lang="ts" setup>

import {useCart, useListing} from "@shopware-pwa/composables-next";

const {search, getElements} = useListing({
    listingType: "categoryListing",
    categoryId: "fd20ff23a19b461893234aed8c06162a", // entrypoint to browse
    defaultSearchCriteria: { // set the default criteria
        limit: 10,
        p: 1,
    },
});

search({ // invoke search() method
    includes: { // omit this parameter if you want to use the whole product entity
        product: ["id", "name", "cover", "calculatedPrice", "translated"],
        product_media: ["media"],
        media: ["url", "thumbnails"],
    },
});

const {refreshCart} = await useCart();

onMounted(async () => {
    console.log(getElements)


    await refreshCart();
})


</script>


<template>
    <client-only><cookie-consent/></client-only>

    <img class="h-fit border-white border-x-2" src="~assets/images/trippytongueBanner.png" alt=""/>

    <v-carousel class="border-x-2 border-white" hide-delimiters>
        <v-carousel-item cover src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        ></v-carousel-item>

        <v-carousel-item cover src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        ></v-carousel-item>

        <v-carousel-item cover src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        ></v-carousel-item>
    </v-carousel>

    <div class="p-5 text-center object-contain h-full border-x-2 border-white text-white font-serif">
        Wir sind blyssum lorem impsum
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr h-fit gap-0 border-white border-x-2">
        <div v-for="product in getElements" class=" p-5 h-52">
            <img :src="product.cover.media.url" class=" mx-auto w-32 h-32 object-contain" alt=""/>
            <div class="text-sm text-white uppercase font-serif">
                {{ product.calculatedPrice.totalPrice + "€" }}
            </div>
            <nuxt-link :to="'products/' + product.name!.toLowerCase().split(' ').join('-') + '-' + product.id"
                       class="buyButton">
                {{ product.name }}
            </nuxt-link>
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr h-fit gap-0 border-white border-x-2">
        <div v-for="product in getElements" class=" p-5 h-52">
            <img :src="product.cover.media.url" class=" mx-auto w-32 h-32 object-contain" alt=""/>
            <div class="text-sm text-white uppercase font-serif">
                {{ product.calculatedPrice.totalPrice + "€" }}
            </div>
            <nuxt-link :to="'products/' + product.name!.toLowerCase().split(' ').join('-') + '-' + product.id"
                       class="buyButton">
                {{ product.name }}
            </nuxt-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.buyButton {
  @apply pb-2 align-middle hover:underline decoration-1 text-white decoration-gray-50 underline-offset-2 rounded font-serif;
}

</style>