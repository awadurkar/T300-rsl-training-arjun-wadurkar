export function SearchInput({ ref, value, onChange }) {
  return (
    <input
      ref={ref}
      type="search"
      aria-label="Search products"
      placeholder="Search products"
      value={value}
      onChange={onChange}
    />
  )
}