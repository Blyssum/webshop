<script setup lang="ts">

import {useNotifications} from "@shopware-pwa/composables-next";
import {useHead} from "unhead";

const { pushInfo } = useNotifications();

useHead({
    title: 'BLYSSUM | Fertiggestellt'
})

</script>

<template>
    <div class="text-textBeige font-serif text-center p-5 border-x-2 border-borderGray">
        Ihre Bestellung wurde aufgenommen und wird verarbeitet. <br>
        Eine Rechnung wurde an ihre hinterlegte E-Mail gesendet. <br>
        Sobald ihre Bestellung produziert wurde erhalten sie eine Sendeverfolgung. <br>
        Vielen Dank für ihren Kauf bei BLYSSUM. <br><br>

        <nuxt-link to="/" class="underline underline-offset-2 text-purple-600">Zurück zur Startseite</nuxt-link>
    </div>
</template>

<style scoped>

</style>