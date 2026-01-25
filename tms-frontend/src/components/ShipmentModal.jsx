import React from "react";

export default function ShipmentModal({ shipment, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 w-11/12 md:w-1/2 shadow-xl relative bg-cover bg-center"
        style={{ backgroundImage: "url('/2.jpg')" }}
      >

        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Shipment Details
          </h2>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-600 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {Object.entries(shipment)
            .filter(([key]) => key !== "__typename")
            .map(([key, val]) => (
              <div
                key={key}
                className="relative rounded-lg border border-white/40 shadow-md overflow-hidden"
                style={{ backgroundImage: "url('/2.jpg')" }}
              >
                
                <div className="bg-white/75 backdrop-blur-md p-3 rounded-lg">
                  <p className="text-gray-600 capitalize font-medium">
                    {key}
                  </p>
                  <p className="font-semibold text-slate-800">
                    {String(val)}
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
            onClick={onClose}
          >
            ← Back to Tiles
          </button>
        </div>
      </div>
    </div>
  );
}
