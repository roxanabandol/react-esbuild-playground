import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import { ActionType } from './action-types';

export const store = configureStore({
  reducer: reducers,
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code',
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text',
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code',
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text',
  },
});

const id = store.getState().cells?.order[0];
console.log(store.getState());

export default store;
