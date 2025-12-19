"use client";

import { useState } from "react";

export default function ValuationPage() {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);
  setError("");
  setPrice(null);

  const formData = new FormData(e.currentTarget);
  const payload = Object.fromEntries(formData);

  try {
    const res = await fetch("http://localhost:8001/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("API response:", data);

    let extractedPrice: number | undefined;

    if (typeof data.estimated_price === "number") {
      extractedPrice = data.estimated_price;
    } else if (Array.isArray(data.estimated_price)) {
      extractedPrice = data.estimated_price[0];
    } else if (Array.isArray(data.predicted_prices)) {
      extractedPrice = data.predicted_prices[0];
    }

    if (extractedPrice === undefined || isNaN(extractedPrice)) {
      throw new Error("Invalid price format");
    }

    setPrice(extractedPrice);
  } catch (err) {
    setError("Price received but UI failed to render");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          🏠 Property Valuation Tool
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["square_footage", "Square Footage"],
            ["bedrooms", "Bedrooms"],
            ["bathrooms", "Bathrooms"],
            ["year_built", "Year Built"],
            ["lot_size", "Lot Size"],
            ["distance_to_city_center", "Distance to City (km)"],
            ["school_rating", "School Rating"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">
                {label}
              </label>
              <input
                name={name}
                type="number"
                required
                className="w-full border rounded-lg px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg
                         hover:bg-blue-700 transition"
            >
              {loading ? "Estimating..." : "Estimate Price"}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        )}

        {price && (
          <div className="mt-10 pb-1">
            <div className="relative">
              <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <dl className="rounded-lg bg-white shadow-lg sm:grid text-center">
                        <div className="flex flex-col border-b border-gray-100 p-3 text-center sm:border-0 sm:border-r">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                              Estimate Price
                            </dt>
                            <dd className="text-5xl font-extrabold text-gray-700">{price}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
        )}
      </div>
    </div>
  );
}
