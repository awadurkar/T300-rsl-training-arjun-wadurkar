import { ComponentLibraryDemo } from "./exercise-2-library/ComponentLibraryDemo";
import { ProductDashboard } from "./exercise-1-dashboard/ProductDashboard";

const navigation = [
  { href: "#dashboard", label: "Dashboard" },
  { href: "#component-library", label: "Component library" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-canvas text-ink lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="border-b border-slate-200 bg-white px-5 py-4 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
        <a
          href="#dashboard"
          className="text-base font-bold tracking-tight text-ink focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
        >
          Simple Commerce
        </a>
        <nav
          aria-label="Main navigation"
          className="mt-4 flex gap-2 overflow-x-auto lg:mt-10 lg:flex-col"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <ProductDashboard />
        <ComponentLibraryDemo />
        <footer className="mt-12 border-t border-slate-200 py-6 text-sm text-slate-500">
          Styling paradigms · React, Tailwind CSS, and Vanilla Extract
        </footer>
      </main>
    </div>
  );
}
