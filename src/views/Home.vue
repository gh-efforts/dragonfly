<template>
  <div>
    <span>
      {{state.counter}}
      <hello-world />
    </span>
  </div>
</template>

<script lang="ts">
import helloWorld from '@/components/HelloWorld.vue';
import { state, increment } from '@/states/counter';
export default {
  components: {
    helloWorld
  },
  setup() {
    return {
      state,
      increment
    };
  }
};
</script>
