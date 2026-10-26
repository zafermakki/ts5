import { ArrowRight, LockKeyhole, PackageCheck, Tag } from 'lucide-react';
import { formatCurrency } from '../../utils/cartUtils.js';

const FREE_SHIPPING_THRESHOLD = 75;
const SHIPPING_FEE = 6.95;

export default function CartSummary({ subtotal, itemCount, onCheckout }) {
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <aside className="cart-summary">
      <div className="summary-heading"><span>THE TOTALS</span><Tag size={17} /></div>
      {subtotal > 0 && amountUntilFreeShipping > 0 && (
        <div className="shipping-progress-block">
          <p>Add <strong>{formatCurrency(amountUntilFreeShipping)}</strong> for complimentary shipping.</p>
          <div className="shipping-progress-track"><span style={{ width: `${progress}%` }} /></div>
        </div>
      )}
      {subtotal >= FREE_SHIPPING_THRESHOLD && <p className="free-shipping-message"><PackageCheck size={16} /> You've unlocked free shipping!</p>}
      <div className="summary-line"><span>Subtotal <span className="summary-muted">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span></span><strong>{formatCurrency(subtotal)}</strong></div>
      <div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}</strong></div>
      <div className="summary-total"><span>Estimated total</span><strong>{formatCurrency(subtotal + shipping)}</strong></div>
      <p className="summary-tax-note">Taxes included where applicable.</p>
      <button type="button" className="button button-primary checkout-button" onClick={onCheckout}>Continue to checkout <ArrowRight size={17} /></button>
      <p className="secure-note"><LockKeyhole size={14} /> Secure demo checkout</p>
    </aside>
  );
}