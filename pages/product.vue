<script lang="ts" setup>
    import {Product} from "@shopware-pwa/commons";
    import {getProduct, getProducts, setup} from "@shopware-pwa/shopware-6-client";

    const product = ref<Product>()
    const id = useRoute().query.id!

    onMounted(async () => {
        setup({
            endpoint: "https://sw.blyssum.com",
            accessToken: "SWSCN0JZTDGZWJBNNXI2CEZNQG",
        });
        const productsResponse = await getProduct(id.toString());

        console.log(id);

        console.log(product.value)

    })

</script>

<template>

    <div>{{ id }}</div>
</template>