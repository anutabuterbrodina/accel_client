<script setup lang="ts">
import Card from "./Card.vue";
import { defineProps } from "vue";

const props = defineProps({
    list: Array
})
</script>

<template>
    <div>
        <div v-if="list.length === 0">
            <h3>По данным критериям ничего не найдено</h3>
        </div>

        <Card
            v-else
            v-for="item in list"
            :key="item.id"
            :item="item"
            v-slot="{ id }"
        >

            <slot
                :id="id"
            ></slot>
        </Card>
    </div>
</template>

<style scoped>

</style>