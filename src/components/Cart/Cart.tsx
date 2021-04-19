import React from "react";
import { CartItemType } from "../../models/Cart";
import { CartItem } from "../CartItem/CartItem";
import { Wrapper } from "./Cart.style";

type Props = {
  cartItems: CartItemType[];
  addtoCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addtoCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) => {
    return items.reduce(
      (ack: number, item) => ack + item.amount * item.price,
      0
    );
  };
  return (
    <div>
      <Wrapper>
        <h2>Your Shoppings Cart</h2>
        {cartItems.length === 0 ? <p>No Items on cart.</p> : null}
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addtoCart={addtoCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <h2>Total : $ {calculateTotal(cartItems).toFixed(2)}</h2>
      </Wrapper>
    </div>
  );
};

export default Cart;
