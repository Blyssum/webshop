<script lang="ts" setup>
import {
    useSalutations,
    useCountries,
    useUser,
    useNewsletter,
    useCheckout,
    useNotifications
} from "@shopware-pwa/composables-next";
import {useRouter} from "vue-router";
import {ClientApiError} from "@shopware-pwa/types";


const initialState = {
    firstName: "Georg",
    lastName: "Methner",
    /**
     * Password for the customer. Required, unless `guest` is `true`
     */
    password: "123456789",
    /**
     * If set, will create a guest customer. Guest customers can re-use an email address and don't need a password.
     */
    guest: true,
    email: "georg.methner@gmail.com",
    salutationId: "d7e6a998e9b94301b0037ade54ef68d5",
    billingAddress: {
        street: "klever straße 54",
        zipcode: "40477",
        city: "Düsseldorf",
        countryId: "9d9029ba0b4d4b2caf98935b78b16372",
    }, /** TODO: replace Partial with correct optional fields in BillingAddress */
    shippingAddress: {
        salutationId: "d7e6a998e9b94301b0037ade54ef68d5",
        firstName: "Georg",
        lastName: "Methner",
        street: "klever straße 54",
        zipcode: "40477",
        city: "Düsseldorf",
        countryId: "9d9029ba0b4d4b2caf98935b78b16372",
    },
};

const state = reactive(JSON.parse(JSON.stringify(initialState)));

const {register, isGuestSession, updatePersonalInfo, isLoggedIn} = useUser();
const {getCountries} = useCountries();
const {getSalutations} = useSalutations();
const {newsletterSubscribe} = useNewsletter();
const {pushInfo} = useNotifications();

const router = useRouter();
const loading = ref<boolean>();


const {
    shippingMethods,
    setShippingMethod,
    selectedShippingMethod: shippingMethod,
    getShippingMethods,

} = useCheckout();

onMounted(async () => {
    await getShippingMethods()
})

const expressShipping = false;
const subscribeNewsletter = true;

const selectedShippingMethod = computed({
    get(): string {
        return shippingMethod.value?.id || "";
    },
    async set(shippingMethodId: string) {
        await setShippingMethod({id: shippingMethodId});
    },
});

const invokeSubmit = async () => {


        try {
            const result = await register(state);
            if (result && result.active) {
                await successUser()

            }
        } catch (error) {
            let message =
                (error as ClientApiError)?.messages;
            console.log(message);
        }
};

const successUser = async () => {
    if (subscribeNewsletter) {
        await newsletterSubscribe({
            email: state.email,
            option: "subscribe",
            firstName: state.firstName,
            lastName: state.lastName
        });
    }

    console.log("success");

    if (state.countryId != '9d9029ba0b4d4b2caf98935b78b16372') {
        await setShippingMethod(await getShippingMethods()[0].id)
    }
    console.log(selectedShippingMethod.value);
    pushInfo("Success", {type: "info", timeout: 5, persistent: false})


}


</script>

<template>

    <form class="bg-black my-2" method="get" name="checkout-billing-address" @submit.prevent="invokeSubmit">

        <div class="text-2xl">Delivery</div>
        <div class="inline-flex w-full">
            <input v-model="state.firstName" class="input mr-1 w-1/2" placeholder=" Name" required type="text"/>

            <input v-model="state.lastName" class="input ml-1 w-1/2" placeholder=" Nachname" required type="text"/>
        </div>

        <input v-model="state.billingAddress.street" class="input w-full" placeholder=" Straße" required type="text"/>

        <input v-model="state.billingAddress.zipcode" class="input w-full" placeholder=" Postleitzahl" required
               type="text"/>

        <input v-model="state.billingAddress.city" class="input w-full" placeholder=" Stadt" required type="text"/>

        <select v-model="state.billingAddress.countryId" class="input w-full"
                required v-on:change="console.log(getCountries)">
            <option disabled selected value="">Land</option>
            <option v-for="country in getCountries" :key="country.id" :value="country.id">
                {{ country.name }}
            </option>
        </select>

        <div v-if="state.billingAddress.countryId=='9d9029ba0b4d4b2caf98935b78b16372' " class="inline-flex mt-2">
            <div v-for="shippingMethod in shippingMethods" :key="shippingMethod.id" class="px-1">
                <input
                        :id="shippingMethod.id"
                        v-model="selectedShippingMethod"
                        :value="shippingMethod.id"
                        type="radio"
                />
                <label :for="shippingMethod.id" class="px-1">
                    {{ shippingMethod.name }}
                </label>
            </div>
        </div>

        <div class="text-2xl mt-5">Kontakt</div>
        <input v-model="state.email" class="input w-1/2" placeholder="Email" required type="email"/>

        <br>

        <div class="inline-flex mt-2">
            <input v-model="newsletterSubscribe" checked class="mr-2" type="checkbox">
            <div>erhalte News und Rabatte</div>
        </div>

        <br>

        <button class="border-2 rounded-full py-0.5 px-10" type="submit">Submit</button>
    </form>
</template>

<style scoped>
.input {
    @apply font-serif bg-black border-white border-2 h-9 my-1 text-gray-400 placeholder-gray-400 px-1;
}

</style>