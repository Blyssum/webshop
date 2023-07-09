<script lang="ts" setup>
import noise from "assets/images/noise.png";
import {useCart, usePrice, useUser} from "@shopware-pwa/composables-next";
import {getFormattedPrice} from "@shopware-pwa/helpers-next";
import Cookies from "js-cookie";
import {getCurrentInstance, nextTick} from "vue/dist/vue";
import {useHead} from "unhead";

const {isGuestSession} = useUser();

const {
    refreshCart,
    subtotal,
    totalPrice,
    shippingTotal,
    addPromotionCode
} = useCart();

const {getFormattedPrice} = usePrice();

let code = "";
const acceptedPolicy = ref(false);

useHead({
    title: 'BLYSSUM | Checkout'
})

onMounted(async () => {

})

async function applyPromotionCode(): Promise<void> {
    await addPromotionCode(code);
    console.log(code!);
    await refreshCart();
}

</script>

<template>
    <div class="divide-y-2">
        <div class="text-center text-3xl p-5 border-x-2 border-white text-white font-serif">Checkout</div>

        <div class="text-white font-serif sm:inline-flex p-5 border-x-2 border-white w-full">
            <div class="w-1/2">
                <div>
                    <div class="text-lg">Subtotal:</div>
                    <div>{{ getFormattedPrice(subtotal) }}</div>
                </div>
                <div>
                    <div class="text-lg">Shipping:</div>
                    <div>{{ getFormattedPrice(shippingTotal) }}</div>
                </div>
                <div>
                    <div class="text-lg">Order total:</div>
                    <div>{{ getFormattedPrice(totalPrice) }}</div>
                </div>

                <div class="mt-2">
                    <input type="checkbox" class="mr-0.5" v-model="acceptedPolicy">

                    Ich habe die
                    <nuxt-link to="/policy" class="underline underline-offset-2 text-purple-600">AGB</nuxt-link>
                    und den
                    <nuxt-link to="/policy" class="underline underline-offset-2 text-purple-600">Datenschutz</nuxt-link>
                    gelesen und bin einverstanden.
                </div>
            </div>

            <div class="flex sm:flex-row-reverse mt-2 sm:mt-0 w-1/2 h-8">
                <input v-model="code" class="bg-black border-2 mr-1 sm:mr-0 border-white px-2 pt-1 pb-0.5" placeholder="Rabattcode">

                <img class="border-2 border-white sm:mr-1" src="~assets/images/check.png" @click=" applyPromotionCode()"/>
            </div>
        </div>

        <div class="p-5 border-white border-x-2 text-white font-serif"  v-if="acceptedPolicy">

            <payment-methods />

        </div>
    </div>
</template>