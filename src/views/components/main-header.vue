<template>
  <header class="header">
    <div class="header-main">
      <router-link to="/">
        <img src="@/assets/svg/logo.svg" class="logo" alt="dragonly" />
      </router-link>
      <div></div>
      <div class="search-input">
        <div class="search-input-prefix">
          <img src="@/assets/svg/search.svg" />
        </div>
        <input v-model="searchTxt" type="text" placeholder="Search..." />
      </div>
      <a-dropdown placement="bottomCenter">
        <a-button class="tools" ghost size="large">CLI Tool</a-button>
        <template v-slot:overlay>
          <a-menu>
            <a-menu-item class="tools-item">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/diancun/dragonfly-cli/releases/download/v1.0.0/darwin-amd64-dragonfly-release.zip"
              >
                Linux version
              </a>
            </a-menu-item>
            <a-menu-item class="tools-item">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/diancun/dragonfly-cli/releases/download/v1.0.0/linux-amd64-dragonfly-release.zip"
              >
                Mac version
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </header>
</template>

<script lang="ts">
import { debounce } from '@/utils/index'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  Dropdown as aDropdown,
  Menu as aMenu,
  Button as aButton,
} from 'ant-design-vue'

const aMenuItem = aMenu.Item

export default {
  components: {
    aDropdown,
    aMenu,
    aMenuItem,
    aButton,
  },
  setup(_: any, context: any) {
    const search = debounce((val: string) => {
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
      search,
    }
  },
}
</script>

<style scoped lang="less">
.header {
  background-color: #00a5c9;
  box-sizing: border-box;
  .header-main {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    grid-gap: 2rem;
    height: 64px;
    margin: 0 auto;
    width: 1260px;
    padding: 10px 0px;
    margin: 0 auto;
    box-sizing: border-box;
    .logo {
      height: 26px;
    }
    .search-input {
      height: 44px;
      width: 528px;
      position: relative;
      .search-input-prefix {
        height: 100%;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        img {
          height: 16px;
        }
      }
      input {
        color: #ffffff;
        width: 100%;
        height: 100%;
        background-color: #0295b7;
        border-radius: 4px;
        padding: 0 10px 0 50px;
        box-sizing: border-box;
        font-size: 16px;
        border: 1px solid #0295b7;
        transition: 200ms all linear;
        outline: 0;
        &::placeholder {
          color: #ffffff;
        }
        &:focus {
          border: 1px solid #ffffff;
        }
      }
    }

    .tools {
      width: 120px;
      border-radius: 4px;
      border-color: #fff;
      color: #fff;
      &:hover {
        border-color: #fff;
        color: #fff;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .header {
    .header-main {
      width: 100vw;
      padding: 0 10px;
      .search-input {
        margin-left: 10px;
        height: 30px;
        .search-input-prefix {
          width: 30px;
          img {
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

<style lang="less">
.ant-dropdown-menu-item.tools-item {
  &:hover {
    background-color: #f2f3f4 !important;
  }

  a {
    width: 100%;
  }
  text-align: center;
}
</style>
