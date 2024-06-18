<script setup lang="ts">
import ProjectsList from "@/components/ProjectsList.vue";
import { onMounted, ref, watch } from "vue";
import { useProjectsListStore } from "@/stores/projectsList";
import { ProjectApi } from "@/api/project/project.api";
import { useAuthStore } from "@/stores/auth";
import { useSortStore } from "@/stores/sort";
import { useFilterStore } from "@/stores/filter";


const { currentUser } = useAuthStore()
const { loadProjectsList } = useProjectsListStore()
const { sort } = useSortStore()
const { searchQuery, projectsFilters } = useFilterStore()

const bookmarks = ref()

onMounted(async () => {
    bookmarks.value = await ProjectApi.getBookmarks(currentUser.id)

    await loadProjectsList(projectsFilters, null, bookmarks.value, searchQuery.value, sort)
})

watch([projectsFilters, sort], async () => {
    await loadProjectsList(projectsFilters, null, bookmarks.value, searchQuery.value, sort)
})
</script>

<template>
    <v-container class="mt-5">
        <div class="text-center">
            <h1>Список закладок</h1>
        </div>

        <ProjectsList/>

    </v-container>
</template>

<style scoped>

</style>