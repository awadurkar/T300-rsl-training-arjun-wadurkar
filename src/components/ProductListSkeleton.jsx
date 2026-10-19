const skeletonCards = Array.from({ length: 8 }, (_, index) => index)

export default function ProductListSkeleton() {
  return (
    <section
      className="product-skeleton"
      aria-label="Loading products"
      aria-busy="true"
    >
      <div className="skeleton-heading" />
      <div className="product-grid">
        {skeletonCards.map((card) => (
          <article className="skeleton-card" key={card} aria-hidden="true">
            <div className="skeleton-image" />
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-category" />
            <div className="skeleton-line skeleton-price" />
            <div className="skeleton-button" />
          </article>
        ))}
      </div>
      <p className="visually-hidden" role="status">
        Loading products…
      </p>
    </section>
  )
}
