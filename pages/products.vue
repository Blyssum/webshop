<script lang="ts" setup>

import {useListing} from "@shopware-pwa/composables-next";
import {useRoute, useRouter} from "vue-router";
import {useHead} from "unhead";

const router = useRouter();

const {search, getElements, loadMore, getLimit } = useListing({
    listingType: "categoryListing",
    categoryId: "bae9ba04cf8a4b588c0d0daafbc4a70c", // entrypoint to browse
    defaultSearchCriteria: { // set the default criteria
        limit: 6,
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
    <div class="p-5 font-serif text-textBeige border-x-2 border-buttonBeige">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div v-for="product in getElements" class="w-full border-2 border-borderGray">
                <img :src="product.cover.media.url" alt="" class="cursor-pointer p-16 mx-auto object-contain"
                     @click="router.push('/details/' + product.id)"/>
                <div class="flex p-7 border-t-2 border-borderGray">
                    <nuxt-link :to="'/details/' + product.id" class="buyButton"> {{ product.name }}</nuxt-link>

                    <div class="text-2xl ml-auto"> {{ product.calculatedPrice.totalPrice }}0€</div>
                </div>
            </div>
        </div>
        <button @click="loadMore()" v-if="getLimit==getElements.length"
                class="mx-auto flex text-center border-2 border-buttonBeige rounded-full px-6 py-1 mt-5 hover:bg-white hover:text-black transition-all w-fit">
            Weitere...
        </button>
    </div>
</template>

<style scoped>
.buyButton {
    @apply text-2xl hover:underline underline-offset-2;
}
</style>