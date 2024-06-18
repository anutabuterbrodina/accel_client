<script setup lang="ts">
import { useProjectStore } from "@/stores/project";
import { onMounted, ref, toRaw } from "vue";
import { UserApi } from "@/api/user/user.api";
import { User } from "@/core/entities/user/user";
import { useRoute } from "vue-router";


const { project, loadProject } = useProjectStore()
const route = useRoute()
const members = ref<User[]>([])
const contact = ref<User>()

onMounted(async () => {
    await loadProject(<string> route.params.projectId)
    contact.value = await UserApi.getSingle( toRaw(project.contactId) || '' )
    members.value = await UserApi.getList( toRaw(project.members) || [] )
})
</script>

<template>
    <v-row class="mt-3">
        <v-col cols="7">
            <v-card>
                <v-card-title>
                    {{ project.name }}
                </v-card-title>

                <v-card-text>
                    {{ project.description }}
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="5">
            <v-card class="mb-10">
                <v-card-title>Контакт:</v-card-title>
                <v-card-item>
                    <v-row>
                        <v-col cols="4"><v-card-subtitle>Email</v-card-subtitle></v-col>
                        <v-col><v-card-subtitle>{{ contact?.email || '' }}</v-card-subtitle></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"><v-card-subtitle>Телефон</v-card-subtitle></v-col>
                        <v-col><v-card-subtitle>{{ contact?.phone || '' }}</v-card-subtitle></v-col>
                    </v-row>
                </v-card-item>

                <v-card-title>Категории:</v-card-title>
                <v-chip
                    v-for="tag in project.tags"
                    class="ma-2"
                    color="pink"
                    label
                    text-color="white"
                    size="x-small"
                >
                    <v-icon start icon="mdi-label"></v-icon>
                    {{ tag }}
                </v-chip>

                <v-card-title>Размер инвестиций:</v-card-title>
                <v-card-item>
                    <v-card-subtitle>От {{ project.investmentMin }} руб.</v-card-subtitle>
                    <v-card-subtitle>До {{ project.investmentMax }} руб.</v-card-subtitle>
                </v-card-item>
            </v-card>


            <v-card>
                <v-card-title>Команда:</v-card-title>
                <v-card-text v-for="member in members">
                    {{ member.name }} {{ member.surname }}
                </v-card-text>

<!--                <v-card-actions>-->
<!--                    -->
<!--                </v-card-actions>-->
            </v-card>
        </v-col>

        <slot>

        </slot>

    </v-row>
</template>

<style scoped>

</style>