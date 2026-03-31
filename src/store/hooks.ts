import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// 封装带类型的 dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 封装带类型的 selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;  