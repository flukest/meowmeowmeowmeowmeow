import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

const TelegramCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    console.log("Raw hash:", hash);

    if (!hash.startsWith("#tgAuthResult=")) {
      setError("Telegram authentication failed");
      setLoading(false);
      return;
    }

    const tgAuthResult = hash.replace("#tgAuthResult=", "");
    let authData;

    try {
      const decoded = atob(tgAuthResult);
      authData = JSON.parse(decoded);
      console.log("Decoded Telegram Auth Data:", authData);
    } catch (err) {
      console.error("Failed to parse Telegram auth data:", err);
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

          dispatch(
            login({
              user: {
                id: data.user._id,
                telegramId: data.user.telegramId,
                username: data.user.username,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                photoUrl: data.user.photoUrl,
              },
              token: data.token,
            })
          );
          navigate("/");
        } else {
          setError(data.message || "Telegram login failed");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Something went wrong");
      })
      .finally(() => setLoading(false));

    // Clean the URL
    window.history.replaceState({}, "", "/telegram-callback");
  }, [navigate, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Logging in with Telegram...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return null;
};

export default TelegramCallback;
