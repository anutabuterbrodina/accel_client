<script setup lang="ts">
import { useRequestStore } from "@/stores/request";
import { useAuthStore } from "@/stores/auth";
import { onMounted, watch } from "vue";
import { useFilterStore } from "@/stores/filter";

const { request,  } = useRequestStore()
const { userId } = useAuthStore()

onMounted(async () => {
    // loadRequestsList(getRequestFilter(), userId.value)
})


</script>

<template>
    <v-container>
        <RequestDetails/>
    </v-container>
</template>

<style scoped>

</style>