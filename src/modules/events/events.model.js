const { Schema, model } = require("mongoose");
const { FIELD_CANNOT_BE_EMPTY } = require("../../consts/errors");

const eventSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, FIELD_CANNOT_BE_EMPTY("name")],
  },
  ageLimit: {
    type: Number,
  },
  date: {
    type: Date,
    required: [true, FIELD_CANNOT_BE_EMPTY("date")],
  },
  language: {
    type: String,
  },
  menu: {
    type: Array,
  },
  photo: {
    type: String,
  },
  price: {
    type: Number,
  },
  specialGuest: {
    type: String, // Guest
  },
  subtitle: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = model("Event", eventSchema);
