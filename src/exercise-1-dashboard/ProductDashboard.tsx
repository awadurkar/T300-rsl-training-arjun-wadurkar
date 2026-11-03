import { ProductCard } from "./ProductCard";
import { products } from "./products";

export function ProductDashboard() {
  return (
    <section id="dashboard" className="scroll-mt-6">
      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-brand-700">
            EXERCISE 1 · TAILWIND CSS
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">
            Product dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            A simple overview of your products and stock.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("component-library")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          View component library
        </button>
      </header>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">All products</h2>
        <p className="text-sm text-slate-500">{products.length} products</p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
