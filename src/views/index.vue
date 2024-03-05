<script lang="ts" setup>
import { onMounted, ref, watch, reactive } from "vue";
import { useProductsStore } from "../store/productsStore";
import { useCategoryStore } from "../store/categoryStore";
import { useModelStore } from "../store/modelStore";
import Card from "../components/card.vue";
import Dialog from "../components/dialog.vue";
import Loader from "../components/loader.vue";
import { debounce } from "lodash";

const productsStore = useProductsStore();
const categoryStore = useCategoryStore();

let currentPage = ref(0)

let dialogVisible = ref<boolean>(false);
let isNewProduct = ref<boolean>(true);
let selectedProduct = reactive({
  product: {},
  id: 0,
});

const openModal = () => {
  dialogVisible.value = true;
  isNewProduct.value = true;
};


const createHandler = async (product: any) => {
  await productsStore.createProduct({product, page: currentPage.value});
};

const updateHandler = async ({ product, id }: { product: any; id: number }) => {
  dialogVisible.value = true;
  isNewProduct.value = false;

  selectedProduct.product = product;
  selectedProduct.id = product.id;
};

const updateProduct = async (product: any) => {
  await productsStore.updateProduct(product);
};

const paginationHandler = async (page: number) => {
  currentPage.value = page
  await productsStore.getProducts({
    page,
    category: categoryStore.filterValue,
    model: productsStore.model,
  });
};

const handleDialogVisibleUpdate = (value: boolean) => {
  dialogVisible.value = value;
};

watch(
  () => categoryStore.filterValue,
  async (newValue: string) => {
    await productsStore.getProducts({
      category: newValue,
      page: productsStore.currentPage,
      model: productsStore.model,
    });
  }
);

watch(
  () => productsStore.model,
  debounce(async (newValue: string) => {
    await productsStore.getProducts({
      model: newValue,
      page: productsStore.currentPage,
      category: categoryStore.filterValue,
    });
  }, 1000)
);

onMounted(async () => {
  await productsStore.getProducts();
  await categoryStore.getAllCategories();
});
</script>

<template>
  <section class="products">
    <!-- Модальное окно -->
    <Dialog
      :dialogVisible="dialogVisible"
      :isNewProduct="isNewProduct"
      :categories="categoryStore.categories"
      @create="createHandler"
      @update="updateProduct"
      @update:dialogVisible="handleDialogVisibleUpdate"
      :product="selectedProduct.product"
    />
    <!-- раздел фильтрации -->
    <div class="products__filter">
      <el-input
        v-model="productsStore.model"
        style="width: 240px"
        placeholder="Search..."
      />
      <el-select
        v-model="categoryStore.filterValue"
        placeholder="Category"
        style="width: 240px; margin: 0 15px"
      >
        <el-option label="All Products" value="" />
        <el-option
          v-for="category in categoryStore.categories"
          :key="category"
          :label="category"
          :value="category"
        />
      </el-select>
      <el-button type="primary" @click="openModal">Create Product</el-button>
    </div>
    <!-- Продукты -->
    <div class="products__content">
      <Loader class="products__content-loader" v-if="productsStore.loader" />
      <div
        class="products__content-wrapper"
        v-if="productsStore.products.list.length"
      >
        <Card
          v-for="product in productsStore.products.list"
          :key="product.id"
          :product="product"
          @delete="productsStore.deleteProduct"
          @update="updateHandler"
        />
      </div>
      <p v-else-if="categoryStore.filterValue && productsStore.model">
        Product in the category of <b> {{ categoryStore.filterValue }} </b> with
        the <b> {{ productsStore.model }} </b> model was not found
      </p>
      <p v-else>Product not found</p>
    </div>
    <!-- Пагинация -->
    <el-pagination
      v-if="productsStore.products.totalProducts > 10"
      class="products__pagination"
      background
      layout="prev, pager, next"
      :total="productsStore.products.totalProducts"
      :current-page="productsStore.currentPage"
      @update:current-page="(val) => (productsStore.currentPage = val)"
      @current-change="paginationHandler"
    />
  </section>
</template>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__filter {
    display: flex;
    justify-content: flex-end;
    padding: 0 25px;
  }
  &__content {
    margin: 30px 0;
    position: relative;
    &-wrapper {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
  &__pagination {
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>