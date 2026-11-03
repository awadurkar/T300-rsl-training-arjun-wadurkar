import type { Product } from "./products";

type ProductCardProps = {
  product: Product;
};

const statusStyles: Record<Product["status"], string> = {
  "In stock": "bg-emerald-50 text-emerald-700",
  "Low stock": "bg-amber-50 text-amber-700",
  "Out of stock": "bg-slate-100 text-slate-600",
};

export function ProductCard({ product }: ProductCardProps) {
  const isUnavailable = product.status === "Out of stock";

  return (
    <article className="overflow-hidden rounded-card border border-slate-200 bg-white shadow-soft">
      <img
        className="h-48 w-full object-cover"
        src={product.image}
        alt={product.imageAlt}
        loading="lazy"
      />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-ink">{product.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{product.category}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[product.status]}`}
          >
            {product.status}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-lg font-semibold text-ink">{product.price}</p>
          <button
            type="button"
            disabled={isUnavailable}
            className="rounded-lg bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUnavailable ? "Unavailable" : "Edit product"}
          </button>
        </div>
      </div>
    </article>
  );
}
