import { Button } from "@material-ui/core";
import React from "react";
import { Wrapper } from "./Item.style";
import { CartItemType } from "../../models/Cart";

type Props = {
  item: CartItemType;
  handleAddtoCart: (clickItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddtoCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt="img" />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>$ {item.price}</h3>
      </div>
      <Button onClick={() => handleAddtoCart(item)}>Add to Cart</Button>
    </Wrapper>
  );
};

export default Item;
