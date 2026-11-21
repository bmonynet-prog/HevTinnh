import { useState } from "react";

function ProfilePage({ user, updateProfile }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
  });
  const [saved, setSaved] = useState(false);

  const updateField = (event) => {
    setSaved(false);
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const saveProfile = (event) => {
    event.preventDefault();
    updateProfile(form);
    setSaved(true);
  };

  return (
    <section className="page-section narrow">
      <p className="eyebrow">Account</p>
      <h1>Profile</h1>
      <form className="checkout-card checkout-form" onSubmit={saveProfile}>
        <div className="form-grid single-column">
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
            Default shipping address
            <input name="address" value={form.address} onChange={updateField} />
          </label>
        </div>
        {saved && <p className="form-message success">Profile updated.</p>}
        <button className="button primary checkout-button">Save profile</button>
      </form>
    </section>
  );
}

export default ProfilePage;
