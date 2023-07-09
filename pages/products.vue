<script lang="ts" setup>

import {useListing} from "@shopware-pwa/composables-next";
import {useRoute, useRouter} from "vue-router";
import {useHead} from "unhead";

const router = useRouter();

const {search, getElements} = useListing({
    listingType: "categoryListing",
    categoryId: "bae9ba04cf8a4b588c0d0daafbc4a70c", // entrypoint to browse
    defaultSearchCriteria: { // set the default criteria
        limit: 20,
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

useHead({
    title: 'BLYSSUM | Products'
})

</script>

<template>
    <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 font-serif text-white border-x-2">
        <div v-for="product in getElements" class="w-full border-2">
            <img :src="product.cover.media.url" alt="" class="cursor-pointer p-16 mx-auto object-contain" @click="router.push('/details/' + product.id)"/>
            <div class="flex p-7 border-t-2 border-white">
                <nuxt-link :to="'/details/' + product.id" class="buyButton"> {{ product.name }}</nuxt-link>

                <div class="text-2xl ml-auto"> {{ product.calculatedPrice.totalPrice }}0€</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.buyButton {
    @apply text-2xl hover:underline underline-offset-2;
}
</style>