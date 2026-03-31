import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserState, LoginPayload } from '../types.ts';

// 初始状态（严格遵循 TS 类型）
const initialState: UserState = {
  name: '',
  age: 0,
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 设置用户名（TS 自动推断 action 类型）
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    // 设置年龄
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },

    // 登录
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
    },

    // 重置状态
    logout: (state) => {
      state.name = '';
      state.age = 0;
      state.token = '';
    },
  },
});

// 导出 action
export const { setName, setAge, login, logout } = userSlice.actions;

// 导出 reducer
export default userSlice.reducer;