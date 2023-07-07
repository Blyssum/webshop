<script lang="ts" setup>
import noise from "assets/images/noise.png";
import {useCart, usePrice, useUser} from "@shopware-pwa/composables-next";
import {getFormattedPrice} from "@shopware-pwa/helpers-next";
import Cookies from "js-cookie";
import {getCurrentInstance, nextTick} from "vue/dist/vue";

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

onMounted(async () => {

})

async function applyPromotionCode(): Promise<void> {
    await addPromotionCode(code);
    console.log(code!);
    await refreshCart();
}

</script>

<template>
    <div>
        <div class="text-center text-3xl p-5 border-x-2 border-white text-white font-serif">Checkout</div>

        <div class="text-white font-serif inline-flex p-5 border-x-2 border-white">
            <div class="w-1/2">
                <div>
                    <div class="text-lg">Subtotal</div>
                    <div>{{ getFormattedPrice(subtotal) }}</div>
                </div>
                <div>
                    <div class="text-lg">Shipping estimate</div>
                    <div>{{ getFormattedPrice(shippingTotal) }}</div>
                </div>
                <div>
                    <div class="text-lg">Order total</div>
                    <div>{{ getFormattedPrice(totalPrice) }}</div>
                </div>
            </div>

            <div class="flex flex-row-reverse w-1/2 h-8">
                <img class="border-2 border-white ml-1" src="~assets/images/check.png" @click=" applyPromotionCode()"/>
                <input v-model="code" class="bg-black border-2 border-white px-2 pt-1 pb-0.5" placeholder="Rabattcode">
            </div>
        </div>

        <div class="p-5 border-white border-x-2 text-white font-serif">

            <payment-methods/>

        </div>
    </div>
</template>