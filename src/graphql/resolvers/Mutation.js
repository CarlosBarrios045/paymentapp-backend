import Users from "../../models/Users";
import Payments from "../../models/Payments";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "variables.env" });

const createToken = (user, secret, expiresIn) => {
  const { id } = user;
  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};

const Mutation = {
  // # Users
  createUser: async (_, { input }) => {
    // Validate if exist user
    const existUser = await Users.findOne({ email: input.email });
    if (existUser) throw new Error("El correo ya existe");

    // Create User
    const newUser = new Users(input);
    newUser.id = newUser._id;

    // Hash password
    newUser.password = await bcrypt.hash(newUser.password, 10);

    return await newUser.save();
  },
  updateUser: async (_, { id, input }) => {
    // Validate if exist user
    const existUser = await Users.findOne({ email: input.email });
    if (existUser) throw new Error("El correo ya existe");

    const user = await Users.findByIdAndUpdate(id, input, { new: true });
    return user;
  },
  deleteUser: async (_, { id }) => {
    const userDeleted = await Users.findByIdAndDelete(id);
    if (!userDeleted) {
      throw new Error("No se pudo conseguir el usuario a eliminar");
    }
    return "Usuario eliminado correctamente";
  },

  // # Payments
  createPayment: async (_, { input }) => {
    const newPayment = new Payments(input);
    newPayment.id = newPayment._id;
    newPayment.date = new Date();

    return await newPayment.save();
  },
  updatePayment: async (_, { id, input }) => {
    const payment = await Payments.findByIdAndUpdate(id, input, { new: true });
    return payment;
  },
  deletePayment: async (_, { id }) => {
    const paymentDeleted = await Payments.findByIdAndDelete(id);
    if (!paymentDeleted) {
      throw new Error("No se pudo conseguir el pago a eliminar");
    }
    return "Pago eliminado correctamente";
  },
  login: async (_, { email, password }) => {
    // Verify Email
    const user = await Users.findOne({ email });
    if (!user) throw new Error("El correo no existe");

    // Verify Password
    const isPasswordSuccess = await bcrypt.compare(password, user.password);
    if (!isPasswordSuccess) throw new Error("Contraseña incorrecta");

    return {
      token: createToken(user, process.env.SECRET, "4h"),
    };
  },
  getUserLogged: async (_, args, { user }) => {
    if (!user) return null;

    // Get user of jwt
    const userDB = await Users.findById(user.id);

    return userDB;
  },
};

export default Mutation;
