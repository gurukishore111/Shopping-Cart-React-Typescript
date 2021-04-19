import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";

//style
import { Wrapper, StyledButton } from "./App.style";

//Types
import { CartItemType } from "../src/models/Cart";

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};

function App() {
  const [iscartOpen, setisCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...clickItem, amount: 1 }];
    });
  };

  const handleRemoveToCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;

  if (error) return <div>Something went wrong..</div>;

  console.log(data);
  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={iscartOpen}
        onClose={() => setisCartOpen(!iscartOpen)}
      >
        <Cart
          cartItems={cartItems}
          addtoCart={handleAddToCart}
          removeFromCart={handleRemoveToCart}
        />
      </Drawer>
      <StyledButton onClick={() => setisCartOpen(!iscartOpen)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error" />
        <AddShoppingCart />
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddtoCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
