import { useState } from 'react';
import { X } from 'lucide-react';

export default function GeneralEnquiryModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { type: 'general_enquiry', name, email, phone, message };
    console.log('General enquiry submission:', payload);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">Thanks!</h2>
          <p className="modal-text">Sean will get back to you shortly.</p>
          <button type="button" className="btn-close-modal" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <h2 className="modal-title">General enquiry</h2>
          <button type="button" className="modal-close-x" onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
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
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </label>
          <label>
            Message
            <textarea
              placeholder="How can we help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </label>
          <div className="modal-actions">
            <button type="button" className="btn-back" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
