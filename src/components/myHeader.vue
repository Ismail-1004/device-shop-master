<template>
    <header class="header">
        <nav class="header__nav container">
            <router-link to="/" class="header__nav-logo"> DSM </router-link>
            <el-button type="primary" plain> Выйти </el-button>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header {
    padding: 20px 0;
    border-bottom: 1px solid black;
    &__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-logo {
            font-size: 25px;
            color: black;
        }
    }
}
</style>