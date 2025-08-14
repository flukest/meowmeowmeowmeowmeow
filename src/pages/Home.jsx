const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center">
      <div className="card w-full max-w-xl bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body items-center text-center">
          <h1 className="text-5xl font-extrabold text-primary mb-4">Ecommerce Client</h1>
          <p className="text-lg text-base-content mb-6">Shop smarter, faster, and safer. Sign in to get started!</p>
          <a
            href="/login"
            className="btn btn-primary btn-wide flex items-center gap-2"
          >
            Sign In with Telegram
          </a>
        </div>
      </div>
      <footer className="mt-10 text-base-content opacity-70">&copy; 2025 Ecommerce Client</footer>
    </div>
  );
}

export default Home