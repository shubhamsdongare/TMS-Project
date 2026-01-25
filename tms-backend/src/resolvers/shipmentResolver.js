let shipments = require("../data/shipments");
const paginate = require("../utils/pagination");

module.exports = {
  Query: {
    shipments: (_, { page = 1, limit = 5, sortBy = "date" }) => {
      const sorted = [...shipments].sort((a, b) =>
        a[sortBy] > b[sortBy] ? 1 : -1
      );

      return paginate(sorted, page, limit);
    },

    shipment: (_, { id }) =>
      shipments.find(s => s.id === id)
  },

  Mutation: {
    addShipment: (_, args, context) => {
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
      if (context.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const shipment = shipments.find(s => s.id === id);
      shipment.status = status;
      return shipment;
    }
  }
};
