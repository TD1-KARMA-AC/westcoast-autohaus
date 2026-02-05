import { useState, useMemo } from 'react';
import CarCard from './CarCard';
import { ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' }
];

export default function CarGrid({ cars, loading, error, lastScrapedAt }) {
  const [sort, setSort] = useState('price-asc');

  const sortedCars = useMemo(() => {
    if (!cars.length) return [];
    const list = [...cars];
    if (sort === 'price-asc') list.sort((a, b) => (a.price || 0) - (b.price || 0));
    else list.sort((a, b) => (b.price || 0) - (a.price || 0));
    return list;
  }, [cars, sort]);

  const lastSyncText = lastScrapedAt
    ? new Date(lastScrapedAt).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' })
    : null;

  if (loading) {
    return (
      <section className="section">
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading inventory…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="error-state">
          <p className="error-message">{error}</p>
          <p className="error-hint">Inventory will retry on next refresh.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section-top">
        <div className="section-heading">
          <h1 className="section-title">Our Stock</h1>
          {lastSyncText && (
            <p className="last-synced">Last synced: {lastSyncText}</p>
          )}
        </div>
        <div className="sort-wrap">
          <label htmlFor="sort" className="sort-label">Sort by</label>
          <div className="sort-select-wrap">
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sort-select"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={18} className="sort-icon" />
          </div>
        </div>
      </div>
      {sortedCars.length === 0 ? (
        <div className="empty-state">
          <p>No vehicles in stock right now. Check back soon.</p>
        </div>
      ) : (
        <div className="car-grid">
          {sortedCars.map((car) => (
            <CarCard key={car.id || car.stockNumber} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
