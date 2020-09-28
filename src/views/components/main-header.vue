<template>
  <header class="header">
    <div class="header-main">
      <router-link to='/'>
        <img src="@/assets/svg/logo.svg" class="logo" alt="dragonly">
      </router-link>
      <div class="search-input">
        <div class="search-input-prefix">
          <img src="@/assets/svg/search.svg">
        </div>
        <input v-model="searchTxt" type="text" placeholder="Search...">
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { debounce } from '@/utils/index'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup (_: any, context: any) {
    const search = debounce((val: string) => {
      // eslint-disable-next-line vue/custom-event-name-casing
      context.emit('changeSearch', val)
    }, 500)
    const searchTxt = ref('')
    watch(searchTxt, () => {
      search(searchTxt.value)
    })
    const route = useRoute()
    if (route.query.txt) {
      searchTxt.value = route.query.txt as string
    }

    return {
      searchTxt,
      search
    }
  }
}
</script>

<style scoped lang="less">
  .header{
    background-color: #00A5C9;
    box-sizing: border-box;
    .header-main{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      // width: 100%;
      width: 1260px;
      padding: 10px 0px;
      margin: 0 auto;
      box-sizing: border-box;
      .logo{
        height: 26px;
      }
      .search-input{
        height: 44px;
        width: 528px;
        position: relative;
        .search-input-prefix{
          height: 100%;
          width: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 0;
          top: 0;
          img{
            height: 16px;
          }
        }
        input{
          color: #ffffff;
          width: 100%;
          height: 100%;
          background-color: #0295B7;
          border-radius: 4px;
          padding: 0 10px 0 50px;
          box-sizing: border-box;
          font-size: 16px;
          border: 1px solid #0295B7;
          transition: 200ms all linear;
          outline: 0;
          &::placeholder{
            color: #ffffff;
          }
          &:focus{
            border: 1px solid #ffffff;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .header{
      .header-main{
        width: 100vw;
        padding: 0 10px;
        .search-input{
          margin-left: 10px;
          height: 30px;
          .search-input-prefix{
            width: 30px;
            img{
              height: 12px;
            }
          }
          input {
            padding: 0 10px 0 30px;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
