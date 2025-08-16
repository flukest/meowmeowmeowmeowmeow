import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../redux/slices/authSlice";
const TelegramCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const hash = window.location.hash;
    console.log("raw hash:", hash);

    if (!hash.startsWith("#tgAuthResult=")) {
      setError("Telegram authentication failed");
      setLoading(false);
      return;
    }

    const tgAuthResult = hash.replace("#tgAuthResult=", "");
    let authData;

    try {
      const decoded = atob(tgAuthResult); // base64 → JSON string
      authData = JSON.parse(decoded);     // JSON string → object
      //----
      // Dispatch the auth data to Redux store
      

      console.log("Telegram Auth Data:", authData);
    } catch (err) {
      console.error("Decode error:", err);
      setError("Failed to parse Telegram auth data");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/v1/auth/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          const payload = {
            user: {
              id: data.user.id,
              telegramId: data.user.telegramId,
              username: data.user.username,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              photoUrl: data.user.photoUrl,
            },
            token: data.token
          };
          dispatch(login(payload));
          navigate("/");
        } else {
          setError(data.message || "Telegram login failed");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    // 🧹 Clean up URL (so refresh doesn’t break)
    window.history.replaceState({}, "", "/telegram-callback");
  }, [navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Logging in with Telegram...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return null;
};

export default TelegramCallback;
