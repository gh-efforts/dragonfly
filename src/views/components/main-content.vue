<template>
  <main class="main-content">
    <div class="overview">{{state.list.length > 0 ? 1 : 0}} - {{state.list.length}} of {{state.total}} available images.</div>
    <div class="list" ref="domList">
      <router-link class="item" v-for="(item,key) of state.list" :key="key" :to="{name: 'tags', params: {id: item.id}}">
        <div>
          <img class="images-img" :src="item.logo_url || require('@/assets/docker.png')" />
        </div>
        <div class="ellipsis images-title">{{ item.imageName }}</div>
        <div class="ellipsis images-title">{{ item.short_description }}</div>
      </router-link>
      <div v-if="state.list.length == 0 && !state.loading">
        <div class="nomore">
          <img class="images-img" src="@/assets/svg/nomore.svg" />
          <p>No More</p>
        </div>
      </div>
      <div class="spin-box">
        <a-spin v-if="state.loading" size='large'></a-spin>
      </div>
    </div>
  </main>
</template>

<script scoped lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref, watch, nextTick } from 'vue'
import { getList } from '@/api/request'
import { Spin as aSpin } from 'ant-design-vue'
import { useRoute } from 'vue-router'

export default {
  components: {
    aSpin
  },
  props: {
    searchTxt: String
  },
  setup (props: any) {
    const route = useRoute()

    const state: any = reactive({
      list: [],
      total: 0,
      limit: 10,
      page: 1,
      loading: true
    })
    const domList = ref()

    const getImageList = () => {
      state.loading = true
      const { limit, page } = state
      const { searchTxt } = props
      const params = {
        limit,
        page,
        searchTxt: searchTxt.trim()
      }
      getList(params).then(async (res: any) => {
        state.list = [...state.list, ...(res.list || res.rows)]
        state.total = res.count
        state.loading = false
        await nextTick()
        if (domList.value.scrollHeight === domList.value.clientHeight) {
          // 内容未满，尝试触发下拉
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          handleScroll()
        }
      })
    }

    const mountFn = () => {
      if (!route.query.txt) {
        getImageList()
      }
    }
    onMounted(mountFn)

    watch(
      () => props.searchTxt,
      (newTxt, oldTxt) => {
        if (newTxt.trim() === oldTxt.trim()) {
          return false
        }
        state.list = []
        state.page = 1
        getImageList()
      }
    )

    const handleScroll = () => {
      if (domList.value.scrollTop + domList.value.clientHeight >= domList.value.scrollHeight - 10) {
        if (state.list.length >= state.total || state.loading) {
          return false
        }
        state.page++
        getImageList()
      }
    }
    onMounted(() => {
      domList.value.addEventListener('scroll', handleScroll)
    })
    onBeforeUnmount(() => {
      domList.value.removeEventListener('scroll', handleScroll)
    })

    return {
      state,
      domList
    }
  }
}
</script>

<style scoped lang="less">
.main-content {
  width: 1260px;
  margin: 0 auto;
  box-sizing: border-box;
  height: calc(100vh - 64px);
  .overview {
    color: #707a81;
    height: 85px;
    font-size: 14px;
    line-height: 16px;
    padding: 45px 0 24px;
    box-sizing: border-box;
  }
  .list {
    height: calc(100% - 95px);
    overflow-x: hidden;
    overflow-y: auto;
    .item {
      width: 100%;
      height: 108px;
      background: #ffffff;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      box-sizing: border-box;
      padding: 24px 32px;
      display: grid;
      grid-template-columns: 95px 200px 1fr;
      grid-column-gap: 10px;
      align-items: center;
      color: #252c33;
      margin-bottom: 10px;
      border: 1px solid #E2E4E6;
      cursor: pointer;;
      transition: 200ms all linear;
      &:hover{
        border: 1px solid transparent;
      }
      .images-img {
        height: 60px;
        width: 60px;
        object-fit: contain;
      }
      .images-title {
        font-size: 16px;
      }
    }
  }
  .spin-box{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
  @media screen and (max-width: 768px) {
    .main-content {
      width: 100vw;
      .overview {
        padding-left: 10px;
      }
      .list{
        .item{
          padding: 10px 20px;
          grid-template-columns: 95px 1fr;
          &>div:nth-last-of-type(1){
            display: none;
          }
        }
      }
    }
  }
</style>
