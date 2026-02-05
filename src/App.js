import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Sell from './pages/Sell';
import LookingForCarModal from './components/LookingForCarModal';
import GeneralEnquiryModal from './components/GeneralEnquiryModal';
import './App.css';

function App() {
  const [showLookingForCar, setShowLookingForCar] = useState(false);
  const [showGeneralEnquiry, setShowGeneralEnquiry] = useState(false);

  return (
    <div className="app">
      <Header
        onOpenLookingForCar={() => setShowLookingForCar(true)}
        onOpenGeneralEnquiry={() => setShowGeneralEnquiry(true)}
      />
      <main className="main">
        <Routes>
          <Route path="/" element={
            <Home
              onOpenLookingForCar={() => setShowLookingForCar(true)}
              onOpenGeneralEnquiry={() => setShowGeneralEnquiry(true)}
            />
          } />
          <Route path="/sell" element={<Sell />} />
        </Routes>
      </main>
      <footer className="footer">
        Powered by <a href="https://td1world.com" target="_blank" rel="noopener noreferrer" className="footer-link">TD1WORLD</a>
      </footer>

      {showLookingForCar && <LookingForCarModal onClose={() => setShowLookingForCar(false)} />}
      {showGeneralEnquiry && <GeneralEnquiryModal onClose={() => setShowGeneralEnquiry(false)} />}
    </div>
  );
}

export default App;
