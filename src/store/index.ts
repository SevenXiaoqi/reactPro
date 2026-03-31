import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';

// 创建 store
export const store = configureStore({
  reducer: {
    // 所有模块写在这里
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;