'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [recoveryKey, setRecoveryKey] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const cleanUsername = username.trim(); 

    if (!cleanUsername) {
      setError('Nome de usuário inválido.');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
      setError('Por favor, digite um e-mail válido.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
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
          username: cleanUsername, 
          password: password,
          email,
          recoveryKey
        }),
      });

      if (res.status === 201) {
        router.push('/login?registered=true');
      } else if (res.status === 409) {
        const data = await res.json();
        setError(data.message || 'Esse nome de usuário já está em uso.');
      } else if (res.status === 400) {
        const text = await res.text();
        setError(text);
      } else {
        setError('Ocorreu um erro no cadastro. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet.');
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
            <label>E-mail</label>
            <input
              type="email"
              required
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="auth-input"
              placeholder="seu@email.com"
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
              placeholder="Mínimo de 6 caracteres"
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

          <div className="auth-input-group">
            <label>Palavra de Recuperação</label>
            <input
              type="text"
              required
              value={recoveryKey}
              onChange={(e) => setRecoveryKey(e.target.value)}
              className="auth-input"
            />
            <p className="text-xs text-gray-500 mt-1">Será usado se esquecer a senha.</p>
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