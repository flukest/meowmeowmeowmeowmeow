import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const botId = import.meta.env.VITE_TELEGRAM_BOT_ID;
  const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;
  const origin = window.location.origin;

  const [phone, setPhone] = useState('');

  const handleTelegramRegister = () => {
    window.location.href =
      `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&request_access=write&embed=1&bot_username=${botUsername}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Phone number:', phone);
    // After successful registration, you can navigate to login or dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white tracking-wide">Register</h1>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-0 py-4 bg-transparent text-white placeholder-gray-500 border-0 border-b border-gray-800 focus:border-white focus:outline-none transition-colors text-lg"
            required
          />

          <div className="pt-8 space-y-4">
            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              Register
            </button>

            <button
              type="button"
              onClick={handleTelegramRegister}
              className="w-full py-4 border border-gray-800 text-white font-medium text-lg hover:border-gray-600 transition-colors"
            >
              Continue with Telegram
            </button>
          </div>
        </form>

        <div className="mt-12 text-center">
          <span className="text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
