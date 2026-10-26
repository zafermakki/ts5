import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Heart, Minus, Plus, ShieldCheck, Star, Truck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import { getProductById } from '../services/productService.js';
import { formatCategory, formatCurrency } from '../utils/cartUtils.js';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    setProduct(null);
    setSelectedImage('');
    setQuantity(1);

    getProductById(id)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        setSelectedImage(data.thumbnail || data.images?.[0] || '');
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message || 'We could not find that product.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return <div className="page-container details-loading"><div className="details-skeleton-image shimmer" /><div className="details-skeleton-copy"><div className="skeleton-line skeleton-short shimmer" /><div className="skeleton-line shimmer" /><div className="skeleton-line shimmer" /><div className="skeleton-line skeleton-price shimmer" /></div></div>;
  }

  if (error || !product) {
    return <div className="page-container"><div className="state-panel state-panel-error" role="alert"><h2>We couldn't find that item.</h2><p>{error || 'This product may no longer be available.'}</p><Link className="button button-primary" to="/">Back to the collection</Link></div></div>;
  }

  const gallery = [...new Set([product.thumbnail, ...(product.images || [])].filter(Boolean))];
  const inCartQuantity = cartItems.find((item) => item.id === product.id)?.quantity || 0;
  const outOfStock = Number(product.stock) <= 0;

  function handleAdd() {
    for (let index = 0; index < quantity; index += 1) addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="page-container product-details-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><a href="/#shop">Shop</a><span>/</span><span>{product.title}</span></div>
      <Link to="/#shop" className="back-link"><ArrowLeft size={16} /> Back to the collection</Link>

      <div className="product-details-layout">
        <div className="product-gallery">
          <div className="product-main-image">
            {selectedImage ? <img src={selectedImage} alt={product.title} /> : <div className="image-fallback">t&co.</div>}
            <span className="gallery-category-tag">{formatCategory(product.category)}</span>
          </div>
          {gallery.length > 1 && <div className="product-thumbnail-row">{gallery.map((image, index) => <button key={image} className={`product-thumbnail ${selectedImage === image ? 'product-thumbnail-active' : ''}`} type="button" onClick={() => setSelectedImage(image)} aria-label={`View product image ${index + 1}`}><img src={image} alt="" /></button>)}</div>}
        </div>

        <div className="product-details-copy">
          <span className="eyebrow details-eyebrow">THE EVERYDAY EDIT</span>
          <p className="details-category">{formatCategory(product.category)}{product.brand ? ` / ${product.brand}` : ''}</p>
          <h1>{product.title}</h1>
          <div className="details-rating"><span className="rating-stars"><Star size={15} fill="currentColor" /> {Number(product.rating || 0).toFixed(1)}</span><span className="rating-divider" /><span>Thoughtfully picked</span><span className="rating-divider" /><span>Item #{product.id}</span></div>
          <div className="details-price-row"><span className="details-price">{formatCurrency(product.price)}</span><span className={`stock-status ${outOfStock ? 'stock-status-out' : ''}`}><span />{outOfStock ? 'Currently unavailable' : product.stock < 10 ? `Only ${product.stock} left` : 'Ready to ship'}</span></div>
          <p className="details-description">{product.description || 'A considered everyday find, chosen to bring a little more ease and enjoyment to your routine.'}</p>

          <div className="details-divider" />
          <div className="details-quantity-row"><span>Quantity</span><div className="quantity-control details-quantity-control"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))} disabled={quantity <= 1}><Minus size={14} /></button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => Math.min(Math.max(1, Number(product.stock) || 1), current + 1))} disabled={outOfStock || quantity >= product.stock}><Plus size={14} /></button></div></div>
          <button type="button" className="button button-primary details-add-button" onClick={handleAdd} disabled={outOfStock}>{added ? <><Check size={18} /> Added to your bag</> : <>{outOfStock ? 'Currently unavailable' : 'Add to bag'} <span>{formatCurrency(product.price * quantity)}</span></>}</button>
          {inCartQuantity > 0 && <p className="already-in-bag"><Check size={14} /> Already in your bag: {inCartQuantity}</p>}
          <p className="details-helper">A good choice, and even better when it arrives.</p>

          <div className="details-perks"><div><Truck size={18} /><span><strong>Easy delivery</strong><small>Free shipping over $75</small></span></div><div><ShieldCheck size={18} /><span><strong>Thoughtful checkout</strong><small>Secure demo experience</small></span></div><div><Heart size={18} /><span><strong>Picked with care</strong><small>Everyday things, made better</small></span></div></div>
        </div>
      </div>
    </div>
  );
}