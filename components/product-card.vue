<script lang="ts" setup>
import {Product, PropertyGroup} from "@shopware-pwa/types";
import {useAddToCart, useProduct} from "@shopware-pwa/composables-next";
import {getProductRoute, getProductName } from "@shopware-pwa/helpers-next";
import {useRouter} from "vue-router";

const props = defineProps<{
    product: Product;
    configurator: PropertyGroup[];
}>();

const router = useRouter();
const { product, configurator } = useProduct(props.product, props.configurator);

const currentImage = ref(0);
const count = ref(1);

const addToCartProxy = async () => {


    const {addToCart, quantity } = useAddToCart(product);
    quantity.value = count.value;
    await addToCart();
};


</script>

<template>
    <div id="app" class="w-full h-fit border-x-2 border-white inline-flex">
        <div class="p-5 w-1/2">

            <img :src="product?.media[0]?.media?.url" v-if="currentImage==0" class="aspect-square object-cover border-2 border-white" alt=""/>
            <img :src="product?.media[1]?.media?.url" v-if="currentImage==1" class="aspect-square object-cover border-2 border-white" alt=""/>
            <img :src="product?.media[2]?.media?.url" v-if="currentImage==2" class="aspect-square object-cover border-2 border-white" alt=""/>
            <img :src="product?.media[3]?.media?.url" v-if="currentImage==3" class="aspect-square object-cover border-2 border-white" alt=""/>

            <div class="flex flex-col-reverse ">
                <div class="grid grid-cols-4 pt-5 grid-flow-col gap-5 h-fit">
                    <img :src="product?.media[0]?.media?.url" @click="currentImage=0" class="aspect-square object-cover border-2 border-white" alt=""/>
                    <img :src="product?.media[1]?.media?.url" @click="currentImage=1" v-if="product?.media[1] != undefined" class="aspect-square object-cover border-2 border-white" alt=""/>
                    <img :src="product?.media[2]?.media?.url" @click="currentImage=2" v-if="product?.media[2] != undefined" class="aspect-square object-cover border-2 border-white" alt=""/>
                    <img :src="product?.media[3]?.media?.url" @click="currentImage=3" v-if="product?.media[3] != undefined" class="aspect-square object-cover border-2 border-white" alt=""/>

                </div>
            </div>
        </div>

        <div class="w-1/2 py-5 pr-5">
            <div class="border-2 p-5 h-full text-white font-serif flex flex-col">
                <div class="font-bold text-2xl">{{ getProductName() }}</div>

                <div class="font-light">{{ product?.calculatedPrice.totalPrice * count }}€</div>


                <div class="text-base mt-5">{{ product?.description }}</div>

                <product-variants />

                <div class="flex mt-5">
                    <button class="border-2 w-9 h-9 rounded-l-full" @click="count = count < 99 ? count+1 : count;">
                        +
                    </button>
                    <input v-model="count" class="bg-black border-y-2 text-center w-9 h-9" min="1" type="number" />
                    <button class="border-2 w-9 h-9 rounded-r-full" @click="count = count > 1 ? count-1 : 1; ">
                        -
                    </button>
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

<style scoped>

</style>