<template>
  <main class="main-content">
    <div class="images-names">
      <img class="images-img" src="@/assets/docker.png" />
      <div class="ellipsis">
      {{state.imageName}}
      </div>
    </div>
    <div class="overview">{{state.list.length > 0 ? 1 : 0}} - {{state.list.length}} of {{state.total}} available tags.</div>
    <div class="list" ref="imageList">
      <div class="item" v-for="(item,key) of state.list" :key="key">
        <div class="images-synopsis ellipsis">
          <div class="ellipsis">{{item.tagName}}</div>
          <div>Tag</div>
        </div>
        <div class="copyBox">
          <template v-if="(item.Download || {}).cid">
            <div class="images-synopsis ellipsis">
              <div class="ellipsis">{{(item.Download || {}).cid}}</div>
              <div>CID</div>
            </div>
            <div class="copyBox-hover">
              <a-button @click="copyText((item.Download || {}).cid)">
                Copy
              </a-button>
            </div>
          </template>
        </div>
        <div class="images-synopsis">
          <div>{{transPower(item.size)}}</div>
          <div>Size</div>
        </div>
        <div class="copyBox">
          <div class="images-synopsis ellipsis">
            <div class="ellipsis">{{(item.Download || {}).url}}</div>
            <div>Download</div>
          </div>
          <div class="copyBox-hover">
            <a-button @click="copyText((item.Download || {}).url)">
              Copy
            </a-button>
          </div>
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
  </main>
</template>

<script scoped lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref, nextTick } from 'vue'
import { getImagesTag } from '@/api/request'
import { copyToClipboard, transPower } from '@/utils/index'
import { Spin as aSpin, message, Button as aButton } from 'ant-design-vue'
import { useRoute } from 'vue-router'

export default {
  components: {
    aSpin,
    aButton
  },
  setup () {
    const state: any = reactive({
      imageName: '',
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
        const { imageinfo, tag } = res
        state.imageName = imageinfo.imageName
        state.list = [...state.list, ...tag.rows]
        state.total = tag.count
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
  width: 1260px;
  margin: 0 auto;
  box-sizing: border-box;
  height: calc(100vh - 64px);
  padding-top: 30px;
  .images-names{
    background-color: #ffffff;
    padding: 20px 30px;
    box-shadow: 0px 3px 30px rgba(85, 128, 246, 0.14);
    font-size: 16px;
    display: grid;
    grid-template-columns: 80px 1fr;
    grid-column-gap: 20px;
    align-items: center;
    .images-img {
      height: 80px;
      width: 80px;
      object-fit: contain;
    }
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
    height: calc(100% - 216px);
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
      grid-template-columns: repeat(3, 1fr) 200px;
      grid-column-gap: 10px;
      align-items: center;
      color: #252c33;
      margin-bottom: 10px;
      border: 1px solid #E2E4E6;
      transition: 200ms all linear;
      &:hover{
        border: 1px solid transparent;
      }
      &>.images-synopsis:nth-of-type(1){
        text-align: left;
      }
      .images-synopsis {
        text-align: right;
        & > div:nth-of-type(1) {
          font-size: 18px;
          line-height: 24px;
        }
        & > div:nth-of-type(2) {
          font-size: 14px;
          line-height: 21px;
          color: #5d676d;
        }
      }
      .copyBox{
        position: relative;
        text-align: center;
        padding: 0 20px;
        height: 100%;
        display: flex;
        align-items: center;
        .images-synopsis{
          text-align: center;
        }
        &:hover{
          .copyBox-hover{
            opacity: 1;
          }
        }
        .copyBox-hover{
          opacity: 0;
          transition: 200ms all linear;
          background-color: rgba(255,255,255,0.4);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
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
      padding-top: 0;
      .overview {
        padding-left: 10px;
      }
      .list{
        .item{
          padding: 10px 20px;
          grid-template-columns: 75px 300px;
          &>div:nth-of-type(3),&>div:nth-of-type(4){
            display: none;
          }
        }
      }
    }
  }
</style>
