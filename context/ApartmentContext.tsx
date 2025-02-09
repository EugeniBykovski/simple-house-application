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
  apartmentNumber: string;
}

interface ApartmentContextType {
  selectedApartment: Apartment | null;
  switchApartment: (apartmentId: string) => Promise<void>;
  apartments: Apartment[];
  addApartment: (newApartment: Apartment) => void;
}

const ApartmentContext = createContext<ApartmentContextType | null>(null);

interface ApartmentProviderProps {
  children: React.ReactNode;
  initialApartments: Apartment[];
}

export const ApartmentProvider = ({
  children,
  initialApartments,
}: ApartmentProviderProps) => {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    initialApartments?.[0] || null
  );
  const [apartments, setApartments] = useState<Apartment[]>(initialApartments);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const res = await fetch("/api/get-user-apartments");
        if (!res.ok) throw new Error("Failed to fetch apartments");
        const data = await res.json();

        if (data.apartments.length > 0) {
          setApartments(data.apartments);
          setSelectedApartment(data.apartments[0]);
        }
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    };

    fetchApartments();
  }, []);

  const switchApartment = async (apartmentId: string) => {
    try {
      const res = await fetch("/api/switch-apartment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apartmentId }),
      });

      if (!res.ok) {
        console.error("Failed to switch apartment:", await res.json());
        return;
      }

      const { apartment } = await res.json();
      setSelectedApartment(apartment);
    } catch (error) {
      console.error("Error switching apartment:", error);
    }
  };

  return (
    <ApartmentContext.Provider
      value={{
        selectedApartment,
        switchApartment,
        apartments,
        addApartment: (newApartment) =>
          setApartments((prev) => [...prev, newApartment]),
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
