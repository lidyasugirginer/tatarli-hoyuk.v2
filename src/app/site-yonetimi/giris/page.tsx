'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    // 1. E-posta ve şifre ile giriş yap
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log('LOGIN DATA:', loginData);
    console.log('LOGIN ERROR:', loginError);

    // Auth girişinde hata varsa
    if (loginError || !loginData.user) {
      setErrorMessage(
        loginError?.message ?? 'Giriş sırasında bir hata oluştu.'
      );
      setIsLoading(false);
      return;
    }

    // 2. Giriş yapan kişi admins tablosunda kayıtlı mı kontrol et
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('role')
      .eq('user_id', loginData.user.id)
      .maybeSingle();

    console.log('USER ID:', loginData.user.id);
    console.log('ADMIN DATA:', adminData);
    console.log('ADMIN ERROR:', adminError);

    // Veritabanı sorgusunda hata varsa
    if (adminError) {
      await supabase.auth.signOut();

      setErrorMessage(
        `Yönetici kaydı kontrol edilemedi: ${adminError.message}`
      );

      setIsLoading(false);
      return;
    }

    // Kullanıcı Auth'ta var ama admins tablosunda yoksa
    if (!adminData) {
      await supabase.auth.signOut();

      setErrorMessage(
        'Bu hesabın yönetim paneline erişim yetkisi yok.'
      );

      setIsLoading(false);
      return;
    }

    // 3. Her şey doğruysa yönetim paneline yönlendir
    router.push('/site-yonetimi');
    router.refresh();
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