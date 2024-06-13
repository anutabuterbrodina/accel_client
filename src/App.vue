<script setup lang="ts">
import Navbar from "./components/UI/Navbar.vue";
</script>

<template>
    <v-app>
        <Navbar/>

        <v-main>
            <RouterView />
        </v-main>
    </v-app>
</template>

<style scoped>

</style>
