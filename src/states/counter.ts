import { computed, reactive } from 'vue';

interface Counter {
  counter: number;
  double: number;
}

export const state: Counter = reactive({
  counter: 0,
  double: computed(() => state.counter * 2)
});

export const increment = () => state.counter++;
