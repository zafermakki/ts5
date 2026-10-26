import { AlertCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard.jsx';

function ProductSkeleton() {
  return (
    <div className="product-skeleton" aria-hidden="true">
      <div className="skeleton-image shimmer" />
      <div className="skeleton-line skeleton-short shimmer" />
      <div className="skeleton-line shimmer" />
      <div className="skeleton-line skeleton-price shimmer" />
    </div>
  );
}

export default function ProductList({ products, loading, error, onRetry }) {
  if (loading) {
    return <div className="product-grid" aria-label="Loading products">{Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)}</div>;
  }

  if (error) {
    return (
      <div className="state-panel state-panel-error" role="alert">
        <span className="state-icon"><AlertCircle size={24} /></span>
        <h3>We hit a little snag.</h3>
        <p>{error}</p>
        <button className="button button-primary" type="button" onClick={onRetry}><RefreshCw size={16} /> Try again</button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="state-panel">
        <span className="state-icon"><ShoppingBag size={24} /></span>
        <h3>No finds just yet.</h3>
        <p>Try a different search or choose another category.</p>
      </div>
    );
  }

  return <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>;
}