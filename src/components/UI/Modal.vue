<script setup lang="ts">
import { useModalStore } from "@/stores/modal";

const { setVisibility, isShown } = useModalStore()

</script>

<template>
    <v-overlay v-model="isShown" @click="setVisibility(false)" class="align-center justify-center">
        <div class="Modal__content" @click.stop>
            <slot>

            </slot>
        </div>
    </v-overlay>

</template>

<style scoped>
.Modal__content {
    background: #414141;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 600px;
}
</style>