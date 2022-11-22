<template>
  <header class="header">
    <div class="header__left">
      <div class="header__name">
        Welcome, <span>Admin</span>
      </div>
      <div class="header__date">
        {{ date }}
      </div>
    </div>
    <el-input v-model="search" size="large" placeholder="Biror nima yozing..." class="header__search">
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </el-input>
    <div class="header__right">
      <el-switch
        v-model="toggle"
        inline-prompt
        active-icon="Sunny"
        inactive-icon="Moon"
        style="--el-switch-on-color: #fff; --el-switch-off-color: #000;"
        @change="switchtheme"
      />
      <el-button size="large" circle @click="jinnilik">
        <el-icon><BellFilled /></el-icon>
      </el-button>
      <el-dropdown size="large">
        <el-avatar shape="square" :size="40" :src="require('@/assets/img/img_avatar.png')"/>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="jinnilik">
              <el-icon><Setting/></el-icon>
              Sozlamalar
            </el-dropdown-item>
            <el-dropdown-item divided @click="jinnilik">
              <el-icon><SwitchButton /></el-icon>
              Chiqish
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  data(){
    return {
      search: '',
      toggle: false
    }
  },
  computed: {
    date(){
      let date = new Date()
      return `${this.$store.getters.weeks[date.getDay() - 1]}, ${date.getDate()}-${this.$store.getters.months[date.getMonth()]} ${date.getFullYear()}`
    }
  },
  methods: {
    jinnilik(){
      this.$confirm('Nimadir Bo`lishi keremidi))', 'Xa-xa-xa', {
        confirmButtonText: 'Ha',
        cancelButtonText: 'Bilmadm'
      })
    },
    switchtheme(){
      if (this.toggle)
        document.documentElement.classList.add('dark')
      else 
        document.documentElement.classList.remove('dark')
        this.$cookies.set('theme', this.toggle?'dark':'light')
    }
  },
  mounted() {
    if(this.$cookies.isKey('theme')){
      this.toggle = this.$cookies.get('theme') == 'dark'
      this.switchtheme()
    }
  },
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
