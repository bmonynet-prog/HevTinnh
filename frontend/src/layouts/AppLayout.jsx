import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

const links = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Account", "/account"],
  ["Admin", "/admin"],
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-mist text-ink transition dark:bg-[#070a14] dark:text-white">
      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/75 backdrop-blur-2xl dark:border-white/10 dark:bg-[#070a14]/75">
        <nav className="container-page flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 font-black tracking-normal">
            <span className="grid size-11 place-items-center rounded-2xl bg-ink text-white shadow-glow dark:bg-white dark:text-ink">EN</span>
            <span>El Netto</span>
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            {links.map(([label, href]) => (
              <NavLink key={href} to={href} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-ink text-white dark:bg-white dark:text-ink" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"}`}>
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full p-3 transition hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Search"><Search size={20} /></button>
            <button onClick={toggleTheme} className="rounded-full p-3 transition hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/cart" className="relative rounded-full p-3 transition hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Cart">
              <ShoppingBag size={20} />
              {items.length > 0 && <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-brand-500 text-[11px] font-bold text-white">{items.length}</span>}
            </Link>
            <Link to="/account" className="hidden rounded-full p-3 transition hover:bg-slate-100 dark:hover:bg-white/10 sm:block" aria-label="Account"><User size={20} /></Link>
            <button onClick={() => setOpen((value) => !value)} className="rounded-full p-3 md:hidden" aria-label="Open menu">{open ? <X /> : <Menu />}</button>
          </div>
        </nav>
        {open && (
          <div className="container-page grid gap-2 pb-5 md:hidden">
            {links.map(([label, href]) => <NavLink onClick={() => setOpen(false)} key={href} to={href} className="rounded-2xl px-4 py-3 font-semibold hover:bg-slate-100 dark:hover:bg-white/10">{label}</NavLink>)}
          </div>
        )}
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="mt-20 border-t border-slate-200 py-10 dark:border-white/10">
        <div className="container-page flex flex-col justify-between gap-5 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
          <p>El Netto Commerce. Premium storefront, checkout, and admin operations.</p>
          <p>Stripe, PayPal, ABA PayWay, and Cloudinary ready.</p>
        </div>
      </footer>
    </div>
  );
}
