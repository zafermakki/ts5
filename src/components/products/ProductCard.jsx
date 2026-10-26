import { useState } from 'react';
import { ArrowUpRight, Check, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart.js';
import { formatCategory, formatCurrency } from '../../utils/cartUtils.js';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, cartItems } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const image = product.thumbnail || product.images?.[0];
  const isInCart = cartItems.some((item) => item.id === product.id);
  const outOfStock = Number(product.stock) <= 0;

  function handleAddToCart() {
    addToCart(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  }

  return (
    <article className="product-card" style={{ '--card-index': index }}>
      <div className="product-image-wrap">
        <Link to={`/products/${product.id}`} className="product-image-link" aria-label={`View ${product.title}`}>
          {image ? <img src={image} alt={product.title} loading="lazy" /> : <div className="image-fallback">t&co.</div>}
        </Link>
        <span className="product-category-tag">{formatCategory(product.category)}</span>
        <Link to={`/products/${product.id}`} className="product-quick-view" aria-label={`View details for ${product.title}`}>
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="product-card-info">
        <div className="product-card-topline">
          <span className="product-brand">{product.brand || 'THE EVERYDAY EDIT'}</span>
          <span className="product-rating"><Star size={12} fill="currentColor" /> {Number(product.rating || 0).toFixed(1)}</span>
        </div>
        <Link to={`/products/${product.id}`} className="product-title-link">
          <h3>{product.title}</h3>
        </Link>
        <div className="product-card-bottom">
          <span className="product-price">{formatCurrency(product.price)}</span>
          <button
            type="button"
            className={`add-product-button ${justAdded ? 'add-product-button-added' : ''}`}
            onClick={handleAddToCart}
            disabled={outOfStock}
            aria-label={outOfStock ? `${product.title} is out of stock` : `Add ${product.title} to bag`}
          >
            {outOfStock ? <span>Sold out</span> : justAdded ? <><Check size={16} /> Added</> : isInCart ? <><Plus size={16} /> Add more</> : <><Plus size={16} /> Add to bag</>}
          </button>
        </div>
      </div>
    </article>
  );
}