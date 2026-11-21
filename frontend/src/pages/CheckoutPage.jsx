import { CheckCircle2, CreditCard, Landmark, WalletCards } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function CheckoutPage() {
  const { total } = useCart();
  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Secure checkout</h1>
        <div className="glass rounded-3xl p-6"><h2 className="mb-4 text-2xl font-black">Billing and shipping</h2><div className="grid gap-4 sm:grid-cols-2"><input className="input" placeholder="Full name" /><input className="input" placeholder="Phone" /><input className="input sm:col-span-2" placeholder="Street address" /><input className="input" placeholder="City" /><input className="input" placeholder="Postal code" /></div></div>
        <div className="glass rounded-3xl p-6"><h2 className="mb-4 text-2xl font-black">Payment method</h2><div className="grid gap-3 sm:grid-cols-3">{[[CreditCard, "Stripe card"], [WalletCards, "PayPal"], [Landmark, "ABA PayWay"]].map(([Icon, label]) => <label key={label} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 font-bold dark:border-white/10"><input name="payment" type="radio" defaultChecked={label === "Stripe card"} /><Icon />{label}</label>)}</div></div>
      </div>
      <aside className="glass h-fit rounded-3xl p-6"><CheckCircle2 className="text-emerald-500" size={40} /><h2 className="mt-4 text-2xl font-black">Order review</h2><p className="mt-2 text-slate-600 dark:text-slate-300">Payments are integration-ready. Add real keys in environment variables to activate providers.</p><p className="mt-6 flex justify-between text-xl font-black"><span>Total</span><span>${total.toFixed(2)}</span></p><button className="btn-primary mt-6 w-full">Place order</button></aside>
    </section>
  );
}
