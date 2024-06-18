<script setup lang="ts">
import { onMounted, ref, toRaw, } from "vue";
import { User } from "@/core/entities/user/user";
import { useRoute } from "vue-router";
import { UserApi } from "@/api/user/user.api";
import { useInvestorStore } from "@/stores/investor";
import { Constants } from "@/core/static/constants";


const { investor, loadInvestor } = useInvestorStore()
const route = useRoute()
const members = ref<User[]>([])

onMounted(async () => {
    await loadInvestor(<string> route.params.investorId)
    members.value = await UserApi.getList( toRaw(investor.members) || [] )
})

</script>

<template>
    <v-row class="mt-3">
        <v-col cols="8">
            <v-card>
                <v-card-title>
                    {{ investor.name }}
                </v-card-title>

                <v-card-text>
                    {{ investor.description }}
                </v-card-text>

                <v-card-title>Категории:</v-card-title>
                <v-chip
                    v-for="tag in investor.interests"
                    class="ma-2"
                    color="pink"
                    label
                    text-color="white"
                    size="x-small"
                >
                    <v-icon start icon="mdi-label"></v-icon>
                    {{ tag }}
                </v-chip>

                <v-divider/>

                <v-card-title>Тип инвестора:</v-card-title>
                <v-card-text>
                    {{ Constants.getInvestorTypeNameByValue(investor.type) }}
                </v-card-text>

                <v-divider/>

                <v-card-title>Реквизиты:</v-card-title>
                <v-row>
                    <v-col cols="4">
                        <v-card-subtitle>Юр. название</v-card-subtitle>
                    </v-col>
                    <v-col>
                        <v-card-subtitle>{{ investor.requisites.legalName }}</v-card-subtitle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-card-subtitle>Юр. адрес</v-card-subtitle>
                    </v-col>
                    <v-col>
                        <v-card-subtitle>{{ investor.requisites.address }}</v-card-subtitle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-card-subtitle>ИНН</v-card-subtitle>
                    </v-col>
                    <v-col>
                        <v-card-subtitle>{{ investor.requisites.INN }}</v-card-subtitle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-card-subtitle>ОГРН</v-card-subtitle>
                    </v-col>
                    <v-col>
                        <v-card-subtitle>{{ investor.requisites.OGRN }}</v-card-subtitle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-card-subtitle>КПП</v-card-subtitle>
                    </v-col>
                    <v-col>
                        <v-card-subtitle>{{ investor.requisites.KPP }}</v-card-subtitle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-card-subtitle>ОКПО</v-card-subtitle>
                    </v-col>
                    <v-col>
                        <v-card-subtitle>{{ investor.requisites.OKPO }}</v-card-subtitle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-card-subtitle>БИК</v-card-subtitle>
                    </v-col>
                    <v-col>
                        <v-card-subtitle>{{ investor.requisites.BIK }}</v-card-subtitle>
                    </v-col>
                </v-row>

            </v-card>

        </v-col>

        <v-col>
            <v-card>
                <v-card-item v-for="member in members">
                    <v-card-title>{{ member.name }} {{ member.surname }}</v-card-title>
                    <v-card-subtitle>Email: {{ member.email }}</v-card-subtitle>
                    <v-card-subtitle>Телефон: {{ member.phone }}</v-card-subtitle>
                </v-card-item>

                <!--                <v-card-actions>-->
                <!--                    -->
                <!--                </v-card-actions>-->
            </v-card>
        </v-col>
    </v-row>

</template>

<style scoped>

</style>