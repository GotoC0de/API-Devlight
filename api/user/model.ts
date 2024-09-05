import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

//Schema de usuario, con todas sus caracteristicas para el manejo de usuarios

const userSchema = new Schema({
  user_name: {
    type: String,
    require: true,
    unique: true,
  },
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["admin", "comprador", "vendedor"],
    default: "comprador",
  },
  avatar: {
    type: String,
    default: "",
  },
});

//Antes de guardar el user en la BD, hasheamos el password con bcrypt
userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password ?? "", 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

const User = model("User", userSchema);

export default User;
