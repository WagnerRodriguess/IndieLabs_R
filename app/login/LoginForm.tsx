'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Conta criada com sucesso! Faça o login.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: username,
        password: password,
      });

      if (result?.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError('Usuário ou senha inválidos.');
        setIsLoading(false);
      }
    } catch {
      setError('Erro de conexão. Verifique sua internet.');
      setIsLoading(false);
    }
  };

  return (
    <main id="main-content">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h1 className="auth-title">Login</h1>

          {success && <p className="auth-success">{success}</p>}

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
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />

            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
          
          <p className="auth-link" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
            <Link 
              href="/forgot-password" 
              style={{ color: '#c084fc', textDecoration: 'none', fontSize: '0.9rem' }}
              className="hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </p>

          <p className="auth-link">
            Não tem uma conta? <Link href="/register">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </main>
  );
}