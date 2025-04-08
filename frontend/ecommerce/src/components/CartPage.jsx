import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import {
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const { cart, loading, removeItem, emptyCart } =
    useContext(CartContext);

  if (loading) return <Typography>Loading Cart ...</Typography>;
  if (!cart || cart.items.length === 0)
    return <Typography>Your Cart is empty</Typography>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Container>
      <Typography variant="h4">Your Cart</Typography>
      <List>
        {cart.items.map((item) => (
          <ListItem key={item._id}>
            <ListItemText
              primary={item.product.name}
              secondary={`$${item.product.price} × ${item.quantity}`}
            />
            <IconButton onClick={() => removeItem(item._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      <Button variant="contained" color="error" onClick={emptyCart}>
        Clear Cart
      </Button>
    </Container>
  );
};

export default CartPage;
