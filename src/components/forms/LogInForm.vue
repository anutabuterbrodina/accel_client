<script setup lang="ts">
import { defineEmits, reactive, ref } from "vue";
import { emailRule, requiredRule } from "@/components/forms/validators";

const emit = defineEmits(['login'])

const isValid = ref(false)
const credentials = reactive({ email: '', password: '' })

const submitForm = () => {
    if (!isValid.value) {
        alert('Введите корректные данные')
        return
    }

    emit('login', credentials.email, credentials.password)
}

</script>

<template>
    <v-form v-model="isValid" @submit.prevent="submitForm" class="w-50 mt-5" >
        <v-container>

            <v-text-field
                v-model="credentials.email"
                :rules="[emailRule]"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="credentials.password"
                :rules="[requiredRule]"
                label="Password"
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