<script lang="ts" setup>

</script>

<template>
    <div class="text-textBeige font-serif border-x-2 border-borderGray grid-cols-5 grid p-4 text-sm lg:text-base">
        <div class="flex flex-col col-span-2">
            <nuxt-link to="/contact" class="footerButton">Contact</nuxt-link>
            <nuxt-link to="/about" class="footerButton">About</nuxt-link>
            <nuxt-link to="/shipping" class="footerButton">Shipping</nuxt-link>
        </div>
        <div class="flex flex-col col-span-2">
            <nuxt-link to="/policy" class="footerButton">Terms & Conditions</nuxt-link>
            <nuxt-link to="/policy" class="footerButton">Data Protection</nuxt-link>
            <nuxt-link to="/policy" class="footerButton">Imprint</nuxt-link>
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

    <div class="text-textBeige font-serif text-center border-x-2 border-borderGray p-1">
        BLYSSUM©
    </div>
</template>


<style scoped>
.footerButton {
    @apply hover:underline mr-auto mb-auto decoration-1 underline-offset-2 rounded;
}
</style>