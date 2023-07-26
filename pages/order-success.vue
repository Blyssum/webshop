<script setup lang="ts">

import {useNotifications} from "@shopware-pwa/composables-next";
import {useHead} from "unhead";

const { pushInfo } = useNotifications();

useHead({
    title: 'BLYSSUM | Success'
})

</script>

<template>
    <div class="text-textBeige font-serif text-center p-5 border-x-2 border-borderGray">
        Your order has been received and is being processed. <br>
        An invoice was sent to your email on file. <br>
        Once your order has been produced you will receive a shipment tracking.<br>
        Thank you for purchasing from BLYSSUM. <br><br>

        <nuxt-link to="/" class="underline underline-offset-2 text-purple-600">Return home</nuxt-link>
    </div>
</template>

<style scoped>

</style>