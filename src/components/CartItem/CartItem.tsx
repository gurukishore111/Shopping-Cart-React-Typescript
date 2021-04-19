import { Button } from "@material-ui/core";
import { Wrapper } from "./CartItem.style";

//Types
import { CartItemType } from "../../models/Cart";

type Props = {
  item: CartItemType;
  addtoCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

//Styles

export const CartItem: React.FC<Props> = ({
  item,
  addtoCart,
  removeFromCart,
}) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total : ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addtoCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title} />
    </Wrapper>
  );
};
