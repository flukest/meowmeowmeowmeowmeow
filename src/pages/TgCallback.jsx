import { useEffect } from 'react';

const TelegramCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authData = Object.fromEntries(params.entries());

    fetch('http://localhost:8000/api/v1/auth/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    })
    .then(res => res.json())
    .then(data => console.log('Logged in:', data));
  }, []);

  return <div>Just a second...</div>;
};

export default TelegramCallback;
