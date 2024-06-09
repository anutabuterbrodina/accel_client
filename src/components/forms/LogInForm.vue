<script setup lang="ts">
import { ref } from "vue";
import { useModalStore } from "@/stores/modal";

const email = ref()
const password = ref()

const valid = ref(false)

const emailRules = [
    // (v: string) => v.match('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')
    (v: string) => /.+@.+\..+/.test(v) || 'Введите корректный Email'
]

const { setVisibility } = useModalStore()

const submit = (ev) => {
    setVisibility(false)
    console.log('Logged in')
}
</script>

<template>
    <v-form v-model="valid" @submit.prevent="submit" class="w-50 mt-5" >
        <v-container>

            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                hide-details
                required
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="Password"
                hide-details
                type="password"
                required
            ></v-text-field>

            <v-btn
                class="text-none mt-4 w-100"
                color="grey-darken-1"
                size="x-large"
                variant="flat"
                type="submit"
            >
                Вход
            </v-btn>

        </v-container>
    </v-form>
</template>

<style scoped>

</style>