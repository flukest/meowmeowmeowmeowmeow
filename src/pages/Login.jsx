import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const botId = import.meta.env.VITE_TELEGRAM_BOT_ID;
  const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;
  const origin = window.location.origin + "/telegram-callback";

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleTelegramLogin = () => {
    window.TelegramLoginWidget = {
      bot_id: botId,
      origin: origin,
      request_access: 'write',
      embed: true,
      bot_username: botUsername
    };

        window.location.href = 
      `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&request_access=write&embed=1&bot_username=${botUsername}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username, 'Password:', password);
    
    // After successful login, navigate to home or dashboard
    // navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white tracking-wide">
            Login
          </h1>
        </div>

        <div className="space-y-8">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-0 py-4 bg-transparent text-white placeholder-gray-500 border-0 border-b border-gray-800 focus:border-white focus:outline-none transition-colors text-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-0 py-4 bg-transparent text-white placeholder-gray-500 border-0 border-b border-gray-800 focus:border-white focus:outline-none transition-colors text-lg"
            required
          />

          <div className="pt-8 space-y-4">
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-white text-black font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              Login
            </button>

            <button
              onClick={handleTelegramLogin}
              className="w-full py-4 border border-gray-800 text-white font-medium text-lg hover:border-gray-600 transition-colors"
            >
              Continue with Telegram
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <span className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-white hover:text-gray-300 transition-colors">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;