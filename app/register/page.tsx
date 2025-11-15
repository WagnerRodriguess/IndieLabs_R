'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!username || !password) {
      setError('Usuário e senha são obrigatórios.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (res.status === 201) {
        router.push('/login?registered=true');
      } else if (res.status === 409) {
        const data = await res.json();
        setError(data.message || 'Esse nome de usuário já está em uso.');
      } else {
        setError('Ocorreu um erro no cadastro. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id="main-content">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h1 className="auth-title">Criar Conta</h1>

          <div className="auth-input-group">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <p className="auth-link">
            Já tem uma conta? <Link href="/login">Faça login</Link>
          </p>
        </form>
      </div>
    </main>
  );
}