import React from 'react';
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";


import ShipmentModal from "./components/ShipmentModal";
import TileCard from "./components/TileCard";
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import "./index.css"; 

// fetch data
const GET_SHIPMENTS = gql`
  query GetShipments {
    shipments {
      id
      origin  
      destination
      status
      carrier
      vehicle
      weight
      cost
      eta
      date
      priority
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(GET_SHIPMENTS);

  const [selectedShipment, setSelectedShipment] = useState(null);
  const [view, setView] = useState("grid");


  if (loading) {
    return <p className="p-6 text-gray-600">Loading shipments...</p>;
  }


  if (error) {
    return (
      <p className="p-6 text-red-600 font-semibold">
        Error loading shipments: {error.message}
      </p>
    );
  }

  return (
    <div
      className="min-h-screen font-sans bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/1.jpg')" }}
    > 

      <Sidebar className="w-64 fixed h-full" />

      <TopNav view={view} setView={setView} />


      <div className="p-6 max-w-7xl mx-auto">
        <div className=" mb-6 rounded-2xl bg-white/80 backdrop-blur-md mt-16 shadow-lg p-6">
          <h1 className="text-3xl text-center font-bold text-gray-900">
            Transportation Management Syste (TMS)
          </h1>

          
          {/* <div className="mt-4 flex gap-3">
            <button
              className={`px-4 py-2 rounded-lg text-white font-medium transition
                ${view === "grid" ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
              onClick={() => setView("grid")}
            >
              Grid View
            </button>

            <button
              className={`px-4 py-2 rounded-lg text-white font-medium transition
                ${view === "tile" ? "bg-green-700" : "bg-green-500 hover:bg-green-600"}`}
              onClick={() => setView("tile")}
            >
              Tile View
            </button>
          </div> */}
        </div>

       
        {selectedShipment && (
          <ShipmentModal
            shipment={selectedShipment}
            onClose={() => setSelectedShipment(null)}
          />
        )}


        <div className="rounded-2xl bg-white/85 backdrop-blur-md shadow-xl p-4">

          {view === "grid" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border px-4 py-3">ID</th>
                    <th className="border px-4 py-3">Origin</th>
                    <th className="border px-4 py-3">Destination</th>
                    <th className="border px-4 py-3">Status</th>
                    <th className="border px-4 py-3">Carrier</th>
                    <th className="border px-4 py-3">Vehicle</th>
                    <th className="border px-4 py-3">Weight</th>
                    <th className="border px-4 py-3">Cost</th>
                    <th className="border px-4 py-3">ETA</th>
                    <th className="border px-4 py-3">Date</th>
                    <th className="border px-4 py-3">Priority</th>
                  </tr>
                </thead>

                <tbody>
                  {data.shipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      className="hover:bg-blue-50 cursor-pointer transition"
                      onClick={() => setSelectedShipment(shipment)}
                    >
                      <td className="border px-4 py-2">{shipment.id}</td>
                      <td className="border px-4 py-2">{shipment.origin}</td>
                      <td className="border px-4 py-2">{shipment.destination}</td>
                      <td className="border px-4 py-2 font-medium">{shipment.status}</td>
                      <td className="border px-4 py-2">{shipment.carrier}</td>
                      <td className="border px-4 py-2">{shipment.vehicle}</td>
                      <td className="border px-4 py-2">{shipment.weight}</td>
                      <td className="border px-4 py-2">{shipment.cost}</td>
                      <td className="border px-4 py-2">{shipment.eta}</td>
                      <td className="border px-4 py-2">{shipment.date}</td>
                      <td className="border px-4 py-2">{shipment.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.shipments.map((shipment) => (
                <TileCard
                  key={shipment.id}
                  shipment={shipment}
                  onSelect={setSelectedShipment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
