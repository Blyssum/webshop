<script setup lang="ts">

const openMenu = ref(false);

</script>

<template>
    <div class="border-x-2 w-full h-12 text-textBeige font-serif inline-flex flex-row relative">





        <div class="w-1/2 h-full flex">

            <div class="border-e-2 border-borderGray flex">
                <nuxt-link to="/" class="px-3 my-auto "> BLYSSUM </nuxt-link>
            </div>

        </div>




        <div class="w-1/2 h-full inline-flex flex-row-reverse">
            <div class="border-l-2 border-borderGray visible sm:hidden">
                <img class="mt-1 w-11 h-9 px-1.5 cursor-pointer" @click="openMenu=!openMenu" src="~/assets/images/menu.png" alt=""/>


            </div>

            <nuxt-link to="/bag" class="border-l-2 border-borderGray">
                <img class="my-2 w-11 h-7 px-1.5" src="~/assets/images/shopping_bag2.png" alt=""/>
            </nuxt-link>

            <div class="border-l-2 border-borderGray hidden sm:flex">
                <nuxt-link to="/about" class="px-3 my-auto "> ABOUT </nuxt-link>
            </div>

            <div class="border-l-2 border-borderGray hidden sm:flex ">
                <nuxt-link to="/products" class="px-3 h-fit my-auto"> PRODUCTS </nuxt-link>
            </div>

        </div>


        <div class="absolute bg-almostBlack border-l-2 border-b-2 border-borderGray w-fit top-12 right-0 visible sm:invisible" v-if="openMenu">
            <nuxt-link to="/products" @click="openMenu=false" class="p-3 h-10"> PRODUCTS </nuxt-link>
            <br>
            <nuxt-link to="/about" @click="openMenu=false" class="p-3 h-10"> ABOUT </nuxt-link>
        </div>
    </div>



</template>
