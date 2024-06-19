<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { limitRule, requiredRule } from "@/components/forms/validators";
import { Constants } from "@/core/static/constants";
import { useRequestStore } from "@/stores/request";
import { useModalStore } from "@/stores/modal";

const { request } = useRequestStore()
const { setVisibility } = useModalStore()
const emit = defineEmits(['reject'])

defineProps({
    action: String,
})

const isValid = ref(false)

const submitForm = () => {
    if (!isValid.value) {
        alert('Введите корректные данные')
        return
    }
    setVisibility(false)
    emit('reject')
}
</script>

<template>
    <v-form v-model="isValid" class="w-100" @submit.prevent="submitForm" >
        <v-container>
            <div style="width: 700px;">
                <v-select
                    v-model="request.rejectReason"
                    :items="Constants.getRequestRejectReasonsNames()"
                    :rules="[requiredRule]"
                    label="Причина отказа"
                    chips
                    flat
                ></v-select>

                <v-textarea
                    v-model="request.rejectMessage"
                    :counter="150"
                    :rules="[requiredRule, (v) => limitRule(v, 150)]"
                    label="Объяснение отказа"
                    no-resize
                    rows="10"
                    row-height="15"
                    required
                    clearable
                    clear-icon="mdi-close-circle"
                ></v-textarea>
            </div>
        </v-container>

        <v-btn
            class="text-none mt-4 w-100"
            color="grey-darken-1"
            size="x-large"
            variant="flat"
            type="submit"
        >
            Подтвердить
        </v-btn>
    </v-form>
</template>

<style scoped>

</style>