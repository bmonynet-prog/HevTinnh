import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product, view = "grid" }) {
  const { addItem } = useCart();
  const isList = view === "list";

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className={`glass overflow-hidden rounded-3xl ${isList ? "grid gap-4 p-4 sm:grid-cols-[220px_1fr]" : ""}`}
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-3xl bg-slate-100 dark:bg-white/5">
        <img className={`w-full object-cover transition duration-500 hover:scale-105 ${isList ? "h-52" : "h-72"}`} src={product.image} alt={product.title} />
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">{product.badge}</p>
            <Link to={`/product/${product.id}`} className="mt-2 block text-lg font-bold text-ink hover:text-brand-600 dark:text-white">
              {product.title}
            </Link>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{product.category}</p>
          </div>
          <button className="rounded-full bg-white/80 p-3 text-slate-600 transition hover:text-rose-500 dark:bg-white/10 dark:text-slate-200" aria-label="Add to wishlist">
            <Heart size={18} />
          </button>
        </div>
        {isList && <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{product.description}</p>}
        <div className="flex items-center gap-2 text-sm text-amber-500">
          <Star size={16} fill="currentColor" />
          <span className="font-semibold text-ink dark:text-white">{product.rating}</span>
          <span className="text-slate-500">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-2xl font-black text-ink dark:text-white">${product.salePrice}</span>
            <span className="ml-2 text-sm text-slate-400 line-through">${product.price}</span>
          </div>
          <button onClick={() => addItem(product)} className="btn-primary px-4 py-3" aria-label={`Add ${product.title} to cart`}>
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
