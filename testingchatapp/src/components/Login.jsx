import React, { useState } from "react";
import {jwtDecode} from "jwt-decode";
import api from "../utils/axios";
import useAuthStore from "../store/useAuthStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);

    try {
      const res = await api.post("/api/auth/login", {
        username,
        password,
      });
      console.log(res.data);
      useAuthStore.getState().setToken(res.data.token);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError("Error: " + errorMessage);
    }
  };

  const token = useAuthStore.getState().token;

  if (typeof token === "string" && token.trim() !== "") {
    try {
      const decode = jwtDecode(token);
      useAuthStore.getState().setUser(decode.userId);
    } catch (error) {
      console.error("Error decoding token:", error.message);
    }
  } else {
    console.warn("Invalid or missing token.");
  }

  return (
    <div className="flex flex-col gap-4 text-neutral-400">
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"

        className="p-2 px-4 bg-neutral-800  outline-none shadow-pink-400"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin(e);
          }
        }}
        placeholder="Password"
        className="p-2  px-4 bg-neutral-800  outline-none"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-neutral-300 mt-2  p-2 active:scale-95 cursor-pointer"
      >
        Login
      </button>
      {error && <div className="text-red-400 py-8">{error}</div>}
    </div>
  );
}