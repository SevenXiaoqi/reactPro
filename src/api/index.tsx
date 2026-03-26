import request from '../utils/request';

// GET
export const getData = async () => {
  const res = await request.get('/user/info');
  console.log(res);
};

// POST
export const login = async () => {
  const res = await request.post('/user/login', {
    username: 'admin',
    password: '123456',
  });
  localStorage.setItem('token', res.token); // 存储 token
};