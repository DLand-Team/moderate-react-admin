/* name */
import slice from './slice';
import thunks from './thunks';
import watch from './watch';

const store: { slice: typeof slice; thunks: typeof thunks; watch: typeof watch } = {
  slice,
  thunks,
  watch,
};

export default store;
