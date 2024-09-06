import Cart from "./model";
import { ICart } from "../../types";

class CartDao {
  async addCart(cart: ICart) {
    try {
      const newCart = await Cart.create(cart);
      return newCart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const cartDao = new CartDao();
