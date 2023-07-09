<script setup lang="ts">
const { notifications, removeOne } = useNotifications();
</script>

<template>
    <div data-testid="notification-container" class="fixed inset-x-0 mx-auto w-fit bottom-5 z-50 max-h-fit">
        <div v-for="notification in notifications" class="border-2 bg-almostBlack text-white font-serif px-3 py-1 my-1">
            {{ notification.message }}
        </div>
    </div>
</template>