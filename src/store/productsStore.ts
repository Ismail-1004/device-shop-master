import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useProductsStore = defineStore('productsStore', () => {
    const model = ref('')
    const currentPage = ref<number | undefined>(1)
    const loader = ref(false)

    const products = reactive({
        list: [],
        totalProducts: 0
    })

    const getProducts = async ({ page, category, model }: { page?: number, category?: string, model?: string } = {}) => {
        try {
            loader.value = true
            let url = `https://device-shop-master.onrender.com/products?_limit=10`;

            if (page) {
                url += `&_page=${page}`;
            }

            if (category) {
                url += `&category=${category}`;
            }

            if (model) {
                url += `&q=${model}`;
            }

            const response = await fetch(url)
            const data = await response.json()
            loader.value = false

            products.list = data
            products.totalProducts = Number(response.headers.get('X-Total-Count'))
            currentPage.value = page
        } catch (e) {
            throw e
        }
    }

    const createProduct = async ({ product, page }: {  product: any, page?: number} ) => {
        try {
            console.log(product)
            loader.value = true
            let url = `https://device-shop-master.onrender.com/products`

            if (page) {
                url += `&_page=${page}`;
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            })
            await response.json()
            await getProducts()
            loader.value = false
        } catch (e) {
            throw e
        }
    }

    const updateProduct = async (product: any) => {
        try {
            loader.value = true
            const response = await fetch(`https://device-shop-master.onrender.com/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            })
            await response.json()
            await getProducts()

            loader.value = false
        } catch (e) {
            throw e
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            loader.value = true
            const response = await fetch(`https://device-shop-master.onrender.com/products/${id}`, {
                method: "DELETE"
            })
            await response.json()
            await getProducts()
            loader.value = false
        } catch (e) {
            throw e
        }
    }

    return { products, getProducts, model, currentPage, createProduct, deleteProduct, updateProduct, loader }
})