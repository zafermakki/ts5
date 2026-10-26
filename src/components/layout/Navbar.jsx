import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, ShoppingBag, X } from 'lucide-react';
import useCart from '../../hooks/useCart.js';

export default function Navbar() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  function closeMenu() {
    setMenuOpen(false);
  }

  const homeActive = location.pathname === '/';

  return (
    <header className="site-header">
      <div className="header-inner page-container">
        <Link to="/" className="brand" aria-label="teal and co home" onClick={closeMenu}>
          <span className="brand-mark"><ShoppingBag size={19} strokeWidth={2.2} /></span>
          <span className="brand-name">teal <span>&</span> co.</span>
          <span className="brand-period">.</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMenu}>
            Home
          </NavLink>
          <Link to="/#shop" className={`nav-link ${homeActive && location.hash === '#shop' ? 'nav-link-active' : ''}`} onClick={closeMenu}>
            Shop all <ArrowUpRight size={14} />
          </Link>
          <Link to="/#our-promise" className="nav-link" onClick={closeMenu}>Our promise</Link>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-link" aria-label={`Shopping bag, ${cartCount} items`} onClick={closeMenu}>
            <ShoppingBag size={19} strokeWidth={1.8} />
            <span className="cart-link-label">Bag</span>
            <span className="cart-count">{cartCount}</span>
          </Link>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}