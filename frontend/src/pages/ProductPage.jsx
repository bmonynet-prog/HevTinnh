import { Heart, ShieldCheck, Star, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import { products } from "../data/storeData.js";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id) || products[0];
  const { addItem } = useCart();
  const related = products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <section className="container-page py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="glass overflow-hidden rounded-[2rem] p-4"><img className="h-[540px] w-full rounded-[1.5rem] object-cover transition duration-500 hover:scale-105" src={product.image} alt={product.title} /></div>
          <div className="grid grid-cols-4 gap-3">{[product.image, ...related.map((item) => item.image)].map((image) => <img key={image} className="h-24 rounded-2xl object-cover" src={image} alt="" />)}</div>
        </div>
        <div className="space-y-7">
          <div><p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">{product.category}</p><h1 className="mt-3 text-5xl font-black">{product.title}</h1></div>
          <div className="flex items-center gap-2 text-amber-500"><Star fill="currentColor" /><strong className="text-ink dark:text-white">{product.rating}</strong><span className="text-slate-500">{product.reviews} reviews</span></div>
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">{product.description}</p>
          <div className="flex items-end gap-3"><span className="text-5xl font-black">${product.salePrice}</span><span className="text-xl text-slate-400 line-through">${product.price}</span></div>
          <p className="font-semibold text-emerald-600">{product.stock} in stock and ready to ship</p>
          <div className="grid gap-3 sm:grid-cols-2">{product.specs.map((spec) => <div className="glass rounded-2xl p-4 font-semibold" key={spec}>{spec}</div>)}</div>
          <div className="flex flex-wrap gap-3"><button className="btn-primary" onClick={() => addItem(product)}>Add to cart</button><Link to="/checkout" onClick={() => addItem(product)} className="btn-secondary">Buy now</Link><button className="btn-secondary"><Heart size={18} /> Wishlist</button></div>
          <div className="grid gap-3 sm:grid-cols-2"><div className="flex gap-3 rounded-2xl bg-white p-4 dark:bg-white/10"><Truck className="text-brand-600" /><span>Fast shipping calculator at checkout</span></div><div className="flex gap-3 rounded-2xl bg-white p-4 dark:bg-white/10"><ShieldCheck className="text-brand-600" /><span>Secure payment gateway ready</span></div></div>
        </div>
      </div>
      <div className="mt-14"><h2 className="section-title mb-6">Related products</h2><div className="grid gap-5 md:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></div>
    </section>
  );
}
