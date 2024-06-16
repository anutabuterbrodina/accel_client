<script setup lang="ts">
import RightInfoPanel from "@/components/UI/RightInfoPanel.vue";
import { defineProps, PropType, } from "vue";
import { User } from "@/core/entities/user/user";
import { useModalStore } from "@/stores/modal";
import { Investor } from "@/core/entities/investor/investor";

defineProps({
    investor: Object as PropType<Investor>,
    members: Array as PropType<User[]>,
    isEditable: Boolean,
})

const { setVisibility } = useModalStore()

</script>

<template>
    <div style="display: flex">
        <div style="width: 100%">
            <div style="display: flex">
                <div style="width: 100%">
                    <h1>{{ investor.name }}</h1>
                </div>

                <v-btn color="primary" v-if="isEditable">
                    Редактировать
                    <v-menu activator="parent">
                        <v-list class="flex-column" style="display: flex !important">
                            <div @click="() => { setVisibility(true); $emit('update', 'editCommonData') }">
                                Редактирвоать описание
                            </div>
                            <div @click="() => { setVisibility(true); $emit('update', 'editBusinessData') }">
                                Редактирвоать данные
                            </div>
                        </v-list>
                    </v-menu>
                </v-btn>
            </div>

            <div class="ProjectDetails__body">
                <h2>Описание инвестора</h2>
                <p>{{ investor.description }}</p>
            </div>

            <div>
                <button>БП</button>
            </div>
        </div>

        <RightInfoPanel>
            <div class="RightInfoPanel__author">
                <h2>Контакты</h2>
                <div v-for="member in members">
                    {{ member.name }}
                    {{ member.email }}
                </div>
            </div>
            <div>
                <v-chip
                    v-for="tag in investor.tags"
                    class="ma-2"
                    color="pink"
                    label
                    text-color="white"
                >
                    <v-icon start icon="mdi-label"></v-icon>
                    {{ tag }}
                </v-chip>
            </div>
        </RightInfoPanel>
    </div>
</template>

<style scoped>
.ProjectDetails {
    display: flex;
    width: 100%;
}
.ProjectDetails__content {
    width: 100%;
    padding: 15px 25px;
}
.ProjectDetails__header {
    display: flex;
}
.ProjectDetails__title {
    width: 100%;
}
.ProjectDetails__body {
}
.ProjectDetails__reductButton {
    display: flex;
    background-color: darkgrey;
    width: 100px;
    height: 40px;
    border-radius: 5px;
}
</style>