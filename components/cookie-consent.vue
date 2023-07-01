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
    console.log(preference);

    customSettings.value = false;
    selected.value = Cookies.get("cookiesSelected")!=undefined;
});

</script>

<template>
    <div v-if="!selected" class="p-5 text-white font-serif border-x-2">

        <div v-if="!customSettings">BLYSSUM.COM verwendet verschiedene Cookies. Technisch notwendige Cookies ermöglichen eine reibungslose Nutzung der Seite, darunter Produktwahl und Warenkorbfunktionen. Zudem nutzen wir Cookies zur Analyse und fortlaufenden Verbesserung der Website-Nutzung. Außerdem ermöglichen sie gezielte Werbeanzeigen, die Ihren Interessen entsprechen – sowohl auf unseren Seiten als auch außerhalb.

        </div>

        <div v-else>
        BLYSSUM COOKIES
        <br><br>
        Notwendige Cookies:
        <br>
        Die notwendigen Cookies sind unerlässlich, um die grundlegenden Funktionen und Dienste auf
        unserer Website bereitzustellen. Dazu gehören auch Navigation, Warenkorb und Zahlungsvorgänge.
        Ohne diese Cookies kann die Website nicht optimal funktionieren.
        <br><br>
        Präferenz-Cookies:
        <br>
        Die Präferenz-Cookies ermöglichen es der Website, sich an Ihre bevorzugten Einstellungen wie
        Sprache oder Währung zu erinnern. Diese Cookies machen Ihr Erlebnis personalisierter und
        angenehmer.
        <br><br>
        Analytische Cookies:
        <br>
        Analytische Cookies sammeln Informationen darüber, wie Besucher unsere Website nutzen. Diese
        Informationen helfen uns dabei, die Seitenleistung zu verbessern und das Nutzererlebnis zu
        optimieren.
        <br><br>
        Marketing-Cookies:
        <br>
        Marketing-Cookies helfen uns dabei, relevante Werbung für unsere Produkte anzuzeigen, die auf
        Ihre Interessen abgestimmt sind. Wir verwenden diese Cookies auch, um die Wirksamkeit unserer
        Marketingkampagnen zu messen.
        <br><br>
        Social Media-Cookies:
        <br>
        Social Media-Cookies ermöglichen es, Social Media-Plugins auf unserer Website zu integrieren.
        Über diese Plugins können Sie Inhalte direkt über soziale Netzwerke teilen oder "liken". Die Social
        Media-Cookies sind nicht bei uns gespeichert, sondern werden von den Social Media-Seiten selbst
        gesetzt.

        </div>

        <div class="inline-flex mt-3">
            <button @click="setCookieSettings('all')" class=" border-2 px-3 hover:underline underline-offset-2">ALLE COOKIES AKZEPTIEREN</button>
            <button @click="setCookieSettings('required')" class="border-2 px-3 hover:underline underline-offset-2 mx-2">NUR TECHNISCHE COOKIES</button>
            <button v-if="!customSettings" @click="customSettings=true" class="border-2 px-3 hover:underline underline-offset-22">EIGENE AUSWAHL</button>

            <button v-else @click="setCookieSettings('own')" class="border-2 px-3 hover:underline underline-offset-22">AKZEPTIEREN</button>

        </div>
    </div>
</template>

<style scoped>

</style>