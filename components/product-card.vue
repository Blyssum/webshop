<script lang="ts" setup>
import {Product, PropertyGroup} from "@shopware-pwa/types";
import {useAddToCart, useNotifications, useProduct} from "@shopware-pwa/composables-next";
import {getProductRoute, getProductName} from "@shopware-pwa/helpers-next";
import {useRouter} from "vue-router";

const props = defineProps<{
    product: Product;
    configurator: PropertyGroup[];
}>();

const router = useRouter();
const {product, configurator} = useProduct(props.product, props.configurator);
const { pushInfo } = useNotifications();

const currentImage = ref(0);
const count = ref(1);

const addToCartProxy = async () => {

    pushInfo(count.value + (count.value == 1 ? ' Gegenstand' : ' Gegenstände') + ' zum Einkaufswagen hinzugefügt', {timeout: 3000});
    console.log(product)
    const {addToCart, quantity} = useAddToCart(product);
    quantity.value = count.value;
    await addToCart();
};


</script>

<template>
    <div class="font-serif text-textBeige">
        <div class="border-x-2 border-borderGray divide-y-2 divide-borderGray sm:hidden">
            <div class="p-3">

                <img :src="product?.media[0]?.media?.url" v-if="currentImage==0"
                     class="aspect-square object-cover border-2  border-borderGray" alt=""/>
                <img :src="product?.media[1]?.media?.url" v-if="currentImage==1"
                     class="aspect-square object-cover border-2  border-borderGray" alt=""/>
                <img :src="product?.media[2]?.media?.url" v-if="currentImage==2"
                     class="aspect-square object-cover border-2  border-borderGray" alt=""/>
                <img :src="product?.media[3]?.media?.url" v-if="currentImage==3"
                     class="aspect-square object-cover border-2  border-borderGray" alt=""/>

                <div class="flex flex-col-reverse ">
                    <div class="grid grid-cols-4 pt-3 grid-flow-col gap-3 h-fit">
                        <img :src="product?.media[0]?.media?.url" @click="currentImage=0"
                             class="aspect-square object-cover border-2 border-borderGray" alt=""/>
                        <img :src="product?.media[1]?.media?.url" @click="currentImage=1"
                             v-if="product?.media[1] != undefined"
                             class="aspect-square object-cover border-2 border-borderGray" alt=""/>
                        <img :src="product?.media[2]?.media?.url" @click="currentImage=2"
                             v-if="product?.media[2] != undefined"
                             class="aspect-square object-cover border-2 border-borderGray" alt=""/>
                        <img :src="product?.media[3]?.media?.url" @click="currentImage=3"
                             v-if="product?.media[3] != undefined"
                             class="aspect-square object-cover border-2 border-borderGray" alt=""/>

                    </div>
                </div>
            </div>

            <div class="p-3">
                <div class="h-full text-textBeige flex flex-col">
                    <div class="inline-flex">
                        <div class="font-bold text-2xl">{{ product?.translated.name}}</div>

                        <div class="ml-auto">{{ (product?.calculatedPrice.totalPrice * count).toString().substring(0, 4) }}0€</div>
                    </div>

                    <div class="text-base mt-3 filter invert" v-html="product?.translated.description"></div>

                    <product-variants class="mt-3"/>

                    <div class="flex mt-5">
                        <button class="border-2 border-buttonBeige w-9 h-9 rounded-l-full" @click="count = count > 1 ? count-1 : 1; ">
                            -
                        </button>

                        <input v-model="count" class="bg-black border-y-2 border-buttonBeige text-center w-9 h-9" min="1" type="number"/>

                        <button class="border-2 border-buttonBeige w-9 h-9 rounded-r-full" @click="count = count < 99 ? count+1 : count;">
                            +
                        </button>
                    </div>


                    <div class="flex flex-col-reverse h-full mt-5">
                        <nuxt-link to="/bag" @click="addToCartProxy()"
                                   class="mt-1 text-center border-2 border-buttonBeige rounded-full mb-0.5 px-6 hover:bg-white hover:text-black transition-all">
                            PURCHASE
                        </nuxt-link>
                        <button class="text-center border-2 border-buttonBeige rounded-full px-6 hover:bg-white hover:text-black transition-all"
                                @click="addToCartProxy();">
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </div>



        <div class="w-full h-fit border-x-2 border-borderGray hidden sm:inline-flex">
            <div class="p-5 w-1/2">

                <img :src="product?.media[0]?.media?.url" v-if="currentImage==0"
                     class="aspect-square object-cover border-2  border-borderGray" alt=""/>
                <img :src="product?.media[1]?.media?.url" v-if="currentImage==1"
                     class="aspect-square object-cover border-2  border-borderGray" alt=""/>
                <img :src="product?.media[2]?.media?.url" v-if="currentImage==2"
                     class="aspect-square object-cover border-2  border-borderGray" alt=""/>
                <img :src="product?.media[3]?.media?.url" v-if="currentImage==3"
                     class="aspect-square object-cover border-2  border-borderGray" alt=""/>

                <div class="flex flex-col-reverse ">
                    <div class="grid grid-cols-4 pt-5 grid-flow-col gap-5 h-fit">
                        <img :src="product?.media[0]?.media?.url" @click="currentImage=0"
                             class="aspect-square object-cover border-2  border-borderGray" alt=""/>
                        <img :src="product?.media[1]?.media?.url" @click="currentImage=1"
                             v-if="product?.media[1] != undefined"
                             class="aspect-square object-cover border-2  border-borderGray" alt=""/>
                        <img :src="product?.media[2]?.media?.url" @click="currentImage=2"
                             v-if="product?.media[2] != undefined"
                             class="aspect-square object-cover border-2  border-borderGray" alt=""/>
                        <img :src="product?.media[3]?.media?.url" @click="currentImage=3"
                             v-if="product?.media[3] != undefined"
                             class="aspect-square object-cover border-2  border-borderGray" alt=""/>

                    </div>
                </div>
            </div>

            <div class="w-1/2 py-5 pr-5">
                <div class="border-2 border-borderGray p-5 h-full text-textBeige font-serif flex flex-col">
                    <div class="font-bold text-2xl">{{ product?.translated.name }}</div>

                    <div class="font-light">{{ (product?.calculatedPrice.totalPrice * count).toString().substring(0, 4) }}0€</div>


                    <div class="text-base mt-3 filter invert" v-html="product?.translated.description"></div>

                    <product-variants class="mt-2"/>

                    <div class="flex mt-5">
                        <button class="border-2 border-buttonBeige w-9 h-9 rounded-l-full" @click="count = count < 99 ? count+1 : count;">
                            +
                        </button>
                        <input v-model="count" class="bg-black border-y-2 border-buttonBeige text-center w-9 h-9" min="1" type="number"/>
                        <button class="border-2 border-buttonBeige w-9 h-9 rounded-r-full" @click="count = count > 1 ? count-1 : 1; ">
                            -
                        </button>
                    </div>


                    <div class="flex flex-col-reverse h-full">
                        <nuxt-link to="/bag" @click="addToCartProxy()"
                                   class="mt-1 text-center border-2 border-buttonBeige rounded-full mb-0.5 px-6 hover:bg-textBeige hover:border-textBeige hover:text-black transition-all">
                            PURCHASE
                        </nuxt-link>
                        <button class="text-center border-2 border-buttonBeige rounded-full px-6 hover:bg-textBeige hover:border-textBeige hover:text-black transition-all"
                                @click="addToCartProxy()">
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>