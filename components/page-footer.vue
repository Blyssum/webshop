<script lang="ts" setup>

</script>

<template>
    <div class="text-white font-serif border-x-2 grid-cols-5 grid p-4 text-sm lg:text-base">
        <div class="flex flex-col col-span-2">
            <nuxt-link to="contact" class="footerButton">Kontakt</nuxt-link>
            <nuxt-link to="about" class="footerButton">About</nuxt-link>
            <nuxt-link to="shipping" class="footerButton">Versandkosten</nuxt-link>
        </div>
        <div class="flex flex-col col-span-2">
            <nuxt-link to="policy" class="footerButton">AGB</nuxt-link>
            <nuxt-link to="policy" class="footerButton">Datenschutz</nuxt-link>
            <nuxt-link to="policy" class="footerButton">Impressum</nuxt-link>
        </div>
        <div>
            <nuxt-link target="_blank" to="https://instagram.com/blyssum.clothing">
                <img class="cursor-pointer ml-auto h-5 w-5" src="~assets/images/instagram.png" />
            </nuxt-link>
            <nuxt-link target="_blank" to="https://www.tiktok.com/@blyssum.clothing">
            <img class="cursor-pointer ml-auto mt-2 h-5 w-5" src="~assets/images/tiktok.png" />
            </nuxt-link>
        </div>
    </div>

    <div class="text-white font-serif text-center border-x-2 p-1">
        BLYSSUM©
    </div>
</template>


<style scoped>
.footerButton {
    @apply hover:underline mr-auto mb-auto decoration-1 underline-offset-2 rounded;
}
</style>