<script setup lang="ts">
</script>

<template>
    <v-container>
        <v-row class="align-center justify-center mt-15">
            <v-col>
                <router-link :to="{ name: 'projects' }">
                    <v-card class="py-5">
                        <v-card-title class="text-center">ПРОЕКТЫ</v-card-title>
                    </v-card>
                </router-link>
            </v-col>
            <v-col>
                <router-link :to="{ name: 'investors' }">
                    <v-card class="py-5">
                        <v-card-title class="text-center">ИНВЕСТОРЫ</v-card-title>
                    </v-card>
                </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>
