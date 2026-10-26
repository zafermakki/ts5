import { Search, SlidersHorizontal, X } from 'lucide-react';
import { formatCategory } from '../../utils/cartUtils.js';

export default function ProductFilters({
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  resultCount,
}) {
  return (
    <div className="catalog-controls">
      <div className="catalog-control-top">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your next favourite..."
            aria-label="Search products"
          />
          {search && <button type="button" className="clear-search" aria-label="Clear search" onClick={() => setSearch('')}><X size={15} /></button>}
        </label>
        <label className="sort-select-wrap">
          <SlidersHorizontal size={16} />
          <span>Sort:</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products">
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A to Z</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>

      <div className="category-filter-row">
        <div className="category-pills" aria-label="Filter by category">
          <button type="button" className={`category-pill ${selectedCategory === 'all' ? 'category-pill-active' : ''}`} onClick={() => setSelectedCategory('all')}>Everything</button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.slug}
              className={`category-pill ${selectedCategory === category.slug ? 'category-pill-active' : ''}`}
              onClick={() => setSelectedCategory(category.slug)}
            >
              {formatCategory(category.name)}
            </button>
          ))}
        </div>
        <span className="result-count">{resultCount} {resultCount === 1 ? 'find' : 'finds'}</span>
      </div>
    </div>
  );
}