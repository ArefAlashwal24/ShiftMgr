import { api, setToken } from './api';
import { useSession } from './store';

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  setToken(data.token);
  useSession.getState().setUser(data.user);
}

export async function register(email: string, password: string, role: 'staff' | 'manager' | 'admin' = 'staff') {
  const { data } = await api.post('/auth/register', { email, password, role });
  setToken(data.token);
  useSession.getState().setUser(data.user);
}
