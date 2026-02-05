import { Link } from 'react-router-dom';
import { useInventory } from '../hooks/useInventory';
import CarGrid from '../components/CarGrid';

export default function Home({ onOpenLookingForCar, onOpenGeneralEnquiry }) {
  const { cars, lastScrapedAt, loading, error } = useInventory();

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-cta-row">
          <Link to="/sell" className="cta-button cta-primary">
            <span className="cta-icon">💰</span>
            Sell Your Car Today – Perth's Fastest Buyer
          </Link>
          <button type="button" className="cta-button cta-secondary" onClick={onOpenLookingForCar}>
            🔍 Looking for a car?
          </button>
          <button type="button" className="cta-button cta-secondary" onClick={onOpenGeneralEnquiry}>
            ✉️ General enquiry
          </button>
        </div>
      </div>
      <CarGrid
        cars={cars}
        loading={loading}
        error={error}
        lastScrapedAt={lastScrapedAt}
      />
    </div>
  );
}
