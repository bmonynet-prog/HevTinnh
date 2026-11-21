import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { categories, products, testimonials } from "../data/catalog.js";

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden">
        <div className="container-page grid min-h-[calc(100vh-5rem)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-600 dark:bg-brand-500/10">
              <Sparkles size={16} /> Premium commerce experience
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-black tracking-normal text-ink dark:text-white sm:text-6xl lg:text-7xl">Shop flagship technology with a checkout built for speed.</h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">A polished Amazon-scale catalog, Shopify-style operations, and Apple-inspired product storytelling in one responsive app.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">Explore products <ArrowRight size={18} /></Link>
              <Link to="/admin" className="btn-secondary">View admin dashboard</Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[["Fast shipping", Truck], ["Secure checkout", ShieldCheck], ["Curated drops", Sparkles]].map(([label, Icon]) => (
                <div key={label} className="glass rounded-3xl p-4"><Icon className="mb-3 text-brand-600" /><p className="font-semibold">{label}</p></div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="absolute inset-8 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-4">
              <img className="h-[560px] w-full rounded-[1.5rem] object-cover" src={products[0].image} alt={products[0].title} />
              <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/80 p-5 backdrop-blur-xl dark:bg-ink/70">
                <p className="text-sm font-semibold text-brand-600">Today only</p>
                <div className="mt-1 flex items-center justify-between gap-3"><h2 className="text-xl font-black">{products[0].title}</h2><span className="text-2xl font-black">${products[0].salePrice}</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-page space-y-8 py-10">
        <div className="flex items-end justify-between gap-4"><h2 className="section-title">Featured products</h2><Link to="/shop" className="text-sm font-bold text-brand-600">View all</Link></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="container-page grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.id} to="/shop" className="group relative h-64 overflow-hidden rounded-3xl">
            <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={category.image} alt={category.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
            <h3 className="absolute bottom-5 left-5 text-2xl font-black text-white">{category.name}</h3>
          </Link>
        ))}
      </section>

      <section className="container-page grid gap-5 py-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] bg-ink p-8 text-white dark:bg-white dark:text-ink">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-500">Brand showcase</p>
          <h2 className="mt-4 text-4xl font-black">Built for modern retail teams and demanding shoppers.</h2>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-sm font-bold text-slate-300 dark:text-slate-600"><span>Nova</span><span>Aura</span><span>Pulse</span></div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">{testimonials.map((item) => <div className="glass rounded-3xl p-6" key={item.name}><p className="leading-7 text-slate-600 dark:text-slate-300">"{item.quote}"</p><p className="mt-5 font-bold">{item.name}</p><p className="text-sm text-slate-500">{item.role}</p></div>)}</div>
      </section>

      <section className="container-page py-10">
        <div className="glass grid gap-5 rounded-[2rem] p-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div><h2 className="section-title">Join the private drop list</h2><p className="mt-2 text-slate-600 dark:text-slate-300">Promotions, launch alerts, and member-only bundles.</p></div>
          <form className="flex gap-3"><input className="input min-w-0" placeholder="Email address" type="email" /><button className="btn-primary whitespace-nowrap">Subscribe</button></form>
        </div>
      </section>
    </>
  );
}
