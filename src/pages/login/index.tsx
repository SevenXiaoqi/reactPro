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
  const [isFocused, setIsFocused] = useState<'email' | 'password' | null>(null);

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

  // 判断终端类型
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <>
      {/* 自定义样式 */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-shimmer { animation: shimmer 2s linear infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        
        /* 输入框聚焦效果 */
        .input-group:focus-within .input-icon {
          color: #3b82f6;
        }
        .input-group:focus-within .input-label {
          color: #3b82f6;
        }
      `}</style>

      <div className={`min-h-screen flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* ============ 左侧欢迎模块（PC 端显示） ============ */}
        {!isMobile && (
          <div className="w-1/2 relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center overflow-hidden">
            {/* 背景装饰圆 */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* 网格背景 */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            />

            {/* 内容区域 */}
            <div className="relative z-10 text-white text-center px-8">
              {/* Logo/图标 */}
              <div className="mb-8 animate-float">
                <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                  <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>

              {/* 标题 */}
              <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">欢迎回来</h1>
              
              {/* 副标题 */}
              <p className="text-xl text-blue-100 mb-2 animate-fade-in-up delay-100">seven 客户网站</p>
              
              {/* 描述 */}
              <p className="text-blue-200/80 max-w-md mx-auto mb-8 animate-fade-in-up delay-200">
                高效、安全、智能的企业级解决方案
              </p>

              {/* 底部装饰 */}
              <div className="mt-12 flex items-center justify-center gap-2 text-blue-200/60 text-sm">
                <div className="w-8 h-px bg-blue-200/40" />
                <span>© 2026 seven 小七</span>
                <div className="w-8 h-px bg-blue-200/40" />
              </div>
            </div>

            {/* 漂浮装饰元素 */}
            <div className="absolute top-32 right-32 w-16 h-16 bg-white/5 rounded-full border border-white/10 animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-40 left-32 w-12 h-12 bg-white/5 rounded-full border border-white/10 animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-16 w-8 h-8 bg-white/5 rounded-full border border-white/10 animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
        )}

        {/* ============ 右侧登录框（优化版） ============ */}
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100`}>
          {/* 动态背景 */}
          {!isMobile && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"
                style={{
                  left: `${mousePosition.x}%`,
                  top: `${mousePosition.y}%`,
                  transition: 'all 0.5s ease-out',
                }}
              />
              <div
                className="absolute w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"
                style={{
                  left: `${100 - mousePosition.x}%`,
                  top: `${100 - mousePosition.y}%`,
                  transition: 'all 0.5s ease-out',
                }}
              />
            </div>
          )}

          {/* 登录卡片 */}
          <div className="relative w-full max-w-md z-10 mx-4 sm:mx-0">
            {/* 卡片容器 - 玻璃拟态效果 */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
              {/* 顶部装饰条 */}
              <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />
              
              <div className="p-8 sm:p-10">
                {/* 头部 */}
                <div className="mb-8 text-center">
                  {/* 移动端 Logo */}
                  {isMobile && (
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">欢迎登录</h1>
                  <p className="text-gray-500 mt-2 text-sm sm:text-base">请输入您的账户信息继续</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 邮箱输入 - 优化版 */}
                  <div className="input-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 input-label transition-colors">
                      邮箱地址
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className={`h-5 w-5 input-icon transition-colors ${errors.email ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        onFocus={() => setIsFocused('email')}
                        onBlur={() => setIsFocused(null)}
                        className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none ${
                          errors.email 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                            : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center gap-1 mt-2 text-red-500 text-sm animate-fade-in-up">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* 密码输入 - 优化版 */}
                  <div className="input-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 input-label transition-colors">
                      密码
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className={`h-5 w-5 input-icon transition-colors ${errors.password ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({ ...formData, password: e.target.value });
                          if (errors.password) setErrors({ ...errors, password: undefined });
                        }}
                        onFocus={() => setIsFocused('password')}
                        onBlur={() => setIsFocused(null)}
                        className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none ${
                          errors.password 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                            : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.password && (
                      <div className="flex items-center gap-1 mt-2 text-red-500 text-sm animate-fade-in-up">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.password}</span>
                      </div>
                    )}
                  </div>

                  {/* 选项 - 优化版 */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.rememberMe}
                          onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                          formData.rememberMe 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300 group-hover:border-blue-400'
                        }`}>
                          {formData.rememberMe && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">记住我</span>
                    </label>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-all">
                      忘记密码？
                    </a>
                  </div>

                  {/* 提交按钮 - 优化版 */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full relative overflow-hidden py-3.5 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 transform ${
                      isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                  >
                    {/* 光泽效果 */}
                    {!isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    )}
                    
                    <span className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          登录中...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          立即登录
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* 分割线 */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-gray-400">或</span>
                  </div>
                </div>
                {/* 底部链接 */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    还没有账户？
                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all ml-1">
                      立即注册
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* 卡片底部阴影装饰 */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-blue-500/20 blur-2xl rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;