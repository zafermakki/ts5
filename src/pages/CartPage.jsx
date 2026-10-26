import { useState } from 'react';
import { ArrowLeft, CheckCircle2, CircleAlert, PackageOpen, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';
import useCart from '../hooks/useCart.js';
import { getSampleCart, normalizeRemoteCart } from '../services/cartService.js';

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    cartProductsCount,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    importCart,
  } = useCart();
  const [loadingSample, setLoadingSample] = useState(false);
  const [syncError, setSyncError] = useState('');
  const [syncMessage, setSyncMessage] = useState('');
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  async function handleLoadSampleCart() {
    setLoadingSample(true);
    setSyncError('');
    setSyncMessage('');
    try {
      const remoteProducts = await getSampleCart(1);
      const normalizedProducts = normalizeRemoteCart(remoteProducts);
      if (!normalizedProducts.length) throw new Error('The sample cart was empty. Please try again.');
      importCart(normalizedProducts);
      setSyncMessage('A sample cart was loaded from DummyJSON. It is saved locally in this browser.');
    } catch (error) {
      setSyncError(error.message || 'Could not load the sample cart.');
    } finally {
      setLoadingSample(false);
    }
  }

  function handleCheckout() {
    setCheckoutMessage(true);
  }

  return (
    <div className="page-container cart-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Your shopping bag</span></div>
      <div className="cart-page-heading">
        <div><span className="eyebrow">YOUR LITTLE LINE-UP</span><h1>Your shopping <em>bag.</em></h1><p>{cartCount === 0 ? 'Nothing in here just yet. Your next favourite is waiting.' : `${cartCount} ${cartCount === 1 ? 'item' : 'items'} across ${cartProductsCount} ${cartProductsCount === 1 ? 'product' : 'products'} — looking good.`}</p></div>
        {cartItems.length > 0 && <button type="button" className="text-button clear-bag-button" onClick={clearCart}>Clear bag</button>}
      </div>

      {syncMessage && <div className="inline-message inline-message-success" role="status"><CheckCircle2 size={17} />{syncMessage}</div>}
      {syncError && <div className="inline-message inline-message-error" role="alert"><CircleAlert size={17} />{syncError}</div>}

      {cartItems.length === 0 ? (
        <section className="empty-cart-panel">
          <div className="empty-cart-art"><span className="empty-cart-circle" /><ShoppingBag size={54} strokeWidth={1.25} /><Sparkles className="empty-cart-sparkle" size={22} /></div>
          <span className="eyebrow">A FRESH LITTLE START</span>
          <h2>Your bag is taking<br /><em>a little breather.</em></h2>
          <p>Once something catches your eye, it'll be right here. No rush — the good stuff is worth a look.</p>
          <div className="empty-cart-actions"><Link to="/#shop" className="button button-primary">Explore the collection <ArrowLeft className="button-arrow-flip" size={17} /></Link><button type="button" className="button button-secondary" onClick={handleLoadSampleCart} disabled={loadingSample}>{loadingSample ? <span className="button-spinner" /> : <PackageOpen size={17} />}{loadingSample ? 'Loading sample...' : 'Load sample cart from API'}</button></div>
          <span className="empty-cart-footnote">The sample cart is an optional API-sync demo.</span>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items-panel">
            <div className="cart-items-panel-heading"><div><span className="eyebrow">IN YOUR BAG</span><h2>The good stuff <span>({cartProductsCount})</span></h2></div><span className="cart-items-heading-note">Price</span></div>
            <div className="cart-items-list">{cartItems.map((item) => <CartItem key={item.id} item={item} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} onRemove={removeFromCart} />)}</div>
            <Link to="/#shop" className="continue-shopping-link"><ArrowLeft size={16} /> Keep discovering</Link>
          </section>
          <div className="cart-sidebar">
            <CartSummary subtotal={totalPrice} itemCount={cartCount} onCheckout={handleCheckout} />
            {checkoutMessage && <div className="checkout-demo-message" role="status"><CheckCircle2 size={17} /><div><strong>This is a demo checkout.</strong><span>No payment has been taken; checkout is outside this assignment.</span></div></div>}
            <div className="cart-care-note"><span className="cart-care-icon"><Sparkles size={16} /></span><p><strong>Good things are on their way.</strong><br />Your bag stays saved when you refresh this page.</p></div>
          </div>
        </div>
      )}
    </div>
  );
}