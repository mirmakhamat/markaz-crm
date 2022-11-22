<template>
  <el-container>
    <el-aside><NavBar/></el-aside>
    <el-main>
      <HeaderItem/>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import HeaderItem from './components/HeaderItem.vue';
import NavBar from './components/NavBar.vue';

export default {
  components: { NavBar, HeaderItem },
  mounted(){
    let loading = this.$loading({lock: true})
    this.$store.dispatch('getWorkers')
    this.$store.dispatch('getDirections')
    this.$store.dispatch('getGroups')
    this.$store.dispatch('getPupils')
    this.$store.dispatch('getSpendings')
    this.$store.dispatch('getPayments')
    loading.close()
  }
}
</script>

<style lang="scss">
@import '@/styles/app.scss';
</style>
