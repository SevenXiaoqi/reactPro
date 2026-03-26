import { Navigate } from 'react-router-dom';

// 路由守卫：未登录不能访问页面
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  // 判断是否登录
  const token = localStorage.getItem('token');
  console.log(token)
  if (!token) {
    // 未登录 → 跳转到登录页
    return <Navigate to="/login" replace />;
  }

  // 已登录 → 正常显示页面
  return <>{children}</>;
};

export default AuthGuard;