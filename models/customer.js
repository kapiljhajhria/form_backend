const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4, maxlength: 50 },
  contact: { type: String, required: true, minlength: 10, maxlength: 14 },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "others", "prefer not to say"],
  },
  addedBy: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Customer = new mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    contact: Joi.string().min(10).max(14).required(),
    gender: Joi.string()
      .valid("male", "female", "others", "prefer not to say")
      .required(),
  });
  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.customerSchema = customerSchema;
module.exports.validate = validateCustomer;
