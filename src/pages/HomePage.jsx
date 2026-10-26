import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, BadgeCheck, Leaf, PackageCheck, Sparkles, Star, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductFilters from '../components/products/ProductFilters.jsx';
import ProductList from '../components/products/ProductList.jsx';
import useProducts from '../hooks/useProducts.js';
import { formatCurrency } from '../utils/cartUtils.js';

export default function HomePage() {
  const { products, categories, loading, error, refreshProducts } = useProducts();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = !query || [product.title, product.description, product.brand, product.category]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [products, search, selectedCategory, sortBy]);

  const heroProduct = products.find((product) => product.thumbnail || product.images?.[0]);
  const heroImage = heroProduct?.thumbnail || heroProduct?.images?.[0];

  return (
    <>
      <section className="hero-section page-container">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> THE EVERYDAY EDIT, REIMAGINED</div>
          <h1>Good things.<br /><em>Thoughtfully found.</em></h1>
          <p className="hero-description">Little upgrades, lasting favourites, and everyday essentials that just make sense. Meet your new favourite things.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#shop">Explore the collection <ArrowDownRight size={17} /></a>
            <Link className="hero-text-link" to="/cart">Your shopping bag <ArrowRight size={15} /></Link>
          </div>
          <div className="hero-social-proof">
            <div className="avatar-stack" aria-hidden="true"><span>J</span><span>M</span><span>A</span><span>+</span></div>
            <div><div className="proof-stars"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div><span>Loved for the little details</span></div>
          </div>
        </div>

        <div className="hero-art" aria-label="Featured product preview">
          <div className="hero-art-circle hero-art-circle-one" />
          <div className="hero-art-circle hero-art-circle-two" />
          <div className="hero-floating-note"><Sparkles size={15} /> A little something lovely</div>
          <div className="hero-product-card">
            <div className="hero-product-image">
              {heroImage ? <img src={heroImage} alt={heroProduct?.title || 'Featured item'} /> : <div className="hero-image-placeholder"><Leaf size={72} /></div>}
            </div>
            <div className="hero-product-details">
              <div><span className="hero-product-kicker">A GOOD PLACE TO START</span><h2>{heroProduct?.title || 'Everyday favourites'}</h2></div>
              <span className="hero-product-price">{heroProduct ? formatCurrency(heroProduct.price) : 'Just lovely'}</span>
            </div>
            <Link to={heroProduct ? `/products/${heroProduct.id}` : '/#shop'} className="hero-product-link" aria-label="Explore featured product"><ArrowRight size={18} /></Link>
          </div>
          <div className="hero-sticker"><span>GOOD</span><span>FINDS</span><span>ONLY <Sparkles size={12} /></span></div>
          <div className="hero-art-caption"><span className="caption-line" /> The things you'll reach for, every day.</div>
        </div>
        <span className="hero-index">01 <span>/</span> THE COLLECTION</span>
      </section>

      <section className="promise-strip page-container" aria-label="Shopping benefits">
        <div className="promise-item"><span className="promise-icon"><Truck size={19} /></span><div><strong>Easy, breezy delivery</strong><span>Free over $75</span></div></div>
        <div className="promise-divider" />
        <div className="promise-item"><span className="promise-icon"><BadgeCheck size={19} /></span><div><strong>Thoughtful selection</strong><span>Good picks, no fuss</span></div></div>
        <div className="promise-divider" />
        <div className="promise-item"><span className="promise-icon"><Leaf size={19} /></span><div><strong>Everyday goodness</strong><span>Made to fit your life</span></div></div>
      </section>

      <section className="shop-section page-container" id="shop">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow section-eyebrow">A FEW VERY GOOD THINGS</span>
            <h2>Find your <em>something.</em></h2>
            <p>Useful, lovely, and ready to become part of your everyday.</p>
          </div>
          <span className="collection-mark"><span>THE</span><strong>t&co.</strong><span>COLLECTION</span></span>
        </div>

        <ProductFilters
          search={search}
          setSearch={setSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resultCount={visibleProducts.length}
        />
        <ProductList products={visibleProducts} loading={loading} error={error} onRetry={refreshProducts} />
      </section>

      <section className="closing-banner page-container">
        <div className="closing-banner-mark"><Leaf size={22} /></div>
        <div><span className="eyebrow">A LITTLE REMINDER</span><h2>Good everyday things.<br /><em>Better everyday moments.</em></h2></div>
        <a className="closing-banner-link" href="#shop">Find your next favourite <ArrowRight size={17} /></a>
      </section>
    </>
  );
}