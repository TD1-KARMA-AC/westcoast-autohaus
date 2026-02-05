import { Link, NavLink } from 'react-router-dom';

const LOGO_URL = 'https://westcoastautohaus.com.au/wp-content/uploads/2025/12/220x60_rvsd.svg';

export default function Header({ onOpenLookingForCar, onOpenGeneralEnquiry }) {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <img src={LOGO_URL} alt="West Coast Autohaus" />
        </Link>
        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'header-link active' : 'header-link'}>
            Buy Cars
          </NavLink>
          <NavLink to="/sell" className={({ isActive }) => isActive ? 'header-link active' : 'header-link'}>
            Sell Your Car
          </NavLink>
          <button type="button" className="header-link header-btn" onClick={onOpenLookingForCar}>
            Looking for a car?
          </button>
          <button type="button" className="header-link header-btn" onClick={onOpenGeneralEnquiry}>
            General enquiry
          </button>
        </nav>
      </div>
    </header>
  );
}
