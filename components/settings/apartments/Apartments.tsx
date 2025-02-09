"use client";

import { useApartment } from "@/context/ApartmentContext";
import { useState, useEffect, useCallback } from "react";
import { FC } from "react";

const Apartments: FC = () => {
  const apartmentContext = useApartment();

  if (!apartmentContext) {
    return <div>Loading...</div>;
  }

  const { apartments, addApartment } = apartmentContext;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    street: "",
    houseNumber: "",
    entranceNumber: "",
    apartmentNumber: "",
  });

  useEffect(() => {
    if (apartments.length > 0) {
      setLoading(false);
    }
  }, [apartments]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleAddApartment = async () => {
    if (
      !formData.street ||
      !formData.houseNumber ||
      !formData.entranceNumber ||
      !formData.apartmentNumber
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setError(null);

      const res = await fetch("/api/add-apartments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add apartment");
      }

      const data = await res.json();
      addApartment(data.apartment);

      setFormData({
        street: "",
        houseNumber: "",
        entranceNumber: "",
        apartmentNumber: "",
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="py-4 px-6">
      <h2 className="text-xl font-semibold mb-4">Your Apartments</h2>

      {loading ? (
        <p>Loading apartments...</p>
      ) : (
        <ul className="list-disc pl-5">
          {apartments.map((apartment) => (
            <li key={apartment.id}>
              {apartment.entrance?.house?.street ?? "Unknown Street"},{" "}
              {apartment.entrance?.house?.houseNumber ?? "Unknown Number"},
              Entrance:{" "}
              {apartment.entrance?.entranceNumber ?? "Unknown Entrance"}, Floor:{" "}
              {apartment.apartmentNumber ?? "Unknown Apartment"}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <h3 className="mt-6 text-lg font-semibold">Add New Apartment</h3>
      <div className="grid gap-2 mt-2">
        <input
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="houseNumber"
          placeholder="House Number"
          value={formData.houseNumber}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="entranceNumber"
          placeholder="Entrance Number"
          value={formData.entranceNumber}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="apartmentNumber"
          placeholder="Apartment Number"
          value={formData.apartmentNumber}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddApartment}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add Apartment
        </button>
      </div>
    </main>
  );
};

export default Apartments;
