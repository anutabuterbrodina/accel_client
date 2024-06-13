<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import { useProjectStore } from "@/stores/project";
import { useFilterStore } from "@/stores/filter";

defineProps({
    action: String
})

const { project } = useProjectStore()
const { tags, investments } = useFilterStore()

const valid = ref(false)

const nameRules = [
    v => !!v || 'Project name is required',
    v => v.length <= 40 || 'Name must be less than 40 characters',
]
const descRules = [
    v => v.length <= 400 || 'Project description must be less than 400 characters',
]
const rangeRules = [
    v => project.investmentMin && v > project.investmentMin || 'Min cant be more than max'
]

const bp = ref()
</script>

<template>
    <v-form v-model="valid" class="w-100" @submit.prevent="$emit('handleForm')" >
        <v-container>
            <div style="width: 700px;">
                <div v-show="action === 'editCommonData' || action === 'create'">
                    <v-text-field
                        v-model="project.name"
                        :counter="40"
                        :rules="nameRules"
                        label="Название проекта"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="project.description"
                        :counter="400"
                        :rules="descRules"
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
                        :items="tags"
                        label="Категории"
                        chips
                        flat
                        multiple
                    ></v-select>

                    <div style="display: flex">
                        <v-select
                            v-model="project.investmentMin"
                            :items="investments"
                            label="Мин. размер инвестиций"
                        ></v-select>
                        <v-select
                            v-model="project.investmentMax"
                            :items="investments"
                            :rules="rangeRules"
                            label="Макс. размер инвестиций"
                        ></v-select>
                    </div>

                    <v-file-input
                        label="Бизнес-план"
                        v-model="bp"
                        accept="pdf"
                    ></v-file-input>
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