import { motion } from "framer-motion";
import { BarChart3, Boxes, Megaphone, PackageCheck, Settings, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { analytics, products } from "../data/storeData.js";

const stats = [
  ["Total sales", "$392K", BarChart3],
  ["Orders", "2,663", PackageCheck],
  ["Customers", "18.4K", Users],
  ["Inventory", "190 SKUs", Boxes],
];

export default function AdminDashboard() {
  return (
    <section className="container-page py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div><p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">Admin</p><h1 className="mt-2 text-4xl font-black">Commerce dashboard</h1></div>
        <button className="btn-primary">Export monthly report</button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value, Icon], index) => (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} key={label} className="glass rounded-3xl p-6">
            <Icon className="text-brand-600" /><p className="mt-5 text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-black">{value}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="glass rounded-3xl p-6">
          <h2 className="mb-5 text-2xl font-black">Revenue statistics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics}><defs><linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1"><stop offset="5%" stopColor="#2878ff" stopOpacity={0.6} /><stop offset="95%" stopColor="#2878ff" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" opacity={0.2} /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area type="monotone" dataKey="revenue" stroke="#2878ff" fill="url(#revenue)" /></AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid gap-4">
          {[["Product management", Boxes], ["Order management", PackageCheck], ["Customer management", Users], ["Marketing tools", Megaphone], ["Store settings", Settings]].map(([label, Icon]) => <div key={label} className="glass flex items-center gap-4 rounded-3xl p-5"><Icon className="text-brand-600" /><div><h3 className="font-black">{label}</h3><p className="text-sm text-slate-500">CRUD-ready API module</p></div></div>)}
        </div>
      </div>
      <div className="glass mt-6 overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between p-6"><h2 className="text-2xl font-black">Product management</h2><button className="btn-secondary">Add product</button></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-500 dark:bg-white/5"><tr><th className="p-4">Product</th><th>Category</th><th>Stock</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{products.map((product) => <tr key={product.id} className="border-t border-slate-200 dark:border-white/10"><td className="flex items-center gap-3 p-4"><img className="size-12 rounded-xl object-cover" src={product.image} alt="" />{product.title}</td><td>{product.category}</td><td>{product.stock}</td><td>${product.salePrice}</td><td><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Active</span></td><td><button className="font-bold text-brand-600">Edit</button></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
