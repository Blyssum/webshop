<script lang="ts" setup>
import {Product} from "@shopware-pwa/commons";
import {getProduct, setup} from "@shopware-pwa/shopware-6-client";
import {useRoute} from "vue-router";
import {ref} from "@vue/reactivity";
import {onMounted} from "@vue/runtime-core";

const route = useRoute()

const product = ref<Product | null>(null)
onMounted(async () => {
  setup({
    endpoint: "https://sw.blyssum.com",
    accessToken: "SWSCN0JZTDGZWJBNNXI2CEZNQG",
  });

  const slug = route.params.slug as string
  const id = slug.split("-").pop()

  product.value = (await getProduct(id!)).product
})
</script>

<template>
{{product?.name ?? 'lädt'}}
</template>