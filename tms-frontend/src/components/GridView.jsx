
import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_SHIPMENTS } from "../graphql/queries";

const PAGE_SIZE = 5;

export default function GridView({ shipments, onSelect }) {
  const { data, loading, error } = useQuery(GET_SHIPMENTS, {
    variables: { page: 1, limit: 50 },
  });

  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const shipmentsData = useMemo(() => data?.shipments?.data || [], [data]);

  const sortedData = useMemo(() => {
    if (!shipmentsData) return [];

    return [...shipmentsData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [shipmentsData, sortKey, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [sortedData, page]);

  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading)
    return <p className="p-6 text-gray-600">Loading shipments...</p>;

  if (error)
    return <p className="p-6 text-red-500">Failed to load shipments</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
        <thead className="bg-slate-100 text-slate-700 text-sm">
          <tr>
            {[
              ["id", "Shipment ID"],
              ["origin", "Origin"],
              ["destination", "Destination"],
              ["status", "Status"],
              ["carrier", "Carrier"],
              ["vehicle", "Vehicle"],
              ["weight", "Weight (kg)"],
              ["cost", "Cost"],
              ["eta", "ETA"],
              ["date", "Date"],
              ["priority", "Priority"],
            ].map(([key, label]) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="px-4 py-3 text-left cursor-pointer hover:text-blue-600"
              >
                {label}
                {sortKey === key && (
                  <span className="ml-1">{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm">
          {paginatedData.map((s) => (
            <tr
              key={s.id}
              onClick={() => onSelect({ ...s })}
              className="border-t hover:bg-blue-50 cursor-pointer transition"
            >
              <td className="px-4 py-3 font-medium text-blue-600">#{s.id}</td>
              <td className="px-4 py-3">{s.origin}</td>
              <td className="px-4 py-3">{s.destination}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      s.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : s.status === "In Transit"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {s.status}
                </span>
              </td>
              <td className="px-4 py-3">{s.carrier}</td>
              <td className="px-4 py-3">{s.vehicle || "Truck"}</td>
              <td className="px-4 py-3">{s.weight || 1200}</td>
              <td className="px-4 py-3 font-semibold">₹{s.cost}</td>
              <td className="px-4 py-3">{s.eta || "2 Days"}</td>
              <td className="px-4 py-3">{s.date || "2 Days"}</td>
              <td className="px-4 py-3">{s.priority || "Normal"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ppagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
