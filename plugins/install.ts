// plugins/vuetify.js
import VueFlicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import {AutoPlay} from "@egjs/flicking-plugins";
// Or, if you have to support IE9

const plugins = [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false })];


export default defineNuxtPlugin(nuxtApp => {
    // @ts-ignore
    nuxtApp.vueApp.use(VueFlicking)

})