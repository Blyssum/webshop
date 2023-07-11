<script lang="ts" setup>
import noise from "assets/images/noise.png";
import {useCart, usePrice, useUser} from "@shopware-pwa/composables-next";
import {getFormattedPrice} from "@shopware-pwa/helpers-next";
import Cookies from "js-cookie";
import {getCurrentInstance, nextTick} from "vue/dist/vue";
import {useHead} from "unhead";
import {useRouter} from "vue-router";
import Test from "~/components/test.vue";

const {isGuestSession} = useUser();

const {
    refreshCart,
    subtotal,
    totalPrice,
    shippingTotal,
    addPromotionCode,
    appliedPromotionCodes
} = useCart();

const {getFormattedPrice} = usePrice();

let code = "";
const acceptedPolicy = ref(false);
const router = useRouter();

useHead({
    title: 'BLYSSUM | Checkout'
})

onMounted(async () => {
    if (subtotal.value == 0)
    {
        console.log(totalPrice.value)

        await router.push({
            path: '/order-success'
        });
    }
})

async function applyPromotionCode(): Promise<void> {
    await addPromotionCode(code);
    console.log(code!);
    await refreshCart();
}

</script>

<template>
    <div class="divide-y-2 divide-borderGray text-textBeige font-serif">
        <div class="text-center text-3xl p-5 border-x-2 border-borderGray">Checkout</div>

        <div class="sm:inline-flex p-5 border-x-2 border-borderGray w-full">
            <div class="w-1/2">
                <div v-if="subtotal!=0">
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
                <input v-model="code" class="bg-black border-2 border-borderGray mr-1 sm:mr-0 px-2 pt-1 pb-0.5" placeholder="Rabattcode">

                <img class="border-2 border-borderGray sm:mr-1 cursor-pointer" src="~assets/images/check.png" @click=" applyPromotionCode();"/>
            </div>
        </div>

        <div class="p-5 border-borderGray border-x-2 font-serif" >

            <test :acceptedPolicy="acceptedPolicy" />

        </div>
    </div>
</template>