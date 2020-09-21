const Users = require("../../models/Users");
const Payments = require("../../models/Payments");

const Query = {
  ping() {
    return "pong";
  },
  // # Users
  getUsers: async () => {
    return await Users.find({ role: "CLIENT" });
  },
  getUser: async (_, { id }) => {
    try {
      const user = await Users.findById(id);
      if (!user) throw new Error("No se encontró el usuario");

      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
  // # Users
  getPayments: async (_, { idUser }) => {
    let filter;
    if (idUser) filter = { user: idUser };

    return await Payments.find(filter);
  },
  getPayment: async (_, { id }) => {
    return await Payments.findById(id);
  },
};

module.exports = Query;
