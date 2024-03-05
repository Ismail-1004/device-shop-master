<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(['update', 'delete'])

defineProps({
  product: {
    type: Object,
    required: true,
    default: {},
  },
});
</script>

<template>
  <el-card shadow="hover" style="width: 280px" class="card">
    <h2 class="card__title">{{ product.model }}</h2>
    <span class="card__price"> {{ product.price }}$ </span>
    <div class="card__btn">
      <el-button type="success" @click="emit('update', { product, id: product.id })">Update</el-button>
      <el-button type="danger" @click="emit('delete', product.id)">Delete</el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  &__title {
    font-size: 20px;
  }

  &__price {
    font-weight: 700;
    margin: 20px 0;
    display: inline-block;
  }
}
</style>