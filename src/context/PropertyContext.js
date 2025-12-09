import { createContext, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { mockProperties } from '../data/mockProperties';

const PropertyContext = createContext();

const computeYield = (property) => {
  if (!property.prixAcquisition) return 0;
  return ((property.loyer * 12) / property.prixAcquisition) * 100;
};

const computeNetYield = (property) => {
  if (!property.prixAcquisition) return 0;
  const net = property.loyer * 12 - property.charges * 12;
  return (net / property.prixAcquisition) * 100;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(mockProperties);

  const addProperty = (payload) => {
    const next = { ...payload, id: uuidv4() };
    setProperties((prev) => [...prev, next]);
    return next.id;
  };

  const updateProperty = (id, payload) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...payload } : p)));
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const getPropertyById = (id) => properties.find((p) => p.id === id);

  const stats = useMemo(() => {
    const occupied = properties.filter((p) => p.statut === 'Occupé');
    const libre = properties.filter((p) => p.statut === 'Libre');

    const monthlyRevenue = occupied.reduce((sum, p) => sum + p.loyer, 0);
    const annualRevenue = monthlyRevenue * 12;
    const avgYield =
      properties.reduce((sum, p) => sum + computeYield(p), 0) / (properties.length || 1);
    const netRentability =
      properties.reduce((sum, p) => sum + computeNetYield(p), 0) / (properties.length || 1);

    const typeDistribution = properties.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {});

    return {
      monthlyRevenue,
      annualRevenue,
      avgYield,
      netRentability,
      occupied: occupied.length,
      free: libre.length,
      total: properties.length,
      typeDistribution,
    };
  }, [properties]);

  const value = {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    getPropertyById,
    stats,
  };

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};

export const useProperties = () => {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error('useProperties must be used within PropertyProvider');
  return ctx;
};

