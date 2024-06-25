const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["enabled", "disabled"],
      default: "enabled",
    },
    connection: {
      type: String,
      default: "Username-Password-Authentication",
      required: true,
    },
    tenant: {
      type: String,
      default: process.env.AUTH0_TENANT,
    },
    client_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", schema);
