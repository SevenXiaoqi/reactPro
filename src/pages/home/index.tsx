// import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setName, setAge, login, logout } from '@/store/slices/user';

function App() {
  const { name, age, token } = useAppSelector((state) => state.user);
  // 2. 获取 dispatch（带类型安全）
  const dispatch = useAppDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h2>Redux Toolkit + TS 完整用法</h2>
      <p>姓名：{name || '未设置'}</p>
      <p>年龄：{age || '未设置'}</p>
      <p>Token：{token || '未登录'}</p>

      {/* 设置状态 */}
      <button onClick={() => dispatch(setName('张三'))}>
        设置姓名：张三
      </button>

      <button onClick={() => dispatch(setAge(25))}>
        设置年龄：25
      </button>

      <button onClick={() => dispatch(login({ name: '李四', token: '123456' }))}>
        模拟登录
      </button>

      <button onClick={() => dispatch(logout())}>
        退出登录
      </button>
    </div>
  );
}

export default App;