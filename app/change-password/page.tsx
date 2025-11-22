'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const res = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setMessage('Senha alterada com sucesso! Redirecionando...');
        setTimeout(() => router.push('/'), 2000); 
      } else {
        const text = await res.text();
        setMessage(text); 
      }
    } catch (err) {
      setMessage('Erro de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id="main-content">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h1 className="auth-title">Alterar Senha</h1>

          {message && (
            <p className={isSuccess ? "auth-success" : "auth-error"}>
              {message}
            </p>
          )}

          <div className="auth-input-group">
            <label>Senha Atual</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label>Nova Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="auth-input"
              placeholder="Mínimo 6 caracteres"
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Alterando...' : 'Confirmar Alteração'}
          </button>
          
          <p className="auth-link">
             <button type="button" onClick={() => router.back()} style={{background:'none', border:'none', color:'#c084fc', cursor:'pointer', fontWeight:600}}>
               Cancelar e Voltar
             </button>
          </p>
        </form>
      </div>
    </main>
  );
}