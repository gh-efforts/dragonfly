<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  setup () {
    return {}
  }
}
</script>

<style lang='less'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  min-width: 1260px;
}
.nomore{
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 32px;
  line-height: 40px;
  padding: 100px 0 0 0;
  img{
    width: 20%;
    min-width: 200px;
  }
}
@media screen and (max-width: 768px) {
    #app {
      min-width: auto;
    }
  }
</style>
