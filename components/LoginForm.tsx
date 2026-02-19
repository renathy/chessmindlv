'use client';

import users from '@/data/users.json';
import { saveUser } from '@/lib/auth';
import type { AuthUser } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const demoUsers = useMemo(() => {
    return (users as AuthUser[]).map((user) => `${user.username} (${user.role})`).join(', ');
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const matchedUser = (users as AuthUser[]).find(
      (entry) => entry.username === username && entry.password === password
    );

    if (!matchedUser) {
      setError('Invalid username or password. Please use one of the predefined accounts.');
      return;
    }

    setError('');
    saveUser({
      username: matchedUser.username,
      role: matchedUser.role,
      level: matchedUser.level
    });
    router.push('/dashboard');
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h1>Chess Lessons Login</h1>
      <p>Sign in with a predefined student or teacher account.</p>
      <p>
        <small>Demo users: {demoUsers}</small>
      </p>

      <label htmlFor="username">Username</label>
      <input
        id="username"
        required
        placeholder="e.g. student0"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        required
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error && <p style={{ color: '#b91c1c' }}>{error}</p>}

      <button className="btn btn-primary" type="submit">
        Log in
      </button>
    </form>
  );
}
