<script lang="ts" setup>
import Cookies from "js-cookie";
import { nextTick, getCurrentInstance } from 'vue'

const preference = ref<string>();
const selected = ref<boolean>();

async function setCookieSettings(setting: string): Promise<void> {
    Cookies.set("cookiesSelected", setting, {expires: 90})

    preference.value = setting;
    selected.value = true;

    console.log(preference.value);

    await nextTick();

    const instance = await getCurrentInstance();
    instance?.proxy?.$nextTick();

}

const customSettings = ref<boolean>();

onMounted(() => {
    preference.value = Cookies.get("cookiesSelected")!;

    customSettings.value = false;
    selected.value = Cookies.get("cookiesSelected")!=undefined;
});

</script>

<template>
    <div v-if="!selected" class="p-5 text-textBeige font-serif border-x-2 border-borderGray text-sm">

        <div v-if="!customSettings">
            BLYSSUM.COM uses various cookies. Technically necessary cookies enable smooth use of the site, including product selection and shopping cart functions. In addition, we use cookies to analyze and continuously improve website usage. They also enable targeted advertisements that match your interests - both on and off our pages.
        </div>

        <div v-else>
        BLYSSUM COOKIES
        <br><br>
            Required cookies::
        <br>
            The necessary cookies are essential to provide the basic functions and services on
            our website. This includes navigation, shopping cart and payment transactions.
            Without these cookies, the website cannot function optimally.
        <br><br>
            Preference cookies:
        <br>
            The preference cookies enable the website to remember your preferred settings such as
            Language or currency. These cookies make your experience more personalized and
            more pleasant.
        <br><br>
            Analytical cookies:
        <br>
            Analytical cookies collect information about how visitors use our website. This
            information helps us improve site performance and optimize the user experience.
            optimize.
        <br><br>
            Marketing cookies:
        <br>
            Marketing cookies help us to display relevant advertisements for our products that are tailored to
            Your interests. We also use these cookies to measure the effectiveness of our
            marketing campaigns.
        <br><br>
            Social media cookies:
        <br>
            Social media cookies enable social media plugins to be integrated on our website.
            These plugins allow you to share or "like" content directly via social networks. The social
            media cookies are not stored by us, but are set by the social media sites themselves.
            set.

        </div>

        <div class="mt-3">
            <button @click="setCookieSettings('all')" class="w-full md:w-72 border-2 border-buttonBeige px-3 hover:underline underline-offset-2 m-0.5">ACCEPT ALL COOKIES</button>
            <button @click="setCookieSettings('required')" class="w-full md:w-72 border-2 border-buttonBeige px-3 hover:underline underline-offset-2 m-0.5">TECHNICAL COOKIES ONLY</button>
            <button v-if="!customSettings" @click="customSettings=true" class="w-full md:w-72 border-2 border-buttonBeige px-3 hover:underline underline-offset-2 m-0.5">SELECTED</button>

            <button v-else @click="setCookieSettings('own')" class="w-full md:w-72 border-2 border-buttonBeige px-3 hover:underline underline-offset-2 m-0.5">ACCEPT</button>

        </div>
    </div>
</template>

<style scoped>

</style>