import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCategory, formatCurrency } from '../../utils/cartUtils.js';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const image = item.thumbnail || item.images?.[0];
  const atStockLimit = item.stock > 0 && item.quantity >= item.stock;

  return (
    <article className="cart-item">
      <Link to={`/products/${item.id}`} className="cart-item-image" aria-label={`View ${item.title}`}>
        {image ? <img src={image} alt={item.title} /> : <div className="image-fallback">t&co.</div>}
      </Link>
      <div className="cart-item-details">
        <span className="cart-item-category">{formatCategory(item.category)}</span>
        <Link to={`/products/${item.id}`} className="cart-item-title"><h3>{item.title}</h3></Link>
        <span className="cart-item-unit-price">{formatCurrency(item.price)} <span>each</span></span>
        <div className="cart-item-mobile-subtotal">{formatCurrency(item.price * item.quantity)}</div>
      </div>
      <div className="quantity-control" aria-label={`Quantity for ${item.title}`}>
        <button type="button" aria-label={`Decrease ${item.title} quantity`} onClick={() => onDecrease(item.id)} disabled={item.quantity <= 1}><Minus size={14} /></button>
        <span aria-live="polite">{item.quantity}</span>
        <button type="button" aria-label={`Increase ${item.title} quantity`} onClick={() => onIncrease(item.id)} disabled={atStockLimit}><Plus size={14} /></button>
      </div>
      <div className="cart-item-subtotal">{formatCurrency(item.price * item.quantity)}</div>
      <button className="remove-item-button" type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.title} from bag`}><Trash2 size={17} /></button>
    </article>
  );
}