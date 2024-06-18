<script setup lang="ts">
import ProjectsList from "@/components/ProjectsList.vue";
import { onMounted, ref, watch } from "vue";
import { useProjectsListStore } from "@/stores/projectsList";
import { ProjectApi } from "@/api/project/project.api";
import { useAuthStore } from "@/stores/auth";
import { useSortStore } from "@/stores/sort";
import { useFilterStore } from "@/stores/filter";
import { useProjectStore } from "@/stores/project";


const { currentUser } = useAuthStore()
const { loadProjectsList } = useProjectsListStore()
const { isBookmark } = useProjectStore()
const { sort } = useSortStore()
const { searchQuery, projectsFilters } = useFilterStore()

const bookmarks = ref([])

onMounted(async () => {
    bookmarks.value = await ProjectApi.getBookmarks(currentUser.id)

    if (bookmarks.value.length === 0) {
        bookmarks.value = ['abd3994f-7c30-43b6-bb57-f25a5cfa436d']
    }

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