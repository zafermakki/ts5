import { ArrowUpRight, Heart, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer" id="our-promise">
      <div className="footer-main page-container">
        <div className="footer-brand-block">
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark"><Leaf size={19} strokeWidth={2.1} /></span>
            <span className="brand-name">teal <span>&</span> co.</span>
            <span className="brand-period">.</span>
          </Link>
          <p>Good things for everyday life.<br />Thoughtfully found, simply enjoyed.</p>
        </div>
        <div className="footer-column">
          <span className="footer-heading">Explore</span>
          <Link to="/#shop">Shop all <ArrowUpRight size={13} /></Link>
          <Link to="/cart">Your shopping bag</Link>
          <Link to="/">New discoveries</Link>
        </div>
        <div className="footer-column">
          <span className="footer-heading">The little things</span>
          <span><Truck size={15} /> Free shipping over $75</span>
          <span><ShieldCheck size={15} /> Secure demo checkout</span>
          <span><Heart size={15} /> Made for everyday</span>
        </div>
      </div>
      <div className="footer-bottom page-container">
        <span>© {new Date().getFullYear()} teal & co. — A demo storefront.</span>
        <span className="footer-made">Designed with care <Heart size={13} fill="currentColor" /></span>
      </div>
    </footer>
  );
}