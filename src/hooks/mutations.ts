import { ref, Ref } from 'vue';
import { RequestType } from './type';

export interface MutationParams<TParam, TData> {
  variables?: TParam;
  update?: (result: TData) => void;
}

export interface MutationResult<Tdata> {
  data: Ref<Tdata> | undefined;
  loading: Ref<boolean>;
  error: Ref<any>;
}

export /**
 * use restfull api request typeof post put delete reactive
 *
 * @template TParams
 * @template TData
 * @param {RequestType<TParams, TData>} request
 * @param {MutationParams<TParams, TData>} [params]
 * @returns {[typeof execute, MutationResult<TData>]}
 */
const useMutation = <TParams = Record<string, any>, TData = any>(
  request: RequestType<TParams, TData>,
  params: MutationParams<TParams, TData> = {}
): [typeof execute, MutationResult<TData>] => {
  const data = ref<any>(undefined);
  const loading = ref<boolean>(false);
  const error = ref<any>(undefined);
  const { variables = {}, update } = params;
  const variableState = ref<any>(variables);
  const updateFn = ref<any>(update);

  const execute = (execParams: MutationParams<TParams, TData> = {}) => {
    const { variables: newVariables = {}, update: newUpdate } = execParams;
    variableState.value = newVariables;
    updateFn.value = newUpdate;
    loading.value = true;
    return (request(variableState.value)
      .then((result: TData) => {
        data.value = result;
        updateFn.value && updateFn.value(result);
      })
      .catch((err: any) => {
        error.value = err;
      }) as any).finally(() => {
      loading.value = false;
    });
  };

  return [execute, { data, loading, error }];
};
