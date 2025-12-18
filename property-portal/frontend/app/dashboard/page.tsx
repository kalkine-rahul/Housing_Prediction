"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LocationRow = {
  location: string;
  avg_price: number;
  price_per_sqft: number;
  listings: number;
};

type Trend = {
  quarter: string;
  price: number;
};

export default function DashboardPage() {
  const [locations, setLocations] = useState<LocationRow[]>([]);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [summary, setSummary] = useState<any>(null);

  const [minPrice, setMinPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8001/api/market-data")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setLocations(data.locations);
        setTrends(data.price_trends);
        setSummary(data.summary);
      })
      .catch(() => setError("Market data load failed"))
      .finally(() => setLoading(false));
  }, []);

  const filteredLocations = locations.filter((row) =>
    minPrice ? row.avg_price >= Number(minPrice) : true
  );

  if (loading) {
    return <p className="p-6 text-center">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📊 Market Dashboard</h1>

      {/* SUMMARY */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-white shadow rounded">
            <p className="text-sm text-gray-500">Avg Price / Sqft</p>
            <p className="text-xl font-bold">
              ₹ {summary.average_price_per_sqft}
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <p className="text-sm text-gray-500">Total Listings</p>
            <p className="text-xl font-bold">
              {summary.total_listings}
            </p>
          </div>
        </div>
      )}

      {/* FILTER */}
      <div className="mb-6">
        <input
          type="number"
          placeholder="Min Avg Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

    
      <div className="mb-10 py-5 px-4 bg-white rounded shadow">
        <h2 className="font-semibold mb-3">Average Price by Location</h2>
        <div className="space-y-3">
          {filteredLocations.map((row) => (
            <div key={row.location}>
              <div className="flex justify-between text-sm mb-1">
                <span>{row.location}</span>
                <span>₹ {row.avg_price.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded">
                <div
                  className="h-3 bg-blue-600 rounded pb-2"
                  style={{
                    width: `${Math.min(row.avg_price / 100000, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    
   <div className="mb-10 py-5 px-4 bg-white rounded shadow">
  <h2 className="font-semibold mb-3">Price Trend</h2>

  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={trends}>
        <XAxis dataKey="quarter" />
        <YAxis />
        <Tooltip formatter={(v) => `₹ ${v.toLocaleString("en-IN")}`} />
        <Bar dataKey="price" fill="#22c55e" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Location</th>
            <th className="border px-3 py-2 text-left">Avg Price</th>
            <th className="border px-3 py-2 text-left">₹ / Sqft</th>
            <th className="border px-3 py-2 text-left">Listings</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map((row) => (
            <tr key={row.location}>
              <td className="border px-3 py-2">{row.location}</td>
              <td className="border px-3 py-2">
                ₹ {row.avg_price.toLocaleString("en-IN")}
              </td>
              <td className="border px-3 py-2">{row.price_per_sqft}</td>
              <td className="border px-3 py-2">{row.listings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
