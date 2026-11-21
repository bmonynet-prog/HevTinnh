import { useState } from "react";
import "./authpage.css";

function LoginPage({ login, onNavigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const submitLogin = (event) => {
    event.preventDefault();
    const result = login(form);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    onNavigate("profile");
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submitLogin}>
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />
        </label>
        {message && <p className="form-message">{message}</p>}
        <button className="button primary">Login</button>
        <button
          className="inline-link centered"
          type="button"
          onClick={() => onNavigate("register")}
        >
          Create an account
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
