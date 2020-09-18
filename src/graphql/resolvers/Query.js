import Users from "../../models/Users";
import Payments from "../../models/Payments";

const Query = {
  ping() {
    return "pong";
  },
  // # Users
  getUsers: async () => {
    return await Users.find();
  },
  getUser: async (_, { id }) => {
    return await Users.findById(id);
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

export default Query;
