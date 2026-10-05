'use client';

import { FormEvent, useState } from 'react';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        setErrorMessage(
          data?.error || 'E-posta veya şifre hatalı.'
        );
        setIsLoading(false);
        return;
      }

      // Başarılı giriş: tam sayfa yönlendirme ile admin paneline geç
      window.location.href = '/admin';
    } catch {
      setErrorMessage(
        'Giriş yapılırken bir bağlantı hatası oluştu. Lütfen tekrar deneyin.'
      );
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Yönetim Paneli</h1>

        <p className={styles.subtitle}>
          Yetkili hesabınızla giriş yapın.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">E-posta</label>

            <input
              id="email"
              type="email"
              placeholder="ornek@tatarlihoyuk.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Şifre</label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </main>
  );
}
}