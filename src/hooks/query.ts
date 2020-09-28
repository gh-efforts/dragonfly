import { ref, onMounted, Ref } from 'vue';
import { RequestType } from './type';

export interface QueryParams<TParam, TData> {
  variables?: TParam;
  update?: (result: TData) => void;
}

export interface QueryResult<TParam, TData> {
  loading: Ref<boolean>;
  data: Ref<TData>;
  error: Ref<any>;
  refetch: (params: QueryParams<TParam, TData>) => void;
}

interface Options {
  lazy?: boolean;
}

export /**
 * use restfull api typeof get reactive
 *
 * @template TParam
 * @template TData
 * @param {(params?: TParam) => Promise<TData>} request
 * @param {QueryParams<TParam>} [params]
 * @returns {QueryResult<TParam, TData>}
 */
const useQuery = <TParam = Record<string, any>, TData = any>(
  request: RequestType<TParam, TData>,
  params: QueryParams<TParam, TData> = {},
  options: Options = {}
): QueryResult<TParam, TData> => {
  const loading = ref<boolean>(false);
  const error = ref<any>(undefined);
  const data = ref<any>(undefined);
  const variableState = ref<any>(undefined);
  const updateFn = ref<Function | undefined>(undefined);
  const { variables, update } = params;
  variableState.value = variables;
  updateFn.value = update;

  function execute() {
    loading.value = true;
    return (request(variableState.value || {})
      .then(result => {
        updateFn.value && updateFn.value(result);
        data.value = result;
      })
      .catch(err => {
        error.value = err;
      }) as any).finally(() => {
      loading.value = false;
    });
  }

  const refetch = (executeParams: QueryParams<TParam, TData> = {}) => {
    const { variables: newVariables, update: newUpdate } = executeParams;
    variableState.value = newVariables;
    updateFn.value = newUpdate;
    execute();
  };

  onMounted(() => {
    if (options.lazy) {
      return;
    }
    execute();
  });

  return {
    loading,
    error,
    data,
    refetch
  };
};
