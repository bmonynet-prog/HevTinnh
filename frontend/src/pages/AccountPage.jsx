import { Bell, Heart, MapPin, Package, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AccountPage() {
  const { user, login, logout } = useAuth();
  const activeUser = user || { name: "Guest shopper", email: "guest@example.com", role: "customer" };
  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-[340px_1fr]">
      <aside className="glass h-fit rounded-3xl p-6">
        <div className="grid size-20 place-items-center rounded-3xl bg-ink text-2xl font-black text-white dark:bg-white dark:text-ink">{activeUser.name.slice(0, 1)}</div>
        <h1 className="mt-5 text-3xl font-black">{activeUser.name}</h1>
        <p className="text-slate-500">{activeUser.email}</p>
        <button onClick={() => (user ? logout() : login())} className="btn-primary mt-6 w-full">{user ? "Logout" : "Demo login"}</button>
      </aside>
      <div className="grid gap-5 md:grid-cols-2">
        {[["Profile management", UserRound], ["Order history", Package], ["Wishlist", Heart], ["Saved addresses", MapPin], ["Notifications", Bell], ["Payment methods", Package]].map(([label, Icon]) => (
          <div key={label} className="glass rounded-3xl p-6"><Icon className="text-brand-600" /><h2 className="mt-4 text-xl font-black">{label}</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Ready for API-backed account data, secure updates, and user preferences.</p></div>
        ))}
      </div>
    </section>
  );
}
