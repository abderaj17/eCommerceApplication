import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Button } from "@mui/material";

const AddToCartButton = ({ productId }) => {
  const { addItem } = useContext(CartContext);
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => addItem(productId, 1)}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
