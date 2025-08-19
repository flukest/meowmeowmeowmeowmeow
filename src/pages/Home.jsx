import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // optional: clear token from localStorage
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center">
          {isAuth && user ? (
            <>
              {user.photoUrl && (
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user.photoUrl} alt={user.firstName || "User"} />
                  </div>
                </div>
              )}
              <h2 className="card-title text-2xl">
                Welcome, {user.firstName || user.username}
              </h2>
              <p className="text-lg text-gray-600">@{user.username || "NoUsername"}</p>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error mt-6"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary btn-wide"
            >
              Sign In with Telegram
            </Link>
          )}
        </div>
      </div>
      <footer className="mt-10 text-base-content opacity-70 text-center">
        &copy; 2025 Ecommerce Client
      </footer>
    </div>
  );
};

export default Home;
