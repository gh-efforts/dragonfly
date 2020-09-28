import 'vuex'
declare module 'vuex' {
    function useStore<T = any>(key?: string): T
    function createStore<S>(options: StoreOptions<S>): Store<S>;
}
