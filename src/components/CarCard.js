import { Phone, Mail } from 'lucide-react';

const PHONE = '0412001517';
const EMAIL = 'sean@westcoastautohaus.com.au';
const CONTACT_NAME = 'Sean';

function formatPrice(n) {
  if (!n || n === 0) return 'POA';
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n);
}

function formatMileage(n) {
  if (!n) return '—';
  return `${(n / 1000).toFixed(0)}k km`;
}

export default function CarCard({ car }) {
  const { stockNumber, title, price, mileage, transmission, fuelType, features = [], imageUrl, link } = car;
  const tel = `tel:${PHONE.replace(/\s/g, '')}`;
  const mailTo = `mailto:${EMAIL}?subject=Enquiry: ${encodeURIComponent(title || 'Vehicle')} - ${stockNumber}`;

  return (
    <article className="car-card">
      <a href={link || '#'} target="_blank" rel="noopener noreferrer" className="car-card-image-wrap">
        <div className="car-card-image" style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}>
          {!imageUrl && <div className="car-card-image-placeholder" />}
          <div className="car-card-overlay" />
        </div>
        <span className="car-card-badge">{stockNumber}</span>
      </a>
      <div className="car-card-body">
        <h2 className="car-card-title">{title || 'Vehicle'}</h2>
        <p className="car-card-price">{formatPrice(price)}</p>
        <ul className="car-card-specs">
          <li>{formatMileage(mileage)}</li>
          <li>{transmission || '—'}</li>
          <li>{fuelType || '—'}</li>
        </ul>
        {features.length > 0 && (
          <div className="car-card-features">
            {features.slice(0, 5).map((f, i) => (
              <span key={i} className="car-card-pill">{f}</span>
            ))}
          </div>
        )}
        <div className="car-card-actions">
          <a href={tel} className="btn-call">
            <Phone size={18} /> Call {CONTACT_NAME}
          </a>
          <a href={mailTo} className="btn-email">
            <Mail size={18} /> Email
          </a>
        </div>
      </div>
    </article>
  );
}
