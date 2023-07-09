<script lang="ts" setup>
import {useCart, useCheckout, useNotifications, usePrice, useShopwareContext} from "@shopware-pwa/composables-next";
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
const { pushInfo } = useNotifications();

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

        onApprove: function(data, actions) {
            return fetch('/demo/checkout/api/paypal/order/' + data.orderID + '/capture/', {
                method: 'post'
            }).then(function(res) {
                return res.json();
            }).then(async function (orderData) {
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you

                // This example reads a v2/checkout/orders capture response, propagated from the server
                // You could use a different API or structure for your 'orderData'
                var errorDetail = Array.isArray(orderData.details) && orderData.details[0];

                if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                    pushInfo('ERROR ' + errorDetail.issue, {timeout: 10000})
                    return actions.restart(); // Recoverable state, per:
                    // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                }

                if (errorDetail) {
                    var msg = 'Sorry, your transaction could not be processed.';
                    if (errorDetail.description) msg += '\n\n' + errorDetail.description;
                    if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
                    pushInfo(msg, {timeout: 10000});
                    return alert(msg); // Show a failure message (try to avoid alerts in production environments)
                }

                // Successful capture! For demo purposes:
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                var transaction = orderData.purchase_units[0].payments.captures[0];
                alert('Transaction ' + transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

                orderCreated.value = await createOrder();
                await router.push({
                    path: '/order-success'
                });
            });
        }
    })
        .render("#paypal-buttons");
};



</script>

<template>


    <div class="inline-flex w-full mx-auto" v-if="totalPrice!=0" id="paypal-buttons"></div>

</template>

<style scoped>

</style>