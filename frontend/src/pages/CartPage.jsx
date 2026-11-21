import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
  const { items, updateQuantity, removeItem, saveForLater, subtotal, tax, shipping, total } = useCart();

  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="mb-6 text-4xl font-black">Shopping cart</h1>
        <div className="grid gap-4">
          {items.length === 0 && <div className="glass rounded-3xl p-8">Your cart is empty. <Link className="font-bold text-brand-600" to="/shop">Start shopping</Link>.</div>}
          {items.map((item) => (
            <div key={item.id} className="glass grid gap-4 rounded-3xl p-4 sm:grid-cols-[140px_1fr_auto]">
              <img className="h-36 rounded-2xl object-cover" src={item.image} alt={item.title} />
              <div><h2 className="text-xl font-bold">{item.title}</h2><p className="mt-2 text-slate-500">${item.salePrice} each</p><button onClick={() => saveForLater(item)} className="mt-4 text-sm font-bold text-brand-600">Save for later</button></div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <div className="flex items-center rounded-full bg-white p-1 dark:bg-white/10"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2"><Minus size={16} /></button><span className="px-3 font-bold">{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><Plus size={16} /></button></div>
                <button onClick={() => removeItem(item.id)} className="rounded-full p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="glass h-fit rounded-3xl p-6">
        <h2 className="text-2xl font-black">Order summary</h2>
        <input className="input mt-5" placeholder="Coupon code" />
        <div className="mt-5 space-y-3 text-sm"><p className="flex justify-between"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></p><p className="flex justify-between"><span>Tax</span><strong>${tax.toFixed(2)}</strong></p><p className="flex justify-between"><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong></p></div>
        <div className="my-5 border-t border-slate-200 dark:border-white/10" />
        <p className="flex justify-between text-xl font-black"><span>Total</span><span>${total.toFixed(2)}</span></p>
        <Link to="/checkout" className="btn-primary mt-6 w-full">Secure checkout</Link>
      </aside>
    </section>
  );
}
