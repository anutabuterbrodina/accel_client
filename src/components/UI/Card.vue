<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Project } from "@/core/entities/project";
import { Investor } from "@/core/entities/investor/investor";

defineProps({
    item: Object as PropType<Project | Investor>,
})

</script>

<template>
    <slot :id=item.id></slot>
</template>

<style scoped>

</style>