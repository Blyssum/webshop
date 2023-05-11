<script lang="ts" setup>

import {getCategories, getProducts, setup} from "@shopware-pwa/shopware-6-client";
import {Product} from "@shopware-pwa/commons";

const products = ref<Product[]>([])

onMounted(async () => {
    setup({
        endpoint: "https://sw.blyssum.com",
        accessToken: "SWSCN0JZTDGZWJBNNXI2CEZNQG",
    });

    const productsResponse = await getProducts()
    products.value = productsResponse.elements
    console.log(products.value)
})

const noeDiggi = (product: Product) => {
    alert("Du bekommst kein " + product.name)
}

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 p-10 gap-5">
      <div class="border rounded-lg shadow-xl p-5" v-for="product in products">
          <h1 class="text-2xl font-medium">{{product.name}}</h1>
          <h2 class="text-sm uppercase font-thin">{{product.description}}</h2>
          <button class="buyButton" @click="noeDiggi(product)">ICH WILL DEN SHIT</button>
      </div>
  </div>
</template>

<style scoped lang="scss">
.buyButton{
    @apply mt-3 py-1 px-2 bg-emerald-500 bg-opacity-50 hover:bg-opacity-100 rounded w-full hover:shadow-lg transition-all duration-200;
}
</style>