const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "Debe ser un correo electrónico válido",
    },
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    select: false,
  },
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    maxlength: [30, "El nombre no puede exceder los 30 caracteres"],
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new Error("Correo electrónico o contraseña incorrectos"),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new Error("Correo electrónico o contraseña incorrectos"),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
