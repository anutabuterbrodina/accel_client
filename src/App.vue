<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "./components/UI/Navbar.vue";
</script>

<template>
    <v-app style="position: relative">
        <Navbar/>
<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->
        <v-main>
            <RouterView />
        </v-main>
    </v-app>
</template>

<style scoped>

</style>
