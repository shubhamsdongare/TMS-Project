import React from "react";

export default function TopNav({ view, setView }) {
  return (
    <header className="bg-transparent ml-10 shadow px-6 py-4 flex items-center justify-between">
      
      <div className="flex items-center space-x-8">
        <h1 className="text-xl font-bold text-slate-200">
          TMS
        </h1>

        <nav className="hidden md:flex space-x-6 text-slate-300 font-medium">
          <span className="cursor-pointer hover:text-blue-600">
            Dashboard
          </span>
          <span className="cursor-pointer hover:text-blue-600">
            Shipments
          </span>
          <span className="cursor-pointer hover:text-blue-600">
            Reports
          </span>
          <span className="cursor-pointer hover:text-blue-600">
            Analytics
          </span>
        </nav>
      </div>

      <div className="space-x-3">
        <button
          onClick={() => setView("grid")}
          className={`px-4 py-2 rounded text-sm font-medium transition
            ${
              view === "grid"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          Grid View
        </button>

        <button
          onClick={() => setView("tile")}
          className={`px-4 py-2 rounded text-sm font-medium transition
            ${
              view === "tile"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          Tile View
        </button>
      </div>
    </header>
  );
}
