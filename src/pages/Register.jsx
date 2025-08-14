const Register = () => {
  const botId = import.meta.env.VITE_TELEGRAM_BOT_ID;
  const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;
  const origin = window.location.origin;
  const handleTelegramRegister = () => {
    window.location.href =
      `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&request_access=write&embed=1&bot_username=${botUsername}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl font-bold text-success mb-4">Register</h2>
          <button
            className="btn btn-success btn-wide flex items-center gap-2 mb-2"
            onClick={handleTelegramRegister}
          >
            Register with Telegram
          </button>
          <p className="mt-4">Already have an account? <a href="/login" className="link link-primary">Login</a></p>
        </div>
      </div>
      <footer className="mt-10 text-base-content opacity-70">&copy; 2025 Ecommerce Client</footer>
    </div>
  );
  
}

export default Register