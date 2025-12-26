import { useState } from "react";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function submit(e) {
    e.preventDefault();
    if (user.trim() && pass.trim()) {
      onLogin();
    }
  }

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1527430253228-e93688616381)",
      }}
    >
      <form
        onSubmit={submit}
        className="bg-white/90 backdrop-blur p-6 w-80 rounded shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          PDF Editor Login
        </h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button className="bg-red-600 text-white w-full py-2">Login</button>
      </form>
    </div>
  );
}
