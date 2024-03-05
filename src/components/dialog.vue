<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch, computed } from "vue";

const emit = defineEmits(['create', 'update:dialogVisible'])

const props = defineProps({
  dialogVisible: Boolean,
  isNewProduct: Boolean,
  product: Object,
  categories: Array,
});

const localDialogVisable = ref<boolean>(false)

const form = ref({
  model: '',
  releaseYear: '',
  category: [],
  price: 0,
  description: '',
  addedDate: new Date().toISOString(),
  isVisible: false
});

const resetForm = () => {
  form.value = {
    model: '',
    releaseYear: '',
    category: '',
    price: 0,
    description: '',
    addedDate: new Date().toISOString(),
    isVisible: false
  };
};

watch(() => props.dialogVisible, (newValue: boolean) => {
  localDialogVisable.value = newValue;
});

watch(() => props.product, (newValue: any) => {
  Object.assign(form.value, newValue);
});

const handleClose = () => {
  localDialogVisable.value = false;
  emit('update:dialogVisible', false);
  resetForm()
};

const handleSubmit = () => {
  props.isNewProduct ? emit('create', form.value) : emit('update', form.value)
  emit('update:dialogVisible', false);
  resetForm()
};
</script>

<template>
  <el-dialog
    v-model="localDialogVisable"
    :title="isNewProduct ? 'Create Product' : 'Update Product'"
    width="500"
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item>
        <el-input v-model="form.model" placeholder="Model" clearable />
      </el-form-item>
      <el-form-item label="Release Year" prop="releaseYear">
        <el-date-picker
          v-model="form.releaseYear"
          type="year"
          placeholder="Select release year"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Category" prop="category">
        <el-select
          v-model="form.category"
          placeholder="Select a category"
          clearable
        >
          <el-option
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Recommended retail price" prop="price">
        <el-input-number
          v-model="form.price"
          :min="0"
          placeholder="Enter price"
          clearable
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Product description" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="Enter a description"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Дата добавления товара">
        <el-date-picker
          v-model="form.addedDate"
          type="date"
          placeholder="Выберите дату"
          clearable
          :disabled="true"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Видимость товара" prop="isVisible">
        <el-checkbox v-model="form.isVisible"
          >Видимый для пользователей магазина</el-checkbox
        >
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>