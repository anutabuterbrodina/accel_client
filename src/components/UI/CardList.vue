<script setup lang="ts">
import Card from "./Card.vue";
import { defineProps, PropType } from "vue";
import { Project } from "@/core/entities/project";
import { Investor } from "@/core/entities/investor/investor";

defineProps({
    list: Array as PropType<Project[] | Investor[]>
})

</script>

<template>
    <div>
        <Card
            v-for="item in list"
            :key="item.id"
            :item="item"
            v-slot="{ id }"
        >
            <slot :id="id"></slot>
        </Card>
    </div>
</template>

<style scoped>

</style>