<template>
  <main class="main-content">
    <div class="main-header">
      <div>
        <div class="main-header-breadcrumb">
          <router-link to="/">Home</router-link>
          <a-divider type="vertical" />
          <router-link to="">{{state.imageName}}</router-link>
        </div>
      </div>
    </div>
    <div class="main-header">
      <div>
        <div class="images-names">
          <img class="images-img" :src="state.logo_url || require('@/assets/docker.png')" />
          <div class="ellipsis">
          {{state.imageName}}
          </div>
          <div class="ellipsis">
          {{state.short_description}}
          </div>
        </div>
      </div>
    </div>
    <div class="main-content-list">
      <div class="overview">{{state.list.length > 0 ? 1 : 0}} - {{state.list.length}} of {{state.total}} available tags.</div>
      <div class="list" ref="imageList">
        <div class="item" v-for="(item,key) of state.list" :key="key">
          <div class="images-synopsis ellipsis">
            <div class="ellipsis">{{item.tagName}}</div>
            <div>Tag</div>
          </div>
          <a-tooltip :align='{offset: [100, -30]}' overlayClassName='copy-txt' placement='bottomLeft' :destroyTooltipOnHide='true'>
            <template v-slot:title>
              <span>copy</span>
            </template>
            <div class="images-synopsis ellipsis copy-box" @click="copyText( (item.CarInfo || {}).data_id || (item.CarInfo || {}).pow_cid )">
              <div class="ellipsis">{{ (item.CarInfo || {}).data_id || (item.CarInfo || {}).pow_cid }}</div>
              <div>CID</div>
            </div>
          </a-tooltip>
          <div class="images-synopsis">
            <div>{{transPower( item.size || (item.CarInfo || {}).size )}}</div>
            <div>Size</div>
          </div>
        </div>
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
    </div>
  </main>
</template>

<script scoped lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref, nextTick } from 'vue'
import { getImagesTag } from '@/api/request'
import { copyToClipboard, transPower } from '@/utils/index'
import { Spin as aSpin, message, Divider as aDivider, Tooltip as aTooltip } from 'ant-design-vue'
import { useRoute } from 'vue-router'

export default {
  components: {
    aSpin,
    aDivider,
    aTooltip
  },
  setup () {
    const state: any = reactive({
      imageName: '',
      logo_url: '',
      short_description: '',
      list: [],
      total: 0,
      limit: 10,
      page: 1,
      loading: false
    })
    const imageList = ref()
    const route = useRoute()

    const getImageList = () => {
      state.loading = true
      const { limit, page } = state
      const params = {
        limit,
        page,
        id: route.params.id
      }
      getImagesTag(params).then(async (res: any) => {
        const { imageinfo, tag } = res.data
        console.log(res)
        state.imageName = imageinfo.imageName
        state.logo_url = imageinfo.logo_url
        state.short_description = imageinfo.short_description
        state.list = [...state.list, ...tag]
        state.total = res.count
        state.loading = false
        await nextTick()
        if (imageList.value.scrollHeight === imageList.value.clientHeight) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          handleScroll()
        }
      })
    }

    const mountFn = () => {
      getImageList()
    }
    onMounted(mountFn)

    const handleScroll = () => {
      if (imageList.value.scrollTop + imageList.value.clientHeight >= imageList.value.scrollHeight - 10) {
        if (state.list.length >= state.total || state.loading) {
          return false
        }
        state.page++
        getImageList()
      }
    }
    onMounted(() => {
      imageList.value.addEventListener('scroll', handleScroll)
    })
    onBeforeUnmount(() => {
      imageList.value.removeEventListener('scroll', handleScroll)
    })

    const copyText = (text: string) => {
      copyToClipboard(text).then(() => {
        message.success('Copy successfully', 2)
      }).catch(() => {
        message.error('Copy failed', 2)
      })
    }
    return {
      state,
      imageList,
      copyText,
      transPower
    }
  }
}
</script>

<style scoped lang="less">
.main-content {
  box-sizing: border-box;
  height: calc(100vh - 64px);
  .main-header{
    background-color: #ffffff;
    &:nth-of-type(1){
      border-bottom: 1px #E2E4E6 solid;
    }
    &>div{
      width: 1260px;
      margin: 0 auto;
    }
    .main-header-breadcrumb{
      height: 48px;
      padding: 16px 0;
      font-size: 14px;
      .ant-divider{
        background: #E2E4E6;
        margin: 0 16px;
      }
      a{
        color: #707A81;
      }
      a:nth-last-of-type(1){
        color: #00A5C9;
      }
    }
    .images-names{
      padding: 48px 0;
      font-size: 16px;
      color: #252C33;
      display: grid;
      grid-template-columns: 80px 200px 1fr;
      grid-column-gap: 20px;
      align-items: center;
      .images-img {
        height: 80px;
        width: 80px;
        object-fit: contain;
      }
    }
  }
  .main-content-list{
    width: 1260px;
    margin: 0 auto;
  }
  .overview {
    color: #707a81;
    height: 56px;
    font-size: 14px;
    line-height: 16px;
    padding: 20px 0;
    box-sizing: border-box;
  }
  .list {
    height: calc(100vh - 350px);
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
      grid-template-columns: 150px 1fr 200px;
      grid-column-gap: 10px;
      align-items: center;
      color: #252C33;
      margin-bottom: 10px;
      border: 1px solid #E2E4E6;
      transition: 200ms all linear;
      &:hover{
        border: 1px solid transparent;
      }
      .images-synopsis {
        text-align: left;
        & > div:nth-of-type(1) {
          font-size: 18px;
          line-height: 24px;
          margin-bottom: 5px;
        }
        & > div:nth-of-type(2) {
          font-size: 14px;
          line-height: 21px;
          color: #707A81;
        }
      }
      .copy-box{
        cursor: pointer;
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
      padding-top: 0;
      .main-content-list{
        width: 100vw;
      }
      .main-header{
        &>div{
          width: 100vw;
        }
      .main-header-breadcrumb{
        padding: 16px 10px;
      }
        .images-names{
          padding: 16px 0;
          &>div:nth-last-of-type(1){
            display: none;
          }
        }
      }
      .overview {
        padding-left: 10px;
      }
      .list{
        height: calc(100vh - 350px + 64px);
        .item{
          padding: 10px 20px;
          grid-template-columns: 75px 260px;
          &>div:nth-of-type(3){
            display: none;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .copy-txt{
    pointer-events:none;
  }
</style>
