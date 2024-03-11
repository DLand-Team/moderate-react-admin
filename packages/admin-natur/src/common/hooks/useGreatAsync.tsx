import {
  CreateAsyncControllerOptions,
  DIMENSIONS,
  PromiseFunction,
  createAsyncController,
} from "great-async";

const useGreatAsync = (
  api: PromiseFunction,
  options: CreateAsyncControllerOptions = {}
) => {
  return createAsyncController(api, {
    single: true,
    singleDimension: DIMENSIONS.PARAMETERS,
    ttl: 1000 * 60 * 60 * 8,
    ...options,
  });
};

export default useGreatAsync;
