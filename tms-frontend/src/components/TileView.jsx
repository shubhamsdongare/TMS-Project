
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SHIPMENTS } from "../graphql/queries";
import TileCard from "./TileCard";

export default function TileView({ onSelect }) {
  const { data, loading, error } = useQuery(GET_SHIPMENTS);

  if (loading) return <p className="p-6">Loading shipments...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load shipments</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.shipments.map((shipment) => (
        <TileCard
          key={shipment.id}
          shipment={shipment}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
