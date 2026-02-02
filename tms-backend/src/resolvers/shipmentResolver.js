let shipments = require("../data/shipments");
const paginate = require("../utils/pagination");

module.exports = {
  Query: {
    shipments: (
      _,
      { page = 1, limit = 5, sortBy = "date", status, carrier, priority },
      context
    ) => {

      // 🔹 ADDED: Authentication (both admin & employee can view)
      if (!context.user) {
        throw new Error("Authentication required");
      }

      let filteredShipments = [...shipments];

      // 🔹 ADDED: Optional Filters
      if (status) {
        filteredShipments = filteredShipments.filter(
          s => s.status === status
        );
      }

      if (carrier) {
        filteredShipments = filteredShipments.filter(
          s => s.carrier === carrier
        );
      }

      if (priority) {
        filteredShipments = filteredShipments.filter(
          s => s.priority === priority
        );
      }

      // Existing sorting logic (UNCHANGED)
      const sorted = filteredShipments.sort((a, b) =>
        a[sortBy] > b[sortBy] ? 1 : -1
      );

      // Existing pagination utility (UNCHANGED)
      return paginate(sorted, page, limit);
    },

    shipment: (_, { id }, context) => {
      // 🔹 ADDED: Auth check
      if (!context.user) {
        throw new Error("Authentication required");
      }

      return shipments.find(s => s.id === id);
    }
  },

  Mutation: {
    addShipment: (_, args, context) => {
      // Existing admin-only logic (UNCHANGED)
      if (context.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const newShipment = {
        id: String(shipments.length + 1),
        ...args,
        date: new Date().toISOString()
      };

      shipments.push(newShipment);
      return newShipment;
    },

    updateShipment: (_, { id, status }, context) => {
      // Existing admin-only logic (UNCHANGED)
      if (context.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const shipment = shipments.find(s => s.id === id);
      shipment.status = status;
      return shipment;
    }
  }
};
