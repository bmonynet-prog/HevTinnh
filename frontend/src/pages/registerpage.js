import { useState } from "react";
import "./authpage.css";

function RegisterPage({ register, onNavigate }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const submitRegister = (event) => {
    event.preventDefault();
    const result = register(form);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    onNavigate("profile");
  };

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submitRegister}>
        <p className="eyebrow">New customer</p>
        <h1>Create account</h1>
        <label>
          Name
          <input name="name" value={form.name} onChange={updateField} required />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={updateField}
            required
          />
        </label>
        {message && <p className="form-message">{message}</p>}
        <button className="button primary">Register</button>
        <button
          className="inline-link centered"
          type="button"
          onClick={() => onNavigate("login")}
        >
          Already have an account
        </button>
      </form>
    </section>
  );
}

export default RegisterPage;
