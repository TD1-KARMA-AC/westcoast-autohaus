import { useState, useEffect } from 'react';

// Netlify: set REACT_APP_INVENTORY_URL=/inventory.json. Else uses /api/inventory (Node).
const INVENTORY_URL = process.env.REACT_APP_INVENTORY_URL || '/api/inventory';

export function useInventory() {
  const [cars, setCars] = useState([]);
  const [lastScrapedAt, setLastScrapedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchInventory() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(INVENTORY_URL);
        if (!res.ok) throw new Error('Failed to load inventory');
        const data = await res.json();
        if (cancelled) return;
        setCars(Array.isArray(data.cars) ? data.cars : data);
        setLastScrapedAt(data.lastScrapedAt || null);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Could not load cars');
          setCars([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchInventory();
    return () => { cancelled = true; };
  }, []);

  return { cars, lastScrapedAt, loading, error };
}
