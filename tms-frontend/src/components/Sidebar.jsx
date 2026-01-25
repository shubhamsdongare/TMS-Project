import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [shipmentMenu, setShipmentMenu] = useState(false);
  const [reportMenu, setReportMenu] = useState(false);

  return (
    <>
      {/* Hamburg btn */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        <Menu size={22} />
      </button>

      {/* overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-bold text-blue-700">TMS Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/*items */}
        <nav className="p-4 space-y-2 text-sm font-medium text-gray-700">

          <div className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
            Dashboard
          </div>

          {/*  menu */}
          <div>
            <div
              onClick={() => setShipmentMenu(!shipmentMenu)}
              className="flex justify-between items-center hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
            >
              Shipments
              <ChevronDown
                className={`transition ${shipmentMenu ? "rotate-180" : ""}`}
                size={16}
              />
            </div>

            {shipmentMenu && (
              <div className="ml-4 mt-1 space-y-1 text-gray-600">
                <div className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
                  All Shipments
                </div>
                <div className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
                  Delayed Shipments
                </div>
              </div>
            )}
          </div>

          {/* menu */}
          <div>
            <div
              onClick={() => setReportMenu(!reportMenu)}
              className="flex justify-between items-center hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
            >
              Reports
              <ChevronDown
                className={`transition ${reportMenu ? "rotate-180" : ""}`}
                size={16}
              />
            </div>

            {reportMenu && (
              <div className="ml-4 mt-1 space-y-1 text-gray-600">
                <div className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
                  Monthly
                </div>
                <div className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
                  Yearly
                </div>
              </div>
            )}
          </div>

          <div className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
            Settings
          </div>
        </nav>
      </aside>
    </>
  );
}
