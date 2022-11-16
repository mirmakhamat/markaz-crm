<template>
  <header class="header">
    <div class="header__left">
      <div class="header__name">
        Welcome, <span>Alexa A.</span>
      </div>
      <div class="header__date">
        Tue, 07 June 2022
      </div>
    </div>
    <el-input v-model="search" size="large" placeholder="Type something" class="header__search">
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </el-input>
    <div class="header__right">
      <el-button size="large" circle>
        <el-icon><BellFilled /></el-icon>
      </el-button>
      <el-avatar shape="square" :size="40"/>
    </div>
  </header>
</template>

<script>
export default {
  data(){
    return {
      search: ''
    }
  }
}
</script>

<style lang="scss">
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  &__right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  &__search{
    max-width: 354px;
  }
  &__name {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    color: #3E435D;
    margin-bottom: 15px;
  }
  &__date {
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #ADA7A7;
  }
}
</style>