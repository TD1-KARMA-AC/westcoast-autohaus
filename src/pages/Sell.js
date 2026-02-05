import { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

const DISCLOSURE = `We DO NOT accept: Repairable write-offs, petrol over 250k km, diesel over 400k km (turbo diesels case-by-case), major structural damage. Pricing: Offers below private sale for reconditioning, inspections, roadworthy, warranty, overheads.`;
const DISCLAIMER_TIMEOUT_MS = 10000;

const INITIAL_STEP1 = {
  year: '',
  make: '',
  model: '',
  mileage: '',
  condition: 'good',
  serviceHistory: 'yes',
  accidents: 'no',
  finance: 'no'
};

const INITIAL_STEP2 = {
  description: '',
  photos: []
};

const INITIAL_STEP3 = {
  name: '',
  phone: '',
  email: '',
  suburb: '',
  urgency: 'normal'
};

export default function Sell() {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState(INITIAL_STEP1);
  const [step2, setStep2] = useState(INITIAL_STEP2);
  const [step3, setStep3] = useState(INITIAL_STEP3);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [photoPreviews, setPhotoPreviews] = useState([]);

  useEffect(() => {
    if (!showDisclaimer) return;
    const t = setTimeout(() => setShowDisclaimer(false), DISCLAIMER_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [showDisclaimer]);

  const handleStep1Change = (field, value) => setStep1((s) => ({ ...s, [field]: value }));
  const handleStep2Change = (field, value) => setStep2((s) => ({ ...s, [field]: value }));
  const handleStep3Change = (field, value) => setStep3((s) => ({ ...s, [field]: value }));

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []);
    const total = step2.photos.length + files.length;
    if (total > 10) return;
    const newPhotos = [...step2.photos, ...files];
    setStep2((s) => ({ ...s, photos: newPhotos }));
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPhotoPreviews((p) => [...p, ...newPreviews]);
  };

  const removePhoto = (index) => {
    const newPhotos = step2.photos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    if (photoPreviews[index]) URL.revokeObjectURL(photoPreviews[index]);
    setStep2((s) => ({ ...s, photos: newPhotos }));
    setPhotoPreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { step1, step2: { ...step2, photos: step2.photos.map((f) => f.name) }, step3 };
    console.log('Sell form submission:', payload);
    setShowSuccess(true);
  };

  const canProceedStep1 = step1.year && step1.make && step1.model && step1.mileage;
  const progress = (step / 3) * 100;

  return (
    <div className="sell-page">
      <div className="sell-container">
        <h1 className="sell-title">Sell Your Car</h1>
        <div className="progress-wrap">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <span className="progress-text">Step {step} of 3</span>
        </div>

        <form onSubmit={handleSubmit} className="sell-form">
          {step === 1 && (
            <div className="sell-step glass-panel">
              <h2 className="step-heading">Vehicle details</h2>
              <div className="form-grid">
                <label>
                  Year
                  <input
                    type="text"
                    placeholder="e.g. 2020"
                    value={step1.year}
                    onChange={(e) => handleStep1Change('year', e.target.value)}
                  />
                </label>
                <label>
                  Make
                  <input
                    type="text"
                    placeholder="e.g. Toyota"
                    value={step1.make}
                    onChange={(e) => handleStep1Change('make', e.target.value)}
                  />
                </label>
                <label>
                  Model
                  <input
                    type="text"
                    placeholder="e.g. Camry"
                    value={step1.model}
                    onChange={(e) => handleStep1Change('model', e.target.value)}
                  />
                </label>
                <label>
                  Mileage (km)
                  <input
                    type="text"
                    placeholder="e.g. 45000"
                    value={step1.mileage}
                    onChange={(e) => handleStep1Change('mileage', e.target.value)}
                  />
                </label>
              </div>
              <div className="form-grid">
                <label>
                  Condition
                  <select value={step1.condition} onChange={(e) => handleStep1Change('condition', e.target.value)}>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </label>
                <label>
                  Service history
                  <select value={step1.serviceHistory} onChange={(e) => handleStep1Change('serviceHistory', e.target.value)}>
                    <option value="yes">Yes</option>
                    <option value="partial">Partial</option>
                    <option value="no">No</option>
                  </select>
                </label>
                <label>
                  Accidents?
                  <select value={step1.accidents} onChange={(e) => handleStep1Change('accidents', e.target.value)}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>
                <label>
                  Finance owing?
                  <select value={step1.finance} onChange={(e) => handleStep1Change('finance', e.target.value)}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>
              </div>
              <button type="button" className="btn-next" onClick={() => setStep(2)} disabled={!canProceedStep1}>
                Next: Photos & description
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="sell-step glass-panel">
              <h2 className="step-heading">Photos & description</h2>
              <label className={`upload-zone ${step2.photos.length >= 10 ? 'upload-zone-full' : ''}`}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  className="upload-input"
                  disabled={step2.photos.length >= 10}
                />
                <Upload size={24} />
                <span>{step2.photos.length >= 10 ? '10 photos added' : `Add up to 10 photos (${step2.photos.length}/10)`}</span>
              </label>
              <div className="photo-previews">
                {(step2.photos.length ? photoPreviews : []).map((url, i) => (
                  <div key={i} className="photo-preview">
                    <img src={url} alt={`Preview ${i + 1}`} />
                    <button type="button" className="photo-remove" onClick={() => removePhoto(i)} aria-label="Remove">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <label className="label-block">
                Description
                <textarea
                  placeholder="Any extra details about the vehicle..."
                  value={step2.description}
                  onChange={(e) => handleStep2Change('description', e.target.value)}
                  rows={4}
                />
              </label>
              <div className="step-actions">
                <button type="button" className="btn-back" onClick={() => setStep(1)}>Back</button>
                <button type="button" className="btn-next" onClick={() => setStep(3)}>Next: Contact</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="sell-step glass-panel">
              <h2 className="step-heading">Contact details</h2>
              <div className="form-grid">
                <label>
                  Name
                  <input
                    type="text"
                    placeholder="Your name"
                    value={step3.name}
                    onChange={(e) => handleStep3Change('name', e.target.value)}
                    required
                  />
                </label>
                <label>
                  Phone
                  <input
                    type="tel"
                    placeholder="04XX XXX XXX"
                    value={step3.phone}
                    onChange={(e) => handleStep3Change('phone', e.target.value)}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={step3.email}
                    onChange={(e) => handleStep3Change('email', e.target.value)}
                    required
                  />
                </label>
                <label>
                  Suburb
                  <input
                    type="text"
                    placeholder="e.g. Perth"
                    value={step3.suburb}
                    onChange={(e) => handleStep3Change('suburb', e.target.value)}
                  />
                </label>
                <label className="span-2">
                  Urgency
                  <select value={step3.urgency} onChange={(e) => handleStep3Change('urgency', e.target.value)}>
                    <option value="asap">ASAP</option>
                    <option value="normal">Within a week</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </label>
              </div>
              <div className="step-actions">
                <button type="button" className="btn-back" onClick={() => setStep(2)}>Back</button>
                <button type="submit" className="btn-submit">Submit</button>
              </div>
            </div>
          )}
        </form>
      </div>

      {showDisclaimer && (
        <div className="modal-overlay disclaimer-overlay" onClick={() => setShowDisclaimer(false)}>
          <div className="disclaimer-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <h2 className="disclaimer-title">Please read</h2>
            <p className="disclaimer-text">{DISCLOSURE}</p>
            <p className="disclaimer-timer">This will close in 10 seconds, or close now to continue.</p>
            <button type="button" className="btn-close-modal" onClick={() => setShowDisclaimer(false)}>Continue</button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Thank You!</h2>
            <p className="modal-text">Sean will contact you within 24 hours.</p>
            <button type="button" className="btn-close-modal" onClick={() => setShowSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
