// 用户状态类型
export interface UserState {
    name: string;
    age: number;
    token: string;
}
  
// 登录 payload 类型（可选）
export interface LoginPayload {
    name: string;
    token: string;
}
