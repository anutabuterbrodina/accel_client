<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { useProjectStore } from "@/stores/project";
import { limitRule, requiredRule, notEmptyRule } from "@/components/forms/validators";
import { Constants } from "@/core/static/constants";

const { project } = useProjectStore()
const emit = defineEmits(['formAction'])

defineProps({
    action: String,
})

const isValid = ref(false)
const rangeMaxRule =  (v: string) => v > project.investmentMin || 'Макс. значение должно быть больше мин.'
const comment = ref('')
const bp = ref()

const submitForm = () => {
    if (!isValid.value) {
        alert('Введите корректные данные')
        return
    }
    emit('formAction')
}
</script>

<template>
    <v-form v-model="isValid" class="w-100" @submit.prevent="submitForm" >
        <v-container>
            <div style="width: 700px;">
                <div v-show="action === 'editCommonData' || action === 'create'">
                    <v-text-field
                        v-model="project.name"
                        :counter="40"
                        :rules="[requiredRule, (v) => limitRule(v, 40)]"
                        label="Название проекта"
                        required
                    ></v-text-field>

                    <v-textarea
                        v-model="project.description"
                        :counter="400"
                        :rules="[requiredRule, (v) => limitRule(v, 400)]"
                        label="Описание проекта"
                        no-resize
                        rows="10"
                        row-height="15"
                        required
                        clearable
                        clear-icon="mdi-close-circle"
                    ></v-textarea>
                </div>

                <div v-show="action === 'editBusinessData' || action === 'create'">
                    <v-select
                        clearable
                        v-model="project.tags"
                        :items="Constants.getTagsNames()"
                        :rules="[notEmptyRule]"
                        label="Категории"
                        chips
                        flat
                        multiple
                    ></v-select>

                    <div style="display: flex">
                        <v-select
                            v-model="project.investmentMin"
                            :items="Constants.getInvestmentsValues()"
                            :rules="[notEmptyRule]"
                            label="Мин. размер инвестиций"
                        ></v-select>
                        <v-select
                            v-model="project.investmentMax"
                            :items="Constants.getInvestmentsValues()"
                            :rules="[ rangeMaxRule, notEmptyRule]"
                            label="Макс. размер инвестиций"
                        ></v-select>
                    </div>

                    <v-file-input
                        label="Бизнес-план"
                        accept="pdf"
                        v-model="bp"
                    ></v-file-input>
                </div>
                <div v-if="action === 'create'">
                    <v-textarea
                        v-model="comment"
                        label="Комментарий"
                        no-resize
                        rows="2"
                        row-height="15"
                        required
                        clearable
                        clear-icon="mdi-close-circle"
                    ></v-textarea>
                </div>
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