<script setup lang="ts">
import { defineModel } from "vue";

const inputValue = defineModel()

</script>

<template>
    <input v-model="inputValue"/>
</template>

<style scoped>

</style>