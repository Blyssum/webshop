<script lang="ts" setup>
import {useCart, useCheckout, usePrice, useShopwareContext} from "@shopware-pwa/composables-next";
import {CreateOrderActions, CreateOrderData, loadScript, OnApproveActions, OnApproveData} from "@paypal/paypal-js";
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

const paypalMethod = computed(() => {
    return paymentMethods.value?.find(
        (method) => method.shortName === "pay_pal_payment_handler"
    );
});

const renderPaypalButtons = async () => {
    const paypal = await loadScript({
        clientId: "AfMJ4YAokKuzk2B4ntn5mo3OFZp1tNiz9cqrrluXuIuCEorn6wkNH2digURPCjxIrb_lAHS06VIDRFdC",
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
            console.log(response?.data?.token);
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
            console.log(response)
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
            console.log(handlePaymentResponse)

            await router.push({
                path: '/order-success'
            });
        },
    })
        .render("#paypal-buttons");
};



</script>

<template>


    <div class="inline-flex w-full mx-auto" v-if="totalPrice!=0" id="paypal-buttons"></div>

    <p
            v-if="redirectPaymentUrl"
            class="font-normal text-gray-700 dark:text-gray-400"
    >
        <a
                :href="redirectPaymentUrl"
                class="mt-4 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
            Bezahlung fertigstellen
            <svg
                    class="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
            >
                <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                ></path>
            </svg>
        </a>
    </p>

</template>

<style scoped>

</style>