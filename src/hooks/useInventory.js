import { useState, useEffect } from 'react';

const API_BASE = '';

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
        const res = await fetch(`${API_BASE}/api/inventory`);
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
