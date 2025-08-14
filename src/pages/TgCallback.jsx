import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TelegramCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Extract the hash fragment
    const hash = window.location.hash;
    if (!hash.includes('tgAuthResult')) {
      setError('Telegram authentication failed');
      setLoading(false);
      return;
    }

    const tgAuthResult = hash.split('tgAuthResult=')[1];
    if (!tgAuthResult) {
      setError('No Telegram auth data found');
      setLoading(false);
      return;
    }

    try {
      const authData = JSON.parse(decodeURIComponent(tgAuthResult));

      // Call backend to verify and login/register the user
      fetch('http://localhost:8000/api/v1/auth/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // save token or session if returned
            localStorage.setItem('token', data.token);
            navigate('/'); // redirect to home/dashboard
          } else {
            setError(data.message || 'Telegram login failed');
          }
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    } catch (err) {
      setError('Failed to parse Telegram auth data');
      setLoading(false);
    }
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Logging in with Telegram...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return null;
};

export default TelegramCallback;
