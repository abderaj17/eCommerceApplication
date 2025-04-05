import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartIcon = () => {
  const { cart } = useContext(CartContext);
  return (
    <IconButton color="inherit">
      <Badge badgeContent={cart?.items?.length || 0} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
