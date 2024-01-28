import { configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { projectListSlice } from 'screens/project-list/project-list.slice';
import { authSlice } from './auth.slice';

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
