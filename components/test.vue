<script setup lang="ts">
import {
    CreateOrderActions,
    CreateOrderData,
    loadScript,
    OnApproveActions,
    OnApproveData,
} from "@paypal/paypal-js";
import {onMounted, ref, computed, watch} from "vue";
import {
    useCheckout,
    useSessionContext,
    useShopwareContext,
    useCart,
    useOrderPayment, useOrderDetails, useNotifications
} from "@shopware-pwa/composables-next";
import {
    getProductThumbnailUrl,
    getTranslatedProperty,
} from "@shopware-pwa/helpers-next";
import {useRoute} from "vue-router";
import {getCustomerOrders} from "@shopware-pwa/api-client";
import {Product, PropertyGroup} from "@shopware-pwa/types";
import clientFallbackClient from "#app/components/client-fallback.client";

const route = useRoute();

const orderCreated = ref();
const redirectPaymentUrl = ref();
const isLoading = ref(true);
const {paymentMethods, getPaymentMethods, createOrder} = useCheckout();
const {setPaymentMethod} = useSessionContext();
const {apiInstance} = useShopwareContext();
const {refreshCart} = useCart();
const {pushInfo} = useNotifications();

const paypalMethod = computed(() => {
    return paymentMethods.value?.find(
        (method) => method.shortName === "pay_pal_payment_handler"
    );
});

const props = defineProps<{
    acceptedPolicy: Boolean;
}>();

const renderPaypalButtons = async () => {
    const paypal = await loadScript({
        clientId:
            "AfMJ4YAokKuzk2B4ntn5mo3OFZp1tNiz9cqrrluXuIuCEorn6wkNH2digURPCjxIrb_lAHS06VIDRFdC",
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
            if (props.acceptedPolicy == false)
            {
                pushInfo("Akzeptiere die AGB und den Datenschutz zuerst");
                return;
            }
            await setPaymentMethod(paypalMethod.value);


            const response = await apiInstance.invoke.post <{ token: string }>(
                "/store-api/paypal/express/create-order?isPayPalExpressCheckout=1"
            );
            console.log(response);
            return response?.data?.token;
        },

        // Finalize the transaction after payer approval
        // Will be called if the payment process is approved by paypal
        onApprove: async (data: OnApproveData, actions: OnApproveActions) => {
            console.log(data.orderID)
            const response = await apiInstance.invoke.post(
                "/store-api/paypal/express/prepare-checkout?isPayPalExpressCheckout=1",
                {
                    token: data.orderID,
                }
            );
            orderCreated.value = await createOrder();
            await refreshCart();
            const handlePaymentResponse = await apiInstance.invoke.post(
                "/store-api/handle-payment",
                {
                    orderId: orderCreated.value.id,
                    successUrl: `${window.location.origin}/order-success`,

                }
            );


            console.log(handlePaymentResponse);

            redirectPaymentUrl.value = handlePaymentResponse?.data?.redirectUrl;
            //
            const {handlePayment} = useOrderDetails(data.orderID);

            handlePayment("/order-success");
        },
    })
        .render("#paypal-buttons");
};

watch(
    () => isLoading.value,
    (isLoading) => {
        if (!isLoading) {
            renderPaypalButtons();
        }
    }
);

onMounted(async () => {
        await getPaymentMethods();
        isLoading.value = false;
        return;

});
</script>
<template>
    <div> Disclaimer 1: The payment process is going through two phases. This is wanted behaviour. The first one is only for authorization and no transaction is actually being made.</div>
    <div class="mt-2"> Disclaimer 2: Your order has succeeded as soon as you confirm your transaction in step 2</div>

    <div v-if="!orderCreated">
        <div class="px-5 pb-5">
            <div class="mt-8" id="paypal-buttons"></div>
        </div>
    </div>
    <div
            v-else
            role="status"
            class="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700"
    >
        <div
                class="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-700"
        >
            <svg
                    class="w-32 h-32 p-8 text-gray-200 dark:text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
            >
                <path
                        d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
                />
            </svg>
        </div>
        <div
                class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
        ></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="flex justify-between items-center pt-4">
            <div>
                <div
                        class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                ></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div class="h-8 bg-gray-300 rounded-md dark:bg-gray-700 w-24"></div>
        </div>
        <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="mt-5">
        <a class="mb-4 text-xl text-textBeige" >
            Your order
            <mark class="px-2 text-purple-600 bg-almostBlack rounded"
            >#{{ orderCreated.orderNumber }}
            </mark>
            was created! To finish your order you will need to confirm your transaction.
        </a>
        <div class="mt-4 p-6 border-2 border-borderGray rounded-lg text-textBeige font-serif" >
            <h5
                    class="mb-2 text-2xl font-bold tracking-tight"
            >
                Address
            </h5>
            <p class="font-normal">
                {{ orderCreated.addresses?.[0]?.firstName }}
                {{ orderCreated.addresses?.[0]?.lastName }}
            </p>
            <p class="font-normal">
                {{ orderCreated.addresses?.[0]?.street }}
            </p>
            <p class="font-normal">
                {{ orderCreated.addresses?.[0]?.zipcode }}
                {{ orderCreated.addresses?.[0]?.city }}
            </p>
        </div>
        <div class="mt-4 p-6 border-2 border-borderGray rounded-lg text-textBeige font-serif" >

            <h5
                    class="mb-2 text-2xl font-bold tracking-tight"
            >
                Payment method
            </h5>
            <p class="font-normal">
                {{
                    orderCreated.transactions?.[0]?.paymentMethod?.translated?.description
                }}
            </p>
            <p
                    v-if="redirectPaymentUrl"
                    class="font-normal text-textBeige"
            >
                <a
                        :href="redirectPaymentUrl"
                        class="mt-4 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-purple-800 rounded-lg hover:bg-purple-900"
                >
                    Confirm your transaction.
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
        </div>
    </div>
</template>
