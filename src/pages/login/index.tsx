import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 动态背景效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = '密码长度至少为 6 位';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 登录处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem('token', 'mock_token');
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
      {/* 动态背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transition: 'all 0.5s ease-out',
          }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
          style={{
            left: `${100 - mousePosition.x}%`,
            top: `${100 - mousePosition.y}%`,
            transition: 'all 0.5s ease-out',
          }}
        />
      </div>

      {/* 登录卡片 */}
      <div className="relative bg-white p-10 rounded-lg shadow-xl w-full max-w-md z-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">欢迎回来</h1>
          <p className="text-gray-500 mt-2">登录您的账户</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 邮箱输入 */}
          <div className="flex items-start gap-3">
            <label className="block text-sm font-medium text-gray-700 w-16 pt-2 flex-shrink-0">
              邮箱
            </label>
            <div className="flex-1">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>
              )}
            </div>
          </div>

          {/* 密码输入 */}
          <div className="flex items-start gap-3">
            <label className="block text-sm font-medium text-gray-700 w-16 pt-2 flex-shrink-0">
              密码
            </label>
            <div className="flex-1">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="请输入密码"
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>
              )}
            </div>
          </div>

          {/* 选项 */}
          <div className="flex items-center justify-between pl-20">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">记住我</span>
            </label>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              忘记密码？
            </a>
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                登录中...
              </span>
            ) : (
              '登录'
            )}
          </button>
        </form>

        {/* 底部链接 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            还没有账户？<a href="#" className="font-medium text-blue-600 hover:text-blue-500">立即注册</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;