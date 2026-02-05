import { useState } from 'react';
import { X } from 'lucide-react';

export default function LookingForCarModal({ onClose }) {
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [carType, setCarType] = useState('');
  const [financeOrCash, setFinanceOrCash] = useState('cash');
  const [timeframe, setTimeframe] = useState('browsing');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      type: 'looking_for_car',
      budgetRange: { min: budgetMin, max: budgetMax },
      carType,
      financeOrCash,
      timeframe,
      contact: { name, phone, email }
    };
    console.log('Looking for car submission:', payload);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">Thanks!</h2>
          <p className="modal-text">Sean will be in touch to help source the right car for you.</p>
          <button type="button" className="btn-close-modal" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <h2 className="modal-title">Looking for a car?</h2>
          <button type="button" className="modal-close-x" onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>
        <p className="modal-intro">Can&apos;t find what you want? Tell us what you&apos;re after and we&apos;ll help source it.</p>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Budget range (AUD)
            <div className="input-row">
              <input
                type="text"
                placeholder="Min"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
              />
              <span className="input-sep">–</span>
              <input
                type="text"
                placeholder="Max"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
              />
            </div>
          </label>
          <label>
            Car type (e.g. SUV, sedan, ute)
            <input
              type="text"
              placeholder="e.g. Toyota Camry, SUV"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            />
          </label>
          <label>
            Finance or cash?
            <select value={financeOrCash} onChange={(e) => setFinanceOrCash(e.target.value)}>
              <option value="cash">Cash</option>
              <option value="finance">Finance</option>
              <option value="either">Either</option>
            </select>
          </label>
          <label>
            Timeframe
            <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
              <option value="today">Today</option>
              <option value="this_week">This week</option>
              <option value="browsing">Just browsing</option>
            </select>
          </label>
          <label>Your details</label>
          <div className="form-grid modal-form-grid">
            <label>
              Name
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Phone
              <input
                type="tel"
                placeholder="04XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
            <label className="span-2">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-back" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
