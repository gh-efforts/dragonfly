<template>
  <div class="hello">
    <h1>{{ states.count }}</h1>
    <button @click="mutations[ADD_COUNT]()">
      测试
    </button>
  </div>
</template>

<script lang="ts">
import { useState, useMutations } from '@/hooks';
import { ADD_COUNT } from '@/store/global/constants';
export default {
  setup() {
    const states = useState('global', ['count']);
    const mutations = useMutations('global', [ADD_COUNT]);

    return { states, mutations, ADD_COUNT };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
