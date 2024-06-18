<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    item: Object,
})

</script>

<template>
    <slot :id=item.id></slot>
</template>

<style scoped>

</style>