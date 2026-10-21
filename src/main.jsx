import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles.css';

const queryClient = new QueryClient();
const PRODUCTS_URL = 'https://fakestoreapi.com/products';

async function fetchProducts({ queryKey }) {
  const [, { search }] = queryKey;
  const response = await fetch(PRODUCTS_URL);

  if (!response.ok) {
    throw new Error(`Unable to load products (${response.status}). Please try again.`);
  }

  const products = await response.json();

  if (!Array.isArray(products)) {
    throw new Error('The products service returned an unexpected response.');
  }

  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) {
    return products;
  }

  return products.filter((product) =>
    [product.title, product.description, product.category]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedSearch)),
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img className="product-image" src={product.image} alt={product.title} />
      </div>
      <div className="product-details">
        <p className="product-category">{product.category}</p>
        <h2>{product.title}</h2>
        <div className="product-meta">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-rating" aria-label={`Rating ${product.rating?.rate ?? 'unavailable'}`}>
            ★ {product.rating?.rate ?? '—'}
          </span>
        </div>
      </div>
    </article>
  );
}

function ProductListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: products,
    isPending,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', { search: searchTerm }],
    queryFn: fetchProducts,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">DISCOVER THE COLLECTION</p>
          <h1>Products</h1>
          <p className="intro">
            Browse the catalog and find something you love.
          </p>
        </div>
        <span className="header-mark" aria-hidden="true">PQ</span>
      </header>

      <section className="catalog" aria-label="Product catalog">
        <div className="catalog-toolbar">
          <label className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="visually-hidden">Search products</span>
            <input
              type="search"
              placeholder="Search products, categories..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>
            )}
          </label>
          <button
            className="refresh-button"
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <span className={isFetching ? 'refresh-icon spinning' : 'refresh-icon'} aria-hidden="true">
              ↻
            </span>
            {isFetching ? 'Refreshing…' : 'Refresh products'}
          </button>
        </div>

        {isFetching && !isPending && !isError && (
          <p className="fetching-note" role="status">
            Updating products. Your current results stay visible.
          </p>
        )}

        {isPending && (
          <div className="state-panel" role="status">
            <span className="spinner" aria-hidden="true" />
            <h2>Loading products</h2>
            <p>Fetching the latest catalog…</p>
          </div>
        )}

        {isError && (
          <div className="state-panel error-panel" role="alert">
            <span className="state-symbol" aria-hidden="true">!</span>
            <h2>We couldn’t load the products</h2>
            <p>{error.message}</p>
            <button className="retry-button" type="button" onClick={() => refetch()}>
              Try again
            </button>
          </div>
        )}

        {isSuccess && (
          <>
            <div className="results-heading">
              <p>
                {products.length} {products.length === 1 ? 'product' : 'products'}
                {searchTerm && <> matching <strong>“{searchTerm}”</strong></>}
              </p>
              {isFetching && <span className="inline-progress">Syncing</span>}
            </div>
            {products.length > 0 ? (
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="state-panel empty-panel">
                <span className="state-symbol" aria-hidden="true">⌕</span>
                <h2>No products found</h2>
                <p>Try a different search term or clear your search.</p>
                <button className="retry-button" type="button" onClick={() => setSearchTerm('')}>
                  Clear search
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductListing />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
