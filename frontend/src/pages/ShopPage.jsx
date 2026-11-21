import { Grid2X2, List, Search } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/catalog.js";

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filtered = useMemo(() => {
    return products
      .filter((product) => category === "All" || product.category === category)
      .filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (sort === "price") return a.salePrice - b.salePrice;
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "popularity") return b.reviews - a.reviews;
        return b.id.localeCompare(a.id);
      });
  }, [category, query, sort]);

  return (
    <section className="container-page py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div><p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">Shop</p><h1 className="mt-2 text-4xl font-black">Advanced product catalog</h1></div>
        <div className="flex flex-wrap gap-3">
          <label className="input flex max-w-sm items-center gap-2"><Search size={18} /><input className="w-full bg-transparent outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /></label>
          <select className="input w-auto" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
          <select className="input w-auto" value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest</option><option value="price">Price</option><option value="popularity">Popularity</option><option value="rating">Rating</option></select>
          <button className="btn-secondary px-4" onClick={() => setView(view === "grid" ? "list" : "grid")}>{view === "grid" ? <List /> : <Grid2X2 />}</button>
        </div>
      </div>
      <div className={view === "grid" ? "grid gap-5 md:grid-cols-2 lg:grid-cols-3" : "grid gap-5"}>{filtered.map((product) => <ProductCard key={product.id} product={product} view={view} />)}</div>
      <div className="mt-8 flex justify-center gap-2">{[1, 2, 3].map((page) => <button key={page} className={`size-11 rounded-full font-bold ${page === 1 ? "bg-ink text-white dark:bg-white dark:text-ink" : "glass"}`}>{page}</button>)}</div>
    </section>
  );
}
