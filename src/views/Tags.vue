<template>
  <div class="container">
    <main-header @changeSearch="changeSearch"  />
    <main-tags />
  </div>
</template>

<script lang="ts">
import mainHeader from './components/main-header.vue'
import mainTags from './components/main-tags.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    mainHeader,
    mainTags
  },
  setup () {
    const router = useRouter()

    const changeSearch = (val: string) => {
      router.replace({
        path: '/home',
        query: {
          txt: val
        }
      })
    }
    return {
      changeSearch
    }
  }
}
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    min-height: 100vh;
    background-color: #F7F9FA;
  }
</style>
