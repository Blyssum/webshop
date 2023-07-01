<script lang="ts" setup>
import {useCart, useCheckout, usePrice, useShopwareContext} from "@shopware-pwa/composables-next";
import selectAll from "css-select";
import {CreateOrderActions, CreateOrderData, loadScript, OnApproveActions, OnApproveData} from "@paypal/paypal-js";
import {getFormattedPrice} from "@shopware-pwa/helpers-next";
import {useRouter} from "vue-router";

const {
    paymentMethods,
    selectedPaymentMethod: paymentMethod,
    setPaymentMethod,
    getPaymentMethods,
    createOrder
} = useCheckout();

const { refreshCart,
    subtotal,
    totalPrice,
    shippingTotal } = useCart();

const { getFormattedPrice } = usePrice();

const { apiInstance } = useShopwareContext();

const router = useRouter();

const methods = await getPaymentMethods()

const orderCreated = ref();
const redirectPaymentUrl = ref();
const isLoading = ref(true);

onMounted(async () => {

    console.log(methods.value);

    await refreshCart();

    if (totalPrice.value == 0)
    {
        console.log(totalPrice.value)

        await router.push({
            path: '/'
        });
    }

    await renderPaypalButtons();

})

const proxyPaymentMethod = async (name: string) =>
{
    for (let i = 0; i < methods.value.length; i++) {
        if (methods.value[i].shortName == name) {
            await setPaymentMethod(methods?.value[i]);
            console.log(paymentMethod.value?.name);
        }
    }

    const order = await createOrder();

}

const paypalMethod = computed(() => {
    return paymentMethods.value?.find(
        (method) => method.shortName === "pay_pal_payment_handler"
    );
});

const renderPaypalButtons = async () => {
    const paypal = await loadScript({
        clientId: "AUAcLFoadrmy9JiW2cHgriy1mTy0MCqQOP_1SSeQEUArz_zPeF1VcNY2CCxcFBQpf_N4g1k5wFVNJ1Bk",
        currency: "EUR",
    });
    if (!paypal || !paypal.Buttons) {
        return;
    }

    await paypal.Buttons({
        style: {
            label: "buynow",
        },
        // Sets up the transaction when a payment button is clicked
        // Will be called if the express button is clicked

        createOrder: async (
            data: CreateOrderData,
            actions: CreateOrderActions
        ) => {
            if (!paypalMethod.value) {
                return "";
            }
            // 1. set the payment method id in the context PATCH /context -> setPaymentMethod
            // 2. add product to cart -> addToCart
            // 3. create order -> /store-api/paypal/express/create-order
            await setPaymentMethod(paypalMethod.value);

            const response = await apiInstance.invoke.post < {token: string} > (
                "/store-api/paypal/express/create-order?isPayPalExpressCheckout=1"
            );
            return response?.data?.token;
        },

        // Finalize the transaction after payer approval
        // Will be called if the payment process is approved by paypal
        onApprove: async (data: OnApproveData, actions: OnApproveActions) => {
            const response = await apiInstance.invoke.post(
                "/store-api/paypal/express/prepare-checkout?isPayPalExpressCheckout=1",
                {
                    token: data.orderID,
                }
            );
            orderCreated.value = await createOrder();
            const handlePaymentResponse = await apiInstance.invoke.post(
                "/store-api/handle-payment",
                {
                    orderId: orderCreated.value.id,
                    successUrl: `${window.location.origin}/ExpressCheckout?order=${orderCreated.value.id}&success=true`,
                }
            );
            redirectPaymentUrl.value = handlePaymentResponse?.data?.redirectUrl;
            //

            await router.push({
                path: '/'
            });
        },
    })
        .render("#paypal-buttons");
};



</script>

<template>

    <div class="inline-flex flex-row w-full pt-3">

    </div>
    <div class="inline-flex w-full mx-auto" v-if="totalPrice!=0" id="paypal-buttons"></div>

</template>

<style scoped>

</style>