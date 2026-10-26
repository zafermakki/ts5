import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-container not-found-page">
      <div className="not-found-illustration"><Compass size={56} strokeWidth={1.2} /><span>404</span></div>
      <span className="eyebrow">A LITTLE OFF THE MAP</span>
      <h1>This page took<br /><em>the scenic route.</em></h1>
      <p>We couldn't find what you were looking for. Let's get you back to the good stuff.</p>
      <Link className="button button-primary" to="/"><ArrowLeft size={17} /> Back to the shop</Link>
    </div>
  );
}