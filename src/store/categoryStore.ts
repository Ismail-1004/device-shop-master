import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('categoryStore', () => {
    const categories = ref([])
    const filterValue = ref('')

    const getAllCategories = async () => {
        try {
            const response = await fetch('https://device-shop-master.onrender.com/category')
            const data = await response.json()

            categories.value = data
        } catch (e) {
            throw e
        }
    }

    return { categories, getAllCategories }
})