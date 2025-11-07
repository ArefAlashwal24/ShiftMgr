import { useState } from 'react';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async () => {
    try {
      await login(email, password);
      nav('/');
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="p-6 rounded-2xl shadow w-full max-w-sm space-y-3">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <input className="border p-2 w-full rounded" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input className="border p-2 w-full rounded" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="w-full p-2 rounded bg-black text-white" onClick={submit}>Login</button>
      </div>
    </div>
  );
}
