import { Ref, computed, reactive } from 'vue';
import store from '../store';
import { isObject } from './shared';

export type IsArrayOrObject = Record<string, any> | any[];
export type NormalizeNamespaceReturn = (
  namespace: string | IsArrayOrObject,
  map?: IsArrayOrObject
) => Record<string, Ref<any>>;

export type typeActionsAndMutationsReturn = (
  namespace: string | IsArrayOrObject,
  map?: IsArrayOrObject
) => Record<string, Function>;

function normalizeNamespace<T>(fn: Function) {
  return (namespace: string | IsArrayOrObject, map?: IsArrayOrObject) => {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

function getModuleByNamespace(helper: string, namespace: string) {
  const module = (store as any)._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`);
  }
  return module;
}

function isValidMap(map: unknown): boolean {
  return Array.isArray(map) || isObject(map);
}

function normalizeMap(map: IsArrayOrObject): { key: any; val: any }[] {
  if (!isValidMap(map)) {
    return [];
  }
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }));
}

export const useState = normalizeNamespace(
  (namespace: IsArrayOrObject | string, states: IsArrayOrObject) => {
    const res: Record<string, any> = reactive({});
    if (process.env.NODE_ENV !== 'production' && !isValidMap(states)) {
      console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(states).forEach(({ key }) => {
      let state = store.state;
      if (namespace) {
        const module = getModuleByNamespace('mapState', namespace as any);
        if (!module) {
          return;
        }
        state = module.context.state;
      }
      // @ts-ignore
      res[key] = computed(() => state[key]);
    });

    return res;
  }
);

export const useGetters = normalizeNamespace(
  (namespace: IsArrayOrObject | string, getters: IsArrayOrObject) => {
    const res: Record<string, any> = reactive({});
    if (process.env.NODE_ENV !== 'production' && !isValidMap(getters)) {
      console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(getters).forEach(({ key, val }) => {
      // The namespace has been mutated by normalizeNamespace
      val = namespace + val;
      res[key] = (function mappedGetter() {
        if (namespace && !getModuleByNamespace('mapGetters', namespace as any)) {
          return;
        }
        if (process.env.NODE_ENV !== 'production' && !(val in store.getters)) {
          console.error(`[vuex] unknown getter: ${val}`);
          return;
        }
        return computed(() => store.getters[val]);
      })();
    });
    return res;
  }
);

export const useMutations = normalizeNamespace(
  (namespace: IsArrayOrObject | string, mutations: IsArrayOrObject) => {
    const res: Record<string, any> = {};
    if (process.env.NODE_ENV !== 'production' && !isValidMap(mutations)) {
      console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(mutations).forEach(({ key, val }) => {
      res[key] = function mappedMutation(...args: any[]) {
        // Get the commit method from store
        let commit = store.commit;
        if (namespace) {
          const module = getModuleByNamespace('mapMutations', namespace as any);
          if (!module) {
            return;
          }
          commit = module.context.commit;
        }
        return commit.apply(store, [val].concat(args) as any);
      };
    });
    return res;
  }
);

export const useActions = normalizeNamespace(
  (namespace: IsArrayOrObject | string, actions: IsArrayOrObject) => {
    const res: Record<string, any> = {};
    if (process.env.NODE_ENV !== 'production' && !isValidMap(actions)) {
      console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
    }

    normalizeMap(actions).forEach(({ key, val }) => {
      res[key] = function mappedAction(...args: any[]) {
        // get dispatch function from store
        let dispatch = store.dispatch;
        if (namespace) {
          const module = getModuleByNamespace('mapActions', namespace as any);
          if (!module) {
            return;
          }
          dispatch = module.context.dispatch;
        }
        return dispatch.apply(store, [val].concat(args) as any);
      };
    });
    return res;
  }
);
