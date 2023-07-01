<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "@vue/reactivity";
import {onMounted} from "@vue/runtime-core";
import {
    useCart,
    useProductSearch,
    useAddToCart,
    useShopwareContext
} from "@shopware-pwa/composables-next";

const route = useRoute()


const {refreshCart} = useCart();
const {search} = useProductSearch();
const {apiInstance} = useShopwareContext();

const isLoading = ref(true);
const count = 1;
const currentImage = ref<Number>();



const { data: productFound } = await useAsyncData(
    async () => {

        const slug = route.params.slug as string
        const id = slug.split("-").pop();

        const productResponse = await search(id!, { withCmsAssociations: true });

        const productFound = productResponse.product;


        isLoading.value = false;

        return productFound;
    },
    { server : true }
);





onMounted(async () => {
    console.log(apiInstance)
    const slug = route.params.slug as string
    const id = slug.split("-").pop();
    const productResponse = await search(id!, { withCmsAssociations: true });



    currentImage.value = 0;

    await refreshCart();
})



const addToCartProxy = async () => {
    console.log(productFound);
    const {addToCart, quantity } = useAddToCart(productFound);
    quantity.value = count;
    await addToCart();
};

</script>

<template>
    <div id="app" v-if="!isLoading" class="w-full h-fit border-x-2 border-white inline-flex">
        <div class="p-5 w-1/2">

            <img :src="productFound?.media[0]?.media?.url" v-if="currentImage==0" class="aspect-square object-cover border-2 border-white" alt=""/>
            <img :src="productFound?.media[1]?.media?.url" v-if="currentImage==1" class="aspect-square object-cover border-2 border-white" alt=""/>
            <img :src="productFound?.media[2]?.media?.url" v-if="currentImage==2" class="aspect-square object-cover border-2 border-white" alt=""/>
            <img :src="productFound?.media[3]?.media?.url" v-if="currentImage==3" class="aspect-square object-cover border-2 border-white" alt=""/>

            <div class="flex flex-col-reverse ">
                <div class="grid grid-cols-4 pt-5 grid-flow-col gap-5 h-fit">
                    <img :src="productFound?.media[0]?.media?.url" @click="currentImage=0" class="aspect-square object-cover border-2 border-white" alt=""/>
                    <img :src="productFound?.media[1]?.media?.url" @click="currentImage=1" v-if="productFound?.media[1] != undefined" class="aspect-square object-cover border-2 border-white" alt=""/>
                    <img :src="productFound?.media[2]?.media?.url" @click="currentImage=2" v-if="productFound?.media[2] != undefined" class="aspect-square object-cover border-2 border-white" alt=""/>
                    <img :src="productFound?.media[3]?.media?.url" @click="currentImage=3" v-if="productFound?.media[3] != undefined" class="aspect-square object-cover border-2 border-white" alt=""/>

                </div>
            </div>
        </div>

        <div class="w-1/2 py-5 pr-5">
            <div class="border-2 p-5 h-full text-white font-serif flex flex-col">
                <div class="font-bold text-2xl">{{ productFound?.name }}</div>

                <div class="font-light">{{ productFound?.calculatedPrice.totalPrice + "€" }}</div>

                <div class="text-base mt-5">{{ productFound?.description }}</div>

                <div class="mt-5"> size:
                    <br>
                    <button class="border-2 rounded-full mx-2 mt-1 px-6 hover:bg-white hover:text-black transition-all">
                        S
                    </button>
                    <button class="border-2 rounded-full mx-2 px-6 hover:bg-white hover:text-black transition-all">
                        M
                    </button>
                    <button class="border-2 rounded-full mx-2 px-6 hover:bg-white hover:text-black transition-all">
                        L
                    </button>
                </div>


                <div class="mt-2"> quantity:
                    <br>
                    <input v-model="count" class="bg-black border-2 px-2" type="number"/>
                </div>


                <div class="flex flex-col-reverse h-full">
                    <nuxt-link to="/bag" @click="addToCartProxy()" class="mt-1 text-center border-2 rounded-full mb-0.5 px-6 hover:bg-white hover:text-black transition-all">
                        PURCHASE
                    </nuxt-link>
                    <button class="text-center border-2 rounded-full px-6 hover:bg-white hover:text-black transition-all"
                            @click="addToCartProxy()">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>