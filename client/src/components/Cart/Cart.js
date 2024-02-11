import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Card, CardContent, IconButton, Grid, Typography, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import Button from "@mui/material/Button";

const Cart = ({ isOpen, handleCloseCart }) => {
  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);

  const handleIncreaseQuantity1 = () => {
    setQuantity1(quantity1 + 1);
  };

  const handleDecreaseQuantity1 = () => {
    if (quantity1 > 1) {
      setQuantity1(quantity1 - 1);
    }
  };

  const handleIncreaseQuantity2 = () => {
    setQuantity2(quantity2 + 1);
  };

  const handleDecreaseQuantity2 = () => {
    if (quantity2 > 1) {
      setQuantity2(quantity2 - 1);
    }
  };

  const handleDeleteCard1 = () => {
    // Код для видалення першої карточки товару
  };

  const handleDeleteCard2 = () => {
    // Код для видалення другої карточки товару
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
          <Grid item xs={12}>
            <Card>
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="https://picsum.photos/100"
                  alt="Товар"
                  style={{ width: 100, height: 100 }}
                />
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6" sx={{marginLeft: '20px'}}>Назва першого товару</Typography>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '15px'}}>
                      <IconButton onClick={handleDecreaseQuantity1}><RemoveIcon/></IconButton>
                      <TextField
                        type="number"
                        value={quantity1}
                        onChange={(e) => setQuantity1(e.target.value)}
                        variant="outlined"
                        inputProps={{min: 1}}
                        sx={{width: '90px', padding: '5.5px 10px'}}
                      />
                      <IconButton onClick={handleIncreaseQuantity1}><AddIcon/></IconButton>
                    </div>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleDeleteCard1} sx={{position: 'relative', top: '-20px', right: '-10px'}}>
                      <Close/>
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent style={{display: 'flex', alignItems: 'center'}}>
                <img
                  src="https://picsum.photos/100"
                  alt="Товар"
                  style={{width: 100, height: 100}}
                />
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6" sx={{ marginLeft: '20px' }} >Назва першого товару</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' , marginTop: '15px' }}>
                      <IconButton onClick={handleDecreaseQuantity2}><RemoveIcon /></IconButton>
                      <TextField
                        type="number"
                        value={quantity2}
                        onChange={(e) => setQuantity1(e.target.value)}
                        variant="outlined"
                        inputProps={{ min: 1 }}
                        sx={{ width: '90px', padding: '5.5px 10px'}}
                      />
                      <IconButton onClick={handleIncreaseQuantity2}><AddIcon /></IconButton>
                    </div>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleDeleteCard2} sx={{ position: 'relative', top: '-20px', right: '-10px' }}>
                      <Close />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button color="primary">Оформити</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
