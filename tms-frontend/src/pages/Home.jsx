import React from 'react';
import { useState } from "react";
import GridView from "../components/GridView";
import TileView from "../components/TileView";

const dummyData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Employee ${i + 1}`,
  age: 25 + i,
  role: i % 2 === 0 ? "Admin" : "Employee",
  section: `Class ${((i % 3) + 1)}`,
  subjects: ["Math", "Physics"],
  attendance: 80 + i,
}));

const Home = () => {
  const [view, setView] = useState("grid");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      {/*toggle*/}
      <div className="flex justify-end mb-6 gap-3">
        <button
          onClick={() => setView("grid")}
          className={`px-4 py-2 rounded text-white transition ${
            view === "grid"
              ? "bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Grid View
        </button>

        <button
          onClick={() => setView("tile")}
          className={`px-4 py-2 rounded text-white transition ${
            view === "tile"
              ? "bg-green-700"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Tile View
        </button>
      </div>


      {/* re */}
      {view === "grid" ? (
        <GridView data={dummyData} />
      ) : (
        <TileView data={dummyData} />
      )}
    </div>
  );
};

export default Home;
