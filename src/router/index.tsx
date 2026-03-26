import { createBrowserRouter } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import { lazy } from 'react';

const Home = lazy(()=>import('../pages/home'))
const About = lazy(()=>import('../pages/about'))
const Login = lazy(()=>import('../pages/login'))

const router = createBrowserRouter([
  // 登录页（不需要守卫）
  {
    path: '/login',
    element: <Login />,
  },

  // 需要登录才能访问的页面
  {
    path: '/',
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    ),
  },
  {
    path: '/about',
    element: (
      <AuthGuard>
        <About />
      </AuthGuard>
    ),
  },
]);

export default router;