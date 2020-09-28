export type RequestType<TParams, TData> = (params?: TParams) => Promise<TData>;
