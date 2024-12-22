import { Order, Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";

const orderSchema: Schema<Order> = new Schema({
  counter: {
    type: Number,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  date_placed: {
    type: Date,
    required: true,
  },
  date_delivered: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
});

const Order = model<Order>(RESOURCE.ORDERS, orderSchema);
export default Order;
