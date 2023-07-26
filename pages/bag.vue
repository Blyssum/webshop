<script lang="ts" setup>

import noise from "assets/images/noise.png";
import {useCart, usePrice} from "@shopware-pwa/composables-next";
import {integer} from "vscode-languageserver-types";
import checkout from "~/pages/checkout.vue";
import {useHead} from "unhead";

const {cartItems, subtotal, totalPrice, shippingTotal, changeProductQuantity, removeItem} = useCart();
const {getFormattedPrice} = usePrice();

useHead({
    title: 'BLYSSUM | Bag'
})

onMounted(async () => {

    console.log(cartItems);
})


</script>

<template>
    <div class=" text-textBeige font-serif">
        <div v-if="cartItems.length!=0" class="divide-y-2 divide-borderGray border-borderGray border-x-2">

            <div v-for="product in cartItems" class="h-24 p-2 flex sm:hidden">

                <div class="w-2/3 inline-flex flex-row">
                    <img :src="product.cover?.url" class=" p-1 aspect-square object-cover border-2 border-buttonBeige">

                    <div class="my-auto px-3">
                        <div class="w-max"> {{ product.label }}</div>

                        <div class="flex mt-3">
                            <button class="border-2 border-buttonBeige w-7 h-7"
                                    @click="product.quantity = product.quantity < 99 ? product.quantity+1 : product.quantity; changeProductQuantity({quantity: product.quantity, id: product.id } )">
                                +
                            </button>
                            <input v-model="product.quantity" class="bg-black border-y-2 border-buttonBeige text-center w-7 h-7"
                                   max="99"
                                   min="1" type="number"
                                   v-on:change="changeProductQuantity({quantity: product.quantity, id: product.id } )"/>
                            <button class="border-2 border-buttonBeige w-7 h-7"
                                    @click="product.quantity = product.quantity > 1 ? product.quantity-1 : 1; changeProductQuantity({quantity: product.quantity, id: product.id } )">
                                -
                            </button>
                        </div>
                    </div>
                </div>

                <div class="w-1/3 inline-flex flex-row-reverse ">

                    <button class="my-auto aspect-square text-center border-2 border-buttonBeige h-10 w-10 text-4xl"
                            @click="removeItem(product)">-
                    </button>
                    <div class="my-auto mx-2 text-right w-14 underline underline-offset-2">
                        {{ (product.price.totalPrice + "0").toString().substring(0, 5) }}€
                    </div>


                </div>
            </div>


            <div v-for="product in cartItems" class="h-32 p-5 hidden sm:flex">

                <div class="w-1/2 inline-flex flex-row">
                    <img :src="product.cover?.url" class="p-1 aspect-square object-cover border-2 border-buttonBeige">
                    <div class="my-auto mx-5 text-xl"> {{ product.label }}</div>
                    <div class="my-auto mx-5 font-light"> {{ product.description }}</div>
                </div>

                <div class="w-1/2 inline-flex flex-row-reverse ">

                    <button class="my-auto aspect-square text-center border-2 border-buttonBeige h-10 w-10 text-4xl"
                            @click="removeItem(product)">-
                    </button>
                    <div class="my-auto mx-5 text-right w-14 underline underline-offset-2">
                        {{ (product.price.totalPrice + "0").toString().substring(0, 5) }}€
                    </div>

                    <div class="flex my-auto">
                        <button class="border-2 border-buttonBeige w-9 h-9"
                                @click="product.quantity = product.quantity < 99 ? product.quantity+1 : product.quantity; changeProductQuantity({quantity: product.quantity, id: product.id } )">
                            +
                        </button>
                        <input v-model="product.quantity" class="bg-black border-y-2 border-buttonBeige text-center w-9 h-9"
                               max="99"
                               min="1" type="number"
                               v-on:change="changeProductQuantity({quantity: product.quantity, id: product.id } )"/>
                        <button class="border-2 border-buttonBeige w-9 h-9"
                                @click="product.quantity = product.quantity > 1 ? product.quantity-1 : 1; changeProductQuantity({quantity: product.quantity, id: product.id } )">
                            -
                        </button>
                    </div>

                </div>
            </div>


            <div class="">
                <div class="w-1/2 px-5 flex-row inline-flex">
                    Shipping: {{ getFormattedPrice(shippingTotal) }}
                </div>

                <div class="inline-flex flex-row-reverse h-20 p-5 w-1/2">
                    <div class="my-auto mx-5 text-right w-14 underline underline-offset-2">
                        {{ (totalPrice).toString().substring(0, 5) }}€
                    </div>
                </div>

                <div class="p-5">
                    <div class="w-1/2 inline-flex flex-row">
                    </div>

                    <div class="w-1/2 inline-flex flex-row-reverse ">

                        <nuxt-link
                                class="my-auto text-center border-2 border-buttonBeige rounded-full px-6 hover:bg-textBeige hover:border-textBeige hover:text-black transition-all w-52"
                                to="/checkout">
                            Check out
                        </nuxt-link>

                    </div>
                </div>
            </div>

        </div>
        <div v-if="cartItems.length==0" class="text-lg p-5 text-center border-x-2 border-borderGray text-textBeige font-serif">
            Your shopping cart is empty
        </div>
    </div>
</template>

<style scoped>

</style>