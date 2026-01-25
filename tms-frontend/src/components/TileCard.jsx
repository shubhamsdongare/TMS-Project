
import React, { useState } from "react";

export default function TileCard({ shipment, onSelect }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleAction = (action) => {
    alert(`${action} shipment ${shipment.id}`);
    setMenuOpen(false);
  };

  return (
    <div
      onClick={() => onSelect(shipment)}
      className="relative bg-white border rounded-xl p-5 shadow hover:shadow-lg cursor-pointer transition"
    >
      {/* bun */}
      <button
        onClick={handleMenuClick}
        className="absolute top-3 right-3 text-xl font-bold hover:text-blue-600"
      >
        ⋮
      </button>

      {menuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-10 right-3 bg-white border rounded shadow-md w-32 z-10"
        >
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleAction("Edit")}
          >
            ✏️ Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleAction("Flag")}
          >
            🚩 Flag
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            onClick={() => handleAction("Delete")}
          >
            🗑 Delete
          </button>
        </div>
      )}

      {/* Tile Content (necessary fields only) */}
      <h3 className="text-lg font-semibold mb-2">
        Shipment #{shipment.id}
      </h3>

      <p className="text-sm text-gray-600">
        <strong>From:</strong> {shipment.origin}
      </p>
      <p className="text-sm text-gray-600">
        <strong>To:</strong> {shipment.destination}
      </p>
      <p className="text-sm">
        <span className={`px-2 py-1 rounded text-xs font-semibold
          ${shipment.status === "Delivered"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
          }`}>
          {shipment.status}
        </span>
      </p>
    </div>
  );
}
