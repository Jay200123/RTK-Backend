import { Order, Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";
import mongoose from "mongoose";
import { rating } from "..";

const orderSchema: Schema<Order> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: RESOURCE.USERS,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RESOURCE.PRODUCTS,
        required: true,
      },
      rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RESOURCE.RATINGS,
        required: false,
        default: null,
      },
      quantity: {
        type: Number,
        required: true,
      },
      isReviewed: {
        type: Boolean,
        default: false,
      },
    },
  ],
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
    default: Date.now,
  },
  date_delivered: {
    type: Date,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  payment: {
    type: String,
    required: true,
  },
  isCancelled: {
    type: Boolean,
    default: false, 
  },
  isCancelApproved: {
    type: Boolean,
    default: false,
  },
  reason: {
    type: String,
    required: false,  
  }
});

const Order = model<Order>(RESOURCE.ORDERS, orderSchema);
export default Order;
