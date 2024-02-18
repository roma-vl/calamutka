import {connect, useDispatch} from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Card, CardContent, IconButton, Grid, Typography, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import {decreaseQuantity, increaseQuantity, removeFromCart, saveCartToLocalStorage} from '../../cartActions';

const Cart = ({ isOpen, handleCloseCart, products }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
    dispatch(saveCartToLocalStorage());
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
    dispatch(saveCartToLocalStorage());
  };

  const handleDeleteCard = (id) => {
    dispatch(removeFromCart(id));
    dispatch(saveCartToLocalStorage());
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseCart}
      aria-labelledby="cart-dialog-title"
      fullWidth
    >
      <DialogTitle id="cart-dialog-title">Корзина</DialogTitle>

      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={handleCloseCart}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
        <Grid container spacing={2}>
          {products && products.map(product => (
            <Grid item xs={12} key={product.id}>
              <Card>
                <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={product.main_image}
                    alt="Товар"
                    style={{ width: 120, height: 100 }}
                  />
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h6" sx={{ marginLeft: '30px' }}>{product.name}</Typography>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '15px' , marginLeft: '20px' }}>
                        <IconButton onClick={() => handleDecreaseQuantity(product.id)}><RemoveIcon /></IconButton>
                        <TextField
                          type="number"
                          value={product.quantity}
                          variant="outlined"
                          inputProps={{ min: 1 }}
                          sx={{ width: '90px', padding: '5.5px 10px' }}
                          // disabled
                        />
                        <IconButton onClick={() => handleIncreaseQuantity(product.id)}><AddIcon /></IconButton>
                      </div>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => handleDeleteCard(product.id)} sx={{ position: 'relative', top: '-20px', right: '-10px' }}>
                        <Close />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => { handleCloseCart(); navigate('/checkout'); }}>Оформити</Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.cart.products
  };
};

export default connect(mapStateToProps)(Cart);
