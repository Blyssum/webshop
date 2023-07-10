<script lang="ts" setup>
import {Product} from "@shopware-pwa/types";
import {getProductRoute} from "@shopware-pwa/helpers-next";
import {onMounted} from "@vue/runtime-core";
import {useProduct} from "@shopware-pwa/composables-next";

const props = withDefaults(
    defineProps<{
        allowRedirect?: boolean;
    }>(),
    {
        allowRedirect: false,
    }
);

const { changeVariant } = useProduct();

const emit = defineEmits<{
    (e: "change", selected: Product): void;
}>();

const isLoading = ref<boolean>();
const router = useRouter();
const {
    handleChange,
    getOptionGroups,
    getSelectedOptions,
    findVariantForSelectedOptions,
} = useProductConfigurator();

const isOptionSelected = (optionId: string) =>
    Object.values(getSelectedOptions.value).includes(optionId);

const onHandleChange = async () => {

    isLoading.value = true;
    const variantFound = await findVariantForSelectedOptions(
        getSelectedOptions.value
    );
    const selectedOptionsVariantPath = "/details/" + variantFound?.id;
    router.push(selectedOptionsVariantPath);


    isLoading.value = false;
};

onMounted(async () => {
})

</script>

<template>
    <div class="text-textBeige font-serif">
        <div v-for="optionGroup in getOptionGroups" :key="optionGroup.id">
            <div class="text-lg">
                {{ optionGroup.name }}:
            </div>
            <div class="">
                <button
                        v-for="option in optionGroup.options"
                        :key="option.id"
                        :class="{ 'text-black bg-textBeige border-textBeige': isOptionSelected(option.id), }"
                        class="px-6 mx-1 rounded-full hover:bg-textBeige hover:border-textBeige hover:text-black transition-all border-2 border-buttonBeige"
                        @click="handleChange(optionGroup.name, option.id, onHandleChange)"
                >
                    {{ option.name }}
                </button>
            </div>
        </div>
    </div>
</template>
