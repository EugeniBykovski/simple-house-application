"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface Apartment {
  id: string;
  entrance: {
    entranceNumber: string;
    house: {
      street: string;
      houseNumber: string;
    };
  };
  floor: string;
  apartmentNumber: string;
}

interface ApartmentContextType {
  selectedApartment: Apartment | null;
  switchApartment: (apartmentId: string) => void;
  apartments: Apartment[];
  addApartment: (newApartment: Apartment) => void;
  fetchApartments: () => Promise<void>;
}

const ApartmentContext = createContext<ApartmentContextType | null>(null);

export const ApartmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const fetchApartments = async () => {
    try {
      const res = await fetch("/api/get-user-apartments");
      if (!res.ok) throw new Error("Failed to fetch apartments");
      const data = await res.json();

      setApartments(data.apartments);
      setSelectedApartment(data.apartments?.[0] || null);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const switchApartment = (apartmentId: string) => {
    setSelectedApartment(
      apartments.find((apt) => apt.id === apartmentId) || null
    );
  };

  const addApartment = (newApartment: Apartment) => {
    setApartments((prev) => [...prev, newApartment]);
    setSelectedApartment(newApartment);
  };

  return (
    <ApartmentContext.Provider
      value={{
        selectedApartment,
        switchApartment,
        apartments,
        addApartment,
        fetchApartments,
      }}
    >
      {children}
    </ApartmentContext.Provider>
  );
};

export const useApartment = () => {
  const context = useContext(ApartmentContext);
  if (!context) {
    throw new Error("useApartment must be used within an ApartmentProvider");
  }
  return context;
};
