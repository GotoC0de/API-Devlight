import { Schema, model } from "mongoose";

const orderHistorySchema = new Schema({
  carts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const OrderHistory = model("OrderHistory", orderHistorySchema);

export default OrderHistory;
